// ImageCompressorConfig.js - Configuration for global image compression

/**
 * Configuration for the global image compressor
 */
const ImageCompressorConfig = {
  // Default quality (0-1) where 1 is highest quality
  defaultQuality: 0.8,
  
  // Maximum dimensions - images larger than this will be resized
  maxWidth: 1920,
  maxHeight: 1080,
  
  // Minimum dimensions - images smaller than this won't be compressed
  minWidth: 300,
  minHeight: 300,
  
  // Paths/extensions to exclude from compression
  excludePaths: [
    '/assets/icons/',
    '/svg/',
  ],
  
  // File extensions to exclude from compression
  excludeExtensions: [
    '.svg',
    '.gif',
    '.webp'  // webp is already compressed
  ],
  
  // Enable debug logging
  debug: true,
  
  // Quality settings for different image types
  qualitySettings: {
    // Higher quality for hero images
    hero: 0.9,
    // Medium quality for general content
    content: 0.8,
    // Lower quality for thumbnails
    thumbnail: 0.7
  }
};

export default ImageCompressorConfig;
