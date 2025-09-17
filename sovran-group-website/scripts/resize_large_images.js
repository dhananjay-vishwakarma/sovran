const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if sharp is installed, otherwise use built-in methods
let useSharp = false;
let sharp;

try {
  sharp = require('sharp');
  console.log('Using sharp for image processing');
  useSharp = true;
} catch (error) {
  console.log('Sharp not found, checking for ImageMagick');
  // Check if ImageMagick is installed
  try {
    execSync('which convert', { stdio: 'ignore' });
    console.log('Using ImageMagick for image processing');
    useSharp = false;
  } catch (error) {
    console.error('Neither sharp nor ImageMagick is available. Installing sharp...');
    try {
      execSync('npm install sharp --save-dev', { stdio: 'inherit' });
      sharp = require('sharp');
      console.log('Sharp installed successfully');
      useSharp = true;
    } catch (installError) {
      console.error('Failed to install sharp. Please install it manually or install ImageMagick.');
      console.error('Error details:', installError.message);
      process.exit(1);
    }
  }
}

// Configuration
const MAX_WIDTH = 2000; // Maximum width for any image
const MAX_HEIGHT = 2000; // Maximum height for any image
const QUALITY = 80; // JPEG/WebP quality
const BUILD_DIR = path.resolve(__dirname, '../build');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const REPORT_FILE = path.resolve(__dirname, './resized-images-report.json');
const SKIP_CORRUPT = true; // Skip corrupt images instead of failing

// Function to get image dimensions
async function getImageDimensions(imagePath) {
  if (useSharp) {
    try {
      const metadata = await sharp(imagePath).metadata();
      return { width: metadata.width, height: metadata.height };
    } catch (error) {
      console.error(`Error getting dimensions with sharp for ${imagePath}:`, error.message);
      return null;
    }
  } else {
    // Use ImageMagick to get dimensions
    try {
      // Add timeout to prevent hanging on corrupted images
      const output = execSync(`identify -format "%w %h" "${imagePath}"`, { timeout: 10000 }).toString().trim();
      const [width, height] = output.split(' ').map(Number);
      
      // Ensure we have valid numbers
      if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        console.error(`Invalid dimensions for ${imagePath}: ${width}x${height}`);
        return null;
      }
      
      return { width, height };
    } catch (error) {
      console.error(`Error getting dimensions with ImageMagick for ${imagePath}:`, error.message);
      return null;
    }
  }
}

