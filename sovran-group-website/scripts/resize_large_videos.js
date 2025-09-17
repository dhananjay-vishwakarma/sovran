const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

// Configuration
const MAX_WIDTH = 1280; // Maximum width for any video
const MAX_HEIGHT = 720; // Maximum height for any video (720p)
const BITRATE = '2000k'; // Target bitrate
const CRF = 28; // Constant Rate Factor (18-28 is good range, lower is better quality but larger file)
const BUILD_DIR = path.resolve(__dirname, '../build');
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];
const REPORT_FILE = path.resolve(__dirname, './resized-videos-report.json');
const FFMPEG_TIMEOUT = 300000; // 5 minutes timeout for ffmpeg operations

// Check for ffmpeg
function checkFFmpeg() {
  try {
    execSync('which ffmpeg', { stdio: 'ignore' });
    console.log('Found ffmpeg');
    return true;
  } catch (error) {
    console.error('FFmpeg is not installed. Please install it to resize videos.');
    console.error('Mac: brew install ffmpeg');
    console.error('Ubuntu/Debian: sudo apt-get install ffmpeg');
    console.error('Windows: Download from https://ffmpeg.org/download.html');
    return false;
  }
}

// Get video information using ffprobe
function getVideoInfo(videoPath) {
  try {
    const output = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of json "${videoPath}"`, {
      timeout: 30000, // 30 seconds timeout
      maxBuffer: 10 * 1024 * 1024 // 10MB buffer
    }).toString();
    
    const info = JSON.parse(output);
    
    if (info && info.streams && info.streams.length > 0) {
      const stream = info.streams[0];
      return {
        width: parseInt(stream.width),
        height: parseInt(stream.height),
        duration: parseFloat(stream.duration || 0)
      };
    }
    
    throw new Error('No video streams found');
  } catch (error) {
    console.error(`Error getting video info for ${videoPath}:`, error.message);
    return null;
  }
}

// Function to resize video with ffmpeg
function resizeVideo(videoPath, outputPath, maxWidth, maxHeight, bitrate, crf) {
  return new Promise((resolve, reject) => {
    try {
      // Get original video size
      const originalSize = fs.statSync(videoPath).size;
      
      // Get video dimensions
      const videoInfo = getVideoInfo(videoPath);
      if (!videoInfo) {
        console.error(`Could not get video info for ${videoPath}`);
        reject(new Error(`Could not get video info for ${videoPath}`));
        return;
      }
      
      // Skip if the video is already smaller than our target dimensions
      if (videoInfo.width <= maxWidth && videoInfo.height <= maxHeight) {
        console.log(`Video ${videoPath} is already within target dimensions (${videoInfo.width}x${videoInfo.height})`);
        fs.copyFileSync(videoPath, outputPath);
        resolve({
          originalSize,
          newSize: originalSize,
          originalDimensions: { width: videoInfo.width, height: videoInfo.height },
          newDimensions: { width: videoInfo.width, height: videoInfo.height },
          duration: videoInfo.duration,
          resized: false
        });
        return;
      }
      
      // Calculate new dimensions while maintaining aspect ratio
      let newWidth, newHeight;
      
      if (videoInfo.width / videoInfo.height > maxWidth / maxHeight) {
        // Video is wider than our target aspect ratio
        newWidth = maxWidth;
        newHeight = Math.round(videoInfo.height * (maxWidth / videoInfo.width));
      } else {
        // Video is taller than our target aspect ratio
        newHeight = maxHeight;
        newWidth = Math.round(videoInfo.width * (maxHeight / videoInfo.height));
      }
      
      // Round to even numbers (required by some codecs)
      newWidth = Math.floor(newWidth / 2) * 2;
      newHeight = Math.floor(newHeight / 2) * 2;
      
      console.log(`Resizing ${videoPath} (${videoInfo.width}x${videoInfo.height}) to ${newWidth}x${newHeight}`);
      
      // Build ffmpeg command
      const ffmpegArgs = [
        '-i', videoPath,
        '-vf', `scale=${newWidth}:${newHeight}`,
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', crf.toString(),
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        '-y', // Overwrite output file if it exists
        outputPath
      ];
      
      // If a specific bitrate is requested, use it instead of CRF
      if (bitrate) {
        ffmpegArgs.splice(ffmpegArgs.indexOf('-crf'), 2); // Remove CRF
        ffmpegArgs.splice(ffmpegArgs.indexOf('-c:v') + 2, 0, '-b:v', bitrate); // Add bitrate
      }
      
      // Spawn ffmpeg process
      const ffmpeg = spawn('ffmpeg', ffmpegArgs);
      
      let stdoutChunks = [];
      let stderrChunks = [];
      
      ffmpeg.stdout.on('data', (data) => {
        stdoutChunks.push(data);
      });
      
      ffmpeg.stderr.on('data', (data) => {
        stderrChunks.push(data);
        // Optionally log progress (commented out as it's very verbose)
        // process.stdout.write('.');
      });
      
      // Set a timeout to kill the process if it takes too long
      const timeoutId = setTimeout(() => {
        console.error(`Timeout exceeded for ${videoPath}`);
        ffmpeg.kill('SIGTERM');
        reject(new Error(`Timeout exceeded for ${videoPath}`));
      }, FFMPEG_TIMEOUT);
      
      ffmpeg.on('close', (code) => {
        clearTimeout(timeoutId);
        
        if (code !== 0) {
          const stderr = Buffer.concat(stderrChunks).toString();
          console.error(`ffmpeg process exited with code ${code}`);
          console.error(stderr);
          reject(new Error(`ffmpeg process exited with code ${code}`));
          return;
        }
        
        // Check if output file exists and has a non-zero size
        if (!fs.existsSync(outputPath) || fs.statSync(outputPath).size === 0) {
          reject(new Error(`Output file ${outputPath} does not exist or is empty`));
          return;
        }
        
        const newSize = fs.statSync(outputPath).size;
        
        // If the new file is actually larger (rare but possible), keep the original
        if (newSize >= originalSize) {
          console.log(`  Note: Resized video is larger than original, keeping original`);
          fs.unlinkSync(outputPath);
          fs.copyFileSync(videoPath, outputPath);
          
          resolve({
            originalSize: originalSize,
            newSize: originalSize,
            originalDimensions: { width: videoInfo.width, height: videoInfo.height },
            newDimensions: { width: videoInfo.width, height: videoInfo.height },
            duration: videoInfo.duration,
            resized: false
          });
        } else {
          // Get info about the new video
          const newVideoInfo = getVideoInfo(outputPath);
          
          resolve({
            originalSize: originalSize,
            newSize: newSize,
            originalDimensions: { width: videoInfo.width, height: videoInfo.height },
            newDimensions: { width: newVideoInfo ? newVideoInfo.width : newWidth, height: newVideoInfo ? newVideoInfo.height : newHeight },
            duration: videoInfo.duration,
            resized: true
          });
        }
      });
      
      ffmpeg.on('error', (err) => {
        clearTimeout(timeoutId);
        console.error(`Error executing ffmpeg: ${err.message}`);
        reject(err);
      });
    } catch (error) {
      console.error(`Error in resizeVideo: ${error.message}`);
      reject(error);
    }
  });
}

// Helper function to get all video files in a directory recursively
function getAllVideoFiles(dir) {
  let results = [];
  
  try {
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const filePath = path.join(dir, file);
      
      try {
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
          // Recurse into subdirectory
          results = results.concat(getAllVideoFiles(filePath));
        } else {
          const ext = path.extname(filePath).toLowerCase();
          if (VIDEO_EXTENSIONS.includes(ext)) {
            results.push(filePath);
          }
        }
      } catch (error) {
        console.error(`Error accessing ${filePath}:`, error.message);
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return results;
}

// Main function to resize all oversized videos in build directory
async function resizeOversizedVideos() {
  console.log('Checking for ffmpeg...');
  if (!checkFFmpeg()) {
    console.error('Cannot resize videos without ffmpeg');
    return;
  }
  
  console.log('Checking for oversized videos in build directory...');
  
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory does not exist: ${BUILD_DIR}`);
    console.error('Please run the build first before resizing videos.');
    process.exit(1);
  }
  
  const videoFiles = getAllVideoFiles(BUILD_DIR);
  console.log(`Found ${videoFiles.length} video files in build directory`);
  
  if (videoFiles.length === 0) {
    console.log('No videos to process');
    
    // Write empty report
    fs.writeFileSync(REPORT_FILE, JSON.stringify({
      summary: {
        totalVideos: 0,
        resizedVideos: 0,
        skippedVideos: 0,
        failedVideos: 0,
        totalSavedBytes: 0,
        totalSavedFormatted: '0 Bytes'
      },
      resizedVideos: [],
      skippedVideos: [],
      failedVideos: []
    }, null, 2));
    
    console.log(`Empty report written to: ${REPORT_FILE}`);
    return;
  }
  
  let resizedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  let totalSaved = 0;
  const resizeReport = [];
  const skippedVideos = [];
  const failedVideos = [];
  
  // Process each video
  for (const videoPath of videoFiles) {
    try {
      // Check if file exists and is not empty
      const stats = fs.statSync(videoPath);
      if (stats.size === 0) {
        console.log(`Skipping empty file: ${videoPath}`);
        skippedVideos.push({
          path: path.relative(BUILD_DIR, videoPath),
          reason: 'Empty file'
        });
        skippedCount++;
        continue;
      }
      
      // Get video info
      const videoInfo = getVideoInfo(videoPath);
      
      if (!videoInfo) {
        console.log(`Skipping ${videoPath} - unable to get video info (possibly corrupt)`);
        skippedVideos.push({
          path: path.relative(BUILD_DIR, videoPath),
          reason: 'Unable to get video info (possibly corrupt)'
        });
        skippedCount++;
        continue;
      }
      
      // Check if video needs resizing
      if (videoInfo.width > MAX_WIDTH || videoInfo.height > MAX_HEIGHT) {
        // Create a temporary path for the resized video
        const tempPath = videoPath + '.temp.mp4';
        
        try {
          // Resize the video
          const result = await resizeVideo(videoPath, tempPath, MAX_WIDTH, MAX_HEIGHT, BITRATE, CRF);
          
          // Replace the original with the resized version
          try {
            fs.unlinkSync(videoPath);
            fs.renameSync(tempPath, videoPath);
          } catch (replaceError) {
            console.error(`Error replacing original file ${videoPath}:`, replaceError.message);
            // Try to clean up temp file if it exists
            if (fs.existsSync(tempPath)) {
              try { fs.unlinkSync(tempPath); } catch(e) {}
            }
            throw replaceError;
          }
          
          resizedCount++;
          const byteSaved = result.originalSize - result.newSize;
          totalSaved += byteSaved;
          
          // Add to report
          resizeReport.push({
            path: path.relative(BUILD_DIR, videoPath),
            originalSize: result.originalSize,
            newSize: result.newSize,
            originalDimensions: result.originalDimensions,
            newDimensions: result.newDimensions,
            duration: result.duration,
            byteSaved: byteSaved,
            percentSaved: Math.round((byteSaved / result.originalSize) * 100)
          });
          
          console.log(`  Resized: ${result.originalDimensions.width}x${result.originalDimensions.height} -> ${result.newDimensions.width}x${result.newDimensions.height}`);
          console.log(`  Size reduction: ${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)} (${Math.round((byteSaved / result.originalSize) * 100)}% saved)`);
        } catch (error) {
          console.error(`  Failed to resize: ${videoPath} - ${error.message}`);
          failedVideos.push({
            path: path.relative(BUILD_DIR, videoPath),
            error: error.message
          });
          failedCount++;
          
          // Clean up temp file if it exists
          if (fs.existsSync(tempPath)) {
            try { fs.unlinkSync(tempPath); } catch(e) {}
          }
        }
      } else {
        // Video is already within size limits
        console.log(`Skipping ${path.relative(BUILD_DIR, videoPath)} - already within size limits (${videoInfo.width}x${videoInfo.height})`);
        skippedVideos.push({
          path: path.relative(BUILD_DIR, videoPath),
          reason: 'Already within size limits',
          dimensions: { width: videoInfo.width, height: videoInfo.height }
        });
        skippedCount++;
      }
    } catch (error) {
      console.error(`Error processing ${videoPath}:`, error.message);
      failedVideos.push({
        path: path.relative(BUILD_DIR, videoPath),
        error: error.message
      });
      failedCount++;
    }
  }
  
  // Write resize report
  fs.writeFileSync(REPORT_FILE, JSON.stringify({
    summary: {
      totalVideos: videoFiles.length,
      resizedVideos: resizedCount,
      skippedVideos: skippedCount,
      failedVideos: failedCount,
      totalSavedBytes: totalSaved,
      totalSavedFormatted: formatBytes(totalSaved)
    },
    resizedVideos: resizeReport,
    skippedVideos: skippedVideos,
    failedVideos: failedVideos
  }, null, 2));
  
  console.log(`\nVideo resize summary:`);
  console.log(`Total videos: ${videoFiles.length}`);
  console.log(`Resized videos: ${resizedCount}`);
  console.log(`Skipped videos: ${skippedCount}`);
  console.log(`Failed videos: ${failedCount}`);
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
resizeOversizedVideos().catch(error => {
  console.error('Error in resize process:', error);
  process.exit(1);
});
