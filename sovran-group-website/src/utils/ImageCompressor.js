// ImageCompressor.js - A global image compression utility
import Compressor from 'compressorjs';
import config from './ImageCompressorConfig';

// Global cache for compressed images
const imageCache = {};

// Tracks images being processed to avoid duplicate work
const processingImages = new Set();

// Helper function to check if URL should be excluded from compression
const shouldExcludeUrl = (url) => {
  // Check excluded paths
  if (config.excludePaths.some(path => url.includes(path))) {
    return true;
  }
  
  // Check excluded extensions
  if (config.excludeExtensions.some(ext => url.toLowerCase().endsWith(ext))) {
    return true;
  }
  
  // Skip data URLs
  if (url.startsWith('data:')) {
    return true;
  }
  
  // Skip URLs with nocompress parameter
  if (url.includes('nocompress=true')) {
    return true;
  }
  
  return false;
};

// Main function to intercept and compress images
export const setupImageCompression = () => {
  if (typeof window === 'undefined' || !window.Image) {
    return () => {}; // No-op for SSR
  }

  // Store the original Image constructor
  const OriginalImage = window.Image;
  
  // Override the global Image constructor
  window.Image = function(width, height) {
    // Create original image instance
    const img = new OriginalImage(width, height);
    
    // Store the original src property descriptor
    const originalSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    
    // Override the src property
    Object.defineProperty(img, 'src', {
      get: function() {
        return originalSrcDescriptor.get.call(this);
      },
      set: function(url) {
        // Skip excluded URLs or already cached/processing images
        if (shouldExcludeUrl(url) || imageCache[url] || processingImages.has(url)) {
          originalSrcDescriptor.set.call(this, url);
          return;
        }
        
        // Check if it's a URL we can compress (local image)
        if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || 
            url.startsWith(window.location.origin)) {
          
          // Mark as processing to avoid duplicate work
          processingImages.add(url);
          
          // Create a temporary image to load the original
          const tempImg = new OriginalImage();
          tempImg.crossOrigin = 'anonymous';
          
          tempImg.onload = function() {
            // Skip small images
            if (tempImg.width < config.minWidth && tempImg.height < config.minHeight) {
              imageCache[url] = url; // Cache the decision to skip
              originalSrcDescriptor.set.call(img, url);
              processingImages.delete(url);
              if (config.debug) {
                console.log(`Skipped small image: ${url}`);
              }
              return;
            }
            
            // Create a canvas to draw the image
            const canvas = document.createElement('canvas');
            canvas.width = tempImg.width;
            canvas.height = tempImg.height;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              originalSrcDescriptor.set.call(img, url);
              processingImages.delete(url);
              return;
            }
            
            // Draw image on canvas
            ctx.drawImage(tempImg, 0, 0);
            
            // Convert to blob
            canvas.toBlob(blob => {
              if (!blob) {
                originalSrcDescriptor.set.call(img, url);
                processingImages.delete(url);
                return;
              }
              
              // Determine quality based on image size and context
              let quality = config.defaultQuality;
              
              // Compress the image using CompressorJS
              new Compressor(blob, {
                quality: quality,
                maxWidth: config.maxWidth,
                maxHeight: config.maxHeight,
                success(result) {
                  // Create object URL for the compressed image
                  const compressedUrl = URL.createObjectURL(result);
                  
                  // Cache the compressed URL
                  imageCache[url] = compressedUrl;
                  
                  // Set the src to the compressed image
                  originalSrcDescriptor.set.call(img, compressedUrl);
                  
                  processingImages.delete(url);
                  
                  if (config.debug) {
                    const compressionRatio = ((1 - (result.size / blob.size)) * 100).toFixed(1);
                    console.log(`Compressed: ${url} - Size reduced by ${compressionRatio}% (${(blob.size/1024).toFixed(1)}KB → ${(result.size/1024).toFixed(1)}KB)`);
                  }
                },
                error() {
                  originalSrcDescriptor.set.call(img, url);
                  processingImages.delete(url);
                  if (config.debug) {
                    console.warn(`Failed to compress: ${url}`);
                  }
                }
              });
            }, 'image/jpeg');
          };
          
          tempImg.onerror = function() {
            originalSrcDescriptor.set.call(img, url);
            processingImages.delete(url);
            if (config.debug) {
              console.warn(`Error loading image for compression: ${url}`);
            }
          };
          
          // Start loading the original image
          tempImg.src = url;
        } else {
          // External URL - pass through unchanged
          originalSrcDescriptor.set.call(this, url);
        }
      }
    });
    
    return img;
  };
  
  // Copy over original prototype and constructor properties
  window.Image.prototype = OriginalImage.prototype;
  window.Image.constructor = OriginalImage.constructor;
  
  if (config.debug) {
    console.log('Global image compression initialized');
  }
  
  // Clean up function for when component unmounts
  return () => {
    window.Image = OriginalImage;
    
    // Clean up object URLs to prevent memory leaks
    Object.values(imageCache).forEach(url => {
      if (typeof url === 'string' && url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    
    if (config.debug) {
      console.log('Global image compression cleaned up');
    }
  };
};

// Helper function to skip compression for specific images
export const getUncompressedUrl = (url) => {
  return url + (url.includes('?') ? '&' : '?') + 'nocompress=true';
};

// Function to get compression statistics
export const getCompressionStats = () => {
  const totalImages = Object.keys(imageCache).length;
  let originalSize = 0;
  let compressedSize = 0;
  
  // These stats are not fully accurate since we don't store the original sizes
  // This would need to be enhanced to track original and compressed sizes
  
  return {
    totalImages,
    compressionRatio: originalSize > 0 ? (1 - (compressedSize / originalSize)) * 100 : 0,
    originalSize,
    compressedSize,
    savedBytes: originalSize - compressedSize
  };
};