// Function to resize image with sharp
async function resizeImageWithSharp(imagePath, outputPath, maxWidth, maxHeight) {
  try {
    const metadata = await sharp(imagePath).metadata();
    
    // Only resize if the image is larger than our limits
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      // Calculate new dimensions while maintaining aspect ratio
      let newWidth, newHeight;
      
      if (metadata.width > metadata.height) {
        // Landscape orientation
        if (metadata.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = Math.round(metadata.height * (maxWidth / metadata.width));
        } else {
          newWidth = metadata.width;
          newHeight = metadata.height;
        }
      } else {
        // Portrait or square orientation
        if (metadata.height > maxHeight) {
          newHeight = maxHeight;
          newWidth = Math.round(metadata.width * (maxHeight / metadata.height));
        } else {
          newWidth = metadata.width;
          newHeight = metadata.height;
        }
      }
      
      // Skip if we don't need to resize
      if (newWidth === metadata.width && newHeight === metadata.height) {
        fs.copyFileSync(imagePath, outputPath);
        return {
          originalSize: fs.statSync(imagePath).size,
          newSize: fs.statSync(outputPath).size,
          originalDimensions: { width: metadata.width, height: metadata.height },
          newDimensions: { width: metadata.width, height: metadata.height },
          resized: false
        };
      }
      
      const originalSize = fs.statSync(imagePath).size;
      
      // Process the image
      await sharp(imagePath)
        .resize(newWidth, newHeight, {
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
        .toFormat(metadata.format, { quality: QUALITY })
        .toFile(outputPath);
      
      const newSize = fs.statSync(outputPath).size;
      
      // If the new file is actually larger (rare but possible), keep the original
      if (newSize >= originalSize) {
        console.log(`  Note: Resized image is larger than original, keeping original`);
        fs.unlinkSync(outputPath);
        fs.copyFileSync(imagePath, outputPath);
        
        return {
          originalSize: originalSize,
          newSize: originalSize,
          originalDimensions: { width: metadata.width, height: metadata.height },
          newDimensions: { width: metadata.width, height: metadata.height },
          resized: false
        };
      }
      
      return {
        originalSize: originalSize,
        newSize: newSize,
        originalDimensions: { width: metadata.width, height: metadata.height },
        newDimensions: { width: newWidth, height: newHeight },
        resized: true
      };
    } else {
      // Copy the file if no resize needed
      fs.copyFileSync(imagePath, outputPath);
      return {
        originalSize: fs.statSync(imagePath).size,
        newSize: fs.statSync(outputPath).size,
        originalDimensions: { width: metadata.width, height: metadata.height },
        newDimensions: { width: metadata.width, height: metadata.height },
        resized: false
      };
    }
  } catch (error) {
    console.error(`Error resizing image ${imagePath} with sharp:`, error.message);
    // Fallback to copying the original file
    fs.copyFileSync(imagePath, outputPath);
    return null;
  }
}

// Function to resize image with ImageMagick
async function resizeImageWithImageMagick(imagePath, outputPath, maxWidth, maxHeight) {
  try {
    // Get original dimensions
    const originalDimensions = await getImageDimensions(imagePath);
    
    if (!originalDimensions) {
      console.error(`Cannot resize ${imagePath} - dimensions unknown`);
      fs.copyFileSync(imagePath, outputPath);
      return null;
    }
    
    const originalSize = fs.statSync(imagePath).size;
    
    // Only resize if image is larger than our limits
    if (originalDimensions.width > maxWidth || originalDimensions.height > maxHeight) {
      // Calculate aspect ratio preserving dimensions
      let resizeArg;
      if (originalDimensions.width > originalDimensions.height) {
        // Landscape
        if (originalDimensions.width > maxWidth) {
          resizeArg = `${maxWidth}x`;
        } else {
          // No need to resize
          fs.copyFileSync(imagePath, outputPath);
          return {
            originalSize,
            newSize: originalSize,
            originalDimensions,
            newDimensions: originalDimensions,
            resized: false
          };
        }
      } else {
        // Portrait or square
        if (originalDimensions.height > maxHeight) {
          resizeArg = `x${maxHeight}`;
        } else {
          // No need to resize
          fs.copyFileSync(imagePath, outputPath);
          return {
            originalSize,
            newSize: originalSize,
            originalDimensions,
            newDimensions: originalDimensions,
            resized: false
          };
        }
      }
      
      // Run the ImageMagick command with timeout
      execSync(`convert "${imagePath}" -resize "${resizeArg}>" -quality ${QUALITY} "${outputPath}"`, { timeout: 30000 });
      
      // Get new dimensions and size
      const newDimensions = await getImageDimensions(outputPath);
      const newSize = fs.statSync(outputPath).size;
      
      // If the new file is actually larger (rare but possible), keep the original
      if (newSize >= originalSize) {
        console.log(`  Note: Resized image is larger than original, keeping original`);
        fs.unlinkSync(outputPath);
        fs.copyFileSync(imagePath, outputPath);
        
        return {
          originalSize,
          newSize: originalSize,
          originalDimensions,
          newDimensions: originalDimensions,
          resized: false
        };
      }
      
      return {
        originalSize,
        newSize,
        originalDimensions,
        newDimensions,
        resized: true
      };
    } else {
      // Copy the file if no resize needed
      fs.copyFileSync(imagePath, outputPath);
      return {
        originalSize,
        newSize: originalSize,
        originalDimensions,
        newDimensions: originalDimensions,
        resized: false
      };
    }
  } catch (error) {
    console.error(`Error resizing image ${imagePath} with ImageMagick:`, error.message);
    // Fallback to copying the original file
    fs.copyFileSync(imagePath, outputPath);
    return null;
  }
}

// Helper function to get all image files in a directory recursively
function getAllImageFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // Recurse into subdirectory
      results = results.concat(getAllImageFiles(filePath));
    } else {
      const ext = path.extname(filePath).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

// Main function to resize all oversized images in build directory
async function resizeOversizedImages() {
  console.log('Checking for oversized images in build directory...');
  
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory does not exist: ${BUILD_DIR}`);
    console.error('Please run the build first before resizing images.');
    process.exit(1);
  }
  
  const imageFiles = getAllImageFiles(BUILD_DIR);
  console.log(`Found ${imageFiles.length} image files in build directory`);
  
  let resizedCount = 0;
  let skippedCount = 0;
  let totalSaved = 0;
  const resizeReport = [];
  const skippedFiles = [];
  
  // Process each image
  for (const imagePath of imageFiles) {
    try {
      // Check if file exists and is not empty
      const stats = fs.statSync(imagePath);
      if (stats.size === 0) {
        console.log(`Skipping empty file: ${imagePath}`);
        skippedFiles.push({
          path: path.relative(BUILD_DIR, imagePath),
          reason: 'Empty file'
        });
        skippedCount++;
        continue;
      }
      
      // Get dimensions
      const dimensions = await getImageDimensions(imagePath);
      
      if (!dimensions) {
        console.log(`Skipping ${imagePath} - unable to get dimensions (possibly corrupt)`);
        skippedFiles.push({
          path: path.relative(BUILD_DIR, imagePath),
          reason: 'Unable to get dimensions (possibly corrupt)'
        });
        skippedCount++;
        continue;
      }
      
      // Check if image needs resizing
      if (dimensions.width > MAX_WIDTH || dimensions.height > MAX_HEIGHT) {
        console.log(`Resizing ${imagePath} (${dimensions.width}x${dimensions.height})`);
        
        // Create a temporary path for the resized image
        const tempPath = imagePath + '.temp';
        
        // Resize the image
        let result;
        if (useSharp) {
          result = await resizeImageWithSharp(imagePath, tempPath, MAX_WIDTH, MAX_HEIGHT);
        } else {
          result = await resizeImageWithImageMagick(imagePath, tempPath, MAX_WIDTH, MAX_HEIGHT);
        }
        
        if (result) {
          // Replace the original with the resized version
          try {
            fs.unlinkSync(imagePath);
            fs.renameSync(tempPath, imagePath);
          } catch (replaceError) {
            console.error(`Error replacing original file ${imagePath}:`, replaceError.message);
            // Try to clean up temp file if it exists
            if (fs.existsSync(tempPath)) {
              try { fs.unlinkSync(tempPath); } catch(e) {}
            }
            continue;
          }
          
          resizedCount++;
          const byteSaved = result.originalSize - result.newSize;
          totalSaved += byteSaved;
          
          // Add to report
          resizeReport.push({
            path: path.relative(BUILD_DIR, imagePath),
            originalSize: result.originalSize,
            newSize: result.newSize,
            originalDimensions: result.originalDimensions,
            newDimensions: result.newDimensions,
            byteSaved: byteSaved,
            percentSaved: Math.round((byteSaved / result.originalSize) * 100)
          });
          
          console.log(`  Resized: ${result.originalDimensions.width}x${result.originalDimensions.height} -> ${result.newDimensions.width}x${result.newDimensions.height}`);
          console.log(`  Size reduction: ${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)} (${Math.round((byteSaved / result.originalSize) * 100)}% saved)`);
        } else {
          console.log(`  Failed to resize: ${imagePath}`);
          skippedFiles.push({
            path: path.relative(BUILD_DIR, imagePath),
            reason: 'Resize operation failed'
          });
          skippedCount++;
          
          // Clean up temp file if it exists
          if (fs.existsSync(tempPath)) {
            try { fs.unlinkSync(tempPath); } catch(e) {}
          }
        }
      } else {
        // Image is already within size limits
        console.log(`Skipping ${path.relative(BUILD_DIR, imagePath)} - already within size limits (${dimensions.width}x${dimensions.height})`);
      }
    } catch (error) {
      console.error(`Error processing ${imagePath}:`, error.message);
      skippedFiles.push({
        path: path.relative(BUILD_DIR, imagePath),
        reason: `Error: ${error.message}`
      });
      skippedCount++;
    }
  }
  
  // Write resize report
  fs.writeFileSync(REPORT_FILE, JSON.stringify({
    summary: {
      totalImages: imageFiles.length,
      resizedImages: resizedCount,
      skippedImages: skippedCount,
      totalSavedBytes: totalSaved,
      totalSavedFormatted: formatBytes(totalSaved)
    },
    resizedImages: resizeReport,
    skippedImages: skippedFiles
  }, null, 2));
  
  console.log(`\nResize summary:`);
  console.log(`Total images: ${imageFiles.length}`);
  console.log(`Resized images: ${resizedCount}`);
  console.log(`Skipped images: ${skippedCount}`);
  console.log(`Total space saved: ${formatBytes(totalSaved)}`);
  console.log(`Detailed report written to: ${REPORT_FILE}`);
}

// Helper function to format bytes to human-readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Run the resize process
resizeOversizedImages().catch(error => {
  console.error('Error in resize process:', error);
  process.exit(1);
});
