import React from 'react';
import CompressedImage from '../components/CompressedImage';

// This is a placeholder file to satisfy TypeScript module requirements
// The actual implementation has been removed as images are now optimized during build

// Default compression quality (kept for API compatibility)
const DEFAULT_QUALITY = 0.75;

// Provides a drop-in replacement for the standard <img> tag
export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement> & {
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: number;
}) => {
  const {
    src,
    alt = '',
    quality = DEFAULT_QUALITY, // Kept for API compatibility
    width,
    height,
    className,
    style,
    onLoad,
    onError,
    objectFit,
    priority,
    ...rest
  } = props;

  if (!src) {
    return null;
  }

  return (
    <CompressedImage
      src={src}
      alt={alt}
      quality={quality}
      width={typeof width === 'number' ? width : undefined}
      height={typeof height === 'number' ? height : undefined}
      className={className}
      style={style}
      onLoad={onLoad as () => void}
      onError={onError as () => void}
      objectFit={objectFit as any}
      priority={priority}
      {...rest}
    />
  );
};

// Export the CompressedImage component directly for more complex use cases
export { CompressedImage };

// Usage guide for different approaches
export const compressionGuide = {
  basic: 'Use <CompressedImage src="..." alt="..." /> for images optimized during build',
  dropIn: 'Replace <img> with <Image> from this utility file',
};
