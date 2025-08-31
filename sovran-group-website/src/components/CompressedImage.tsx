import React, { useState, useEffect } from 'react';
import Compressor from 'compressorjs';

// Cache for storing compressed image URLs to avoid recompression
const imageCache: Record<string, string> = {};

interface CompressedImageProps {
  src: string;
  alt: string;
  quality?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  startLoading?: boolean; // For lazy loading
  priority?: number; // For prioritizing images
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const CompressedImage: React.FC<CompressedImageProps> = ({
  src,
  alt,
  quality = 0.8,
  width,
  height,
  className = '',
  style = {},
  onLoad,
  onError,
  startLoading = true,
  priority = 0,
  objectFit = 'cover',
}) => {
  const [compressedSrc, setCompressedSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Create a cache key from src and quality
  const cacheKey = `${src}_${quality}_${width || 'auto'}_${height || 'auto'}`;

  useEffect(() => {
    if (!startLoading) return; // Don't load if not ready (for lazy loading)

    // Check cache first
    if (imageCache[cacheKey]) {
      setCompressedSrc(imageCache[cacheKey]);
      setIsLoading(false);
      return;
    }

    // Skip compression for SVGs or already compressed images (data URLs)
    if (src.endsWith('.svg') || src.startsWith('data:')) {
      setCompressedSrc(src);
      imageCache[cacheKey] = src;
      setIsLoading(false);
      return;
    }

    // Skip compression for external URLs (we can't fetch them directly for compression)
    if ((src.startsWith('http') && !src.includes(window.location.hostname)) || src.startsWith('blob:')) {
      setCompressedSrc(src);
      imageCache[cacheKey] = src;
      setIsLoading(false);
      return;
    }

    // Create an image object to load the source
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Skip compression for small images
      if (img.width < 300 && img.height < 300) {
        setCompressedSrc(src);
        imageCache[cacheKey] = src;
        setIsLoading(false);
        return;
      }

      // Calculate target dimensions
      const targetWidth = width || img.width;
      const targetHeight = height || img.height;

      // Convert Image to Blob
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) {
            setCompressedSrc(src);
            setIsLoading(false);
            return;
          }

          // Use CompressorJS for better compression
          new Compressor(blob, {
            quality: quality,
            maxWidth: targetWidth * 2, // Account for retina displays
            maxHeight: targetHeight * 2,
            success(result) {
              const url = URL.createObjectURL(result);
              setCompressedSrc(url);
              imageCache[cacheKey] = url;
              setIsLoading(false);
              
              if (onLoad) onLoad();
            },
            error() {
              setCompressedSrc(src);
              setIsLoading(false);
              
              if (onError) onError();
            },
          });
        }, 'image/jpeg');
      } else {
        // Fallback if canvas context isn't available
        setCompressedSrc(src);
        setIsLoading(false);
      }
    };
    
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      setCompressedSrc(src); // Fallback to original
      
      if (onError) onError();
    };
    
    img.src = src;
    
    // Clean up object URLs on unmount to prevent memory leaks
    return () => {
      if (compressedSrc && compressedSrc.startsWith('blob:')) {
        URL.revokeObjectURL(compressedSrc);
      }
    };
  }, [src, quality, width, height, onError, onLoad, cacheKey, startLoading]);

  // Placeholder during loading
  if (isLoading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse ${className}`} 
        style={{ 
          width: width ? `${width}px` : '100%', 
          height: height ? `${height}px` : '100%',
          ...style
        }}
        data-testid="compressed-image-loading"
      />
    );
  }

  // Error state
  if (hasError) {
    return (
      <div 
        className={`bg-gray-300 flex items-center justify-center text-gray-500 ${className}`}
        style={{ 
          width: width ? `${width}px` : '100%', 
          height: height ? `${height}px` : '100%',
          ...style
        }}
        data-testid="compressed-image-error"
      >
        <span role="img" aria-label="broken image">🖼️</span>
      </div>
    );
  }

  // Render compressed image
  return (
    <img
      src={compressedSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        objectFit,
      }}
      width={width}
      height={height}
      onLoad={onLoad}
      onError={onError}
      loading={priority > 0 ? 'eager' : 'lazy'}
      data-testid="compressed-image"
    />
  );
};

export default CompressedImage;
