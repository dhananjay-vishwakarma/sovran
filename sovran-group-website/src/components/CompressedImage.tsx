import React, { useState } from 'react';

// Note: Client-side compression has been removed as images are now optimized during build
interface CompressedImageProps {
  src: string;
  alt: string;
  quality?: number; // Kept for backwards compatibility but no longer used
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
  quality, // No longer used but kept for API compatibility
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError();
  };

  // Don't render anything until startLoading is true (for lazy loading)
  if (!startLoading) {
    return null;
  }

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

  // Render image (now using pre-optimized images from build)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        objectFit,
      }}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority > 0 ? 'eager' : 'lazy'}
      data-testid="compressed-image"
    />
  );
};

export default CompressedImage;
