const fs = require('fs');
const path = require('path');
const usedMedia = require('./analyze_image_usage');

// Paths
const BUILD_DIR = path.resolve(__dirname, '../build');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const REPORT_FILE = path.resolve(__dirname, './media-usage-report.json');
const BUILD_MODE = process.env.BUILD_MODE || 'clean'; // 'clean' or 'filter'

// Media file extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];

// Function to optimize media in the build directory
function optimizeMedia() {
  console.log('Optimizing media (images & videos) in build directory...');
  
  // Make sure we have the latest media usage data
  let mediaData;
  try {
    mediaData = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8'));
  } catch (error) {
    console.error('Error reading media usage report. Please run analyze_image_usage.js first.');
    process.exit(1);
  }
  
  // Get all media files from public directory (source of truth)
  const allPublicFiles = getAllFiles(PUBLIC_DIR);
  
  // Filter for image and video files
  const allMediaFiles = allPublicFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS].includes(ext);
  });
  
  const imageFiles = allMediaFiles.filter(file => 
    IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
  );
  
  const videoFiles = allMediaFiles.filter(file => 
    VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase())
  );
  
  console.log(`Found ${imageFiles.length} total image files in public directory`);
  console.log(`Found ${videoFiles.length} total video files in public directory`);
  
  // Extract the relative paths of used media
  const usedMediaPaths = Object.keys(mediaData);
  
  // Debug info about used media
  console.log('Sample of used media paths:');
  usedMediaPaths.slice(0, 10).forEach(p => console.log(` - ${p}`));
  
  // Create a map of basenames to full paths for more robust matching
  const basenameToPath = {};
  allMediaFiles.forEach(file => {
    const basename = path.basename(file);
    if (!basenameToPath[basename]) {
      basenameToPath[basename] = [];
    }
    basenameToPath[basename].push(file);
  });
  
  // Filter to only media in public directory using multiple matching strategies
  const usedPublicMedia = [];
  
  usedMediaPaths.forEach(mediaPath => {
    // Check if it's directly in public
    if (mediaPath.startsWith('public/')) {
      usedPublicMedia.push(mediaPath);
      return;
    }
    
    // Try to match by basename
    const basename = path.basename(mediaPath.split('?')[0]); // Remove query params
    if (basenameToPath[basename]) {
      // Found match(es) by basename
      usedPublicMedia.push(mediaPath);
      return;
    }
    
    // Try to match by full path
    const foundByPath = allMediaFiles.some(publicFile => {
      const relPath = path.relative(path.resolve(__dirname, '..'), publicFile);
      return relPath.includes(basename) || mediaPath.includes(path.basename(relPath));
    });
    
    if (foundByPath) {
      usedPublicMedia.push(mediaPath);
    }
  });
  
  console.log(`Found ${usedPublicMedia.length} used media files from public directory`);
  
  // Create a record of which files will be kept and which will be removed
  const filesToKeep = [];
  const filesToRemove = [];
  
  // If build already exists, remove unused media
  if (fs.existsSync(BUILD_DIR)) {
    const allBuildFiles = getAllFiles(BUILD_DIR);
    const allBuildMedia = allBuildFiles.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS].includes(ext);
    });
    
    const buildImageCount = allBuildMedia.filter(file => 
      IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
    ).length;
    
    const buildVideoCount = allBuildMedia.filter(file => 
      VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase())
    ).length;
    
    console.log(`Found ${buildImageCount} image files and ${buildVideoCount} video files in build directory`);
    
    // Determine which build media to remove using more robust matching
    allBuildMedia.forEach(file => {
      const relPath = path.relative(BUILD_DIR, file);
      const baseName = path.basename(file);
      const publicEquivalent = path.join(PUBLIC_DIR, relPath);
      
      let isUsed = false;
      
      // Check if it's a used file via multiple strategies
      if (fs.existsSync(publicEquivalent)) {
        // 1. Direct path matching
        const publicRelPath = path.relative(path.resolve(__dirname, '..'), publicEquivalent);
        isUsed = usedMediaPaths.some(usedPath => usedPath === publicRelPath);
        
        // 2. Basename matching (handles cases where path structure differs but filename is same)
        if (!isUsed) {
          isUsed = usedMediaPaths.some(usedPath => {
            const usedBasename = path.basename(usedPath.split('?')[0]); // Remove query params
            return usedBasename === baseName;
          });
        }
        
        // 3. Partial path matching (handles cases with spaces/encoding differences)
        if (!isUsed) {
          isUsed = usedMediaPaths.some(usedPath => 
            usedPath.includes(baseName) || path.basename(usedPath) === baseName
          );
        }
      } else {
        // If no equivalent in public, it might be a processed asset or other important file
        // For now, we'll keep these to be safe
        isUsed = true;
      }
      
      if (isUsed) {
        filesToKeep.push(file);
      } else {
        filesToRemove.push(file);
      }
    });
    
    // Count images and videos being kept/removed
    const imageKeepCount = filesToKeep.filter(file => 
      IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
    ).length;
    
    const videoKeepCount = filesToKeep.filter(file => 
      VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase())
    ).length;
    
    const imageRemoveCount = filesToRemove.filter(file => 
      IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
    ).length;
    
    const videoRemoveCount = filesToRemove.filter(file => 
      VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase())
    ).length;
    
    console.log(`Will keep ${imageKeepCount} images and ${videoKeepCount} videos`);
    console.log(`Will remove ${imageRemoveCount} images and ${videoRemoveCount} videos from build`);
    
    // Remove unused media
    let removedCount = 0;
    filesToRemove.forEach(file => {
      try {
        fs.unlinkSync(file);
        removedCount++;
      } catch (error) {
        console.error(`Error removing file ${file}:`, error.message);
      }
    });
    
    console.log(`Successfully removed ${removedCount} unused media files from build directory`);
  } else {
    console.log(`Build directory does not exist: ${BUILD_DIR}`);
    console.log('Please run the build first before optimizing media.');
    process.exit(1);
  }
  
  // Write report of removed files
  const optimizedReport = path.resolve(__dirname, './optimized-media-report.json');
  fs.writeFileSync(optimizedReport, JSON.stringify({
    kept: filesToKeep.map(f => ({
      path: path.relative(path.resolve(__dirname, '..'), f),
      type: VIDEO_EXTENSIONS.includes(path.extname(f).toLowerCase()) ? 'video' : 'image'
    })),
    removed: filesToRemove.map(f => ({
      path: path.relative(path.resolve(__dirname, '..'), f),
      type: VIDEO_EXTENSIONS.includes(path.extname(f).toLowerCase()) ? 'video' : 'image'
    }))
  }, null, 2));
  
  // Additionally, verify and restore specifically mentioned files if they were mistakenly removed
  const criticalFiles = [
    'assets/images/TAAJ Kitchens-20250726T155624Z-1-001/TAAJ Kitchens/3D renders/Bushra Kitchen View.jpg',
    'assets/images/Drop Box-20250726T154239Z-1-009/Drop Box/Dali Bacha/Bedroom 1/Photos/P1249428-HDR.jpg',
    'assets/images/Background-image-for-finance-5-years-Taaj-Kitchens-1.png'
  ];
  
  let restoredCount = 0;
  
  criticalFiles.forEach(criticalPath => {
    // Find in public
    const sourcePath = path.join(PUBLIC_DIR, criticalPath);
    // Target in build
    const targetPath = path.join(BUILD_DIR, criticalPath);
    
    // Check if file exists in public but was removed from build
    if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
      try {
        // Create directory structure if needed
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        // Copy the file
        fs.copyFileSync(sourcePath, targetPath);
        restoredCount++;
        console.log(`Explicitly restored critical file: ${criticalPath}`);
      } catch (error) {
        console.error(`Error restoring critical file ${criticalPath}:`, error.message);
      }
    }
  });
  
  if (restoredCount > 0) {
    console.log(`Restored ${restoredCount} critical files that were missed by the automated detection`);
  }
  
  console.log(`Report of media optimization written to ${optimizedReport}`);
}

// Helper function to get all files in a directory recursively
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // Recurse into subdirectory
      results = results.concat(getAllFiles(filePath));
    } else {
      results.push(filePath);
    }
  });
  
  return results;
}

// Run the optimization process
optimizeMedia();
