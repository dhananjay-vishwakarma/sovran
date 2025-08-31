import React from 'react';
import CompressedImage from '../components/CompressedImage';

// This utility helps replace all <img> tags with <CompressedImage> tags
// for automatic image compression across the application

// Default compression quality
const DEFAULT_QUALITY = 0.75;

// Utility to patch the global Image component in React
export const patchReactImage = () => {
  console.warn('Image patching is experimental and may cause issues with some libraries');
  
  // This approach is risky and not recommended
  // It's better to use the methods below instead
};

// Higher-order component to wrap components that use images
export const withCompressedImages = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    // Implementation depends on the specific requirements
    // This is a stub for a more complex implementation
    return <WrappedComponent {...props} />;
  };
};

// Provides a drop-in replacement for the standard <img> tag
export const Image = (props: React.ImgHTMLAttributes<HTMLImageElement> & {
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: number;
}) => {
  const {
    src,
    alt = '',
    quality = DEFAULT_QUALITY,
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
      objectFit={objectFit}
      priority={priority}
      {...rest}
    />
  );
};

// Export the CompressedImage component directly for more complex use cases
export { CompressedImage };

// Usage guide for different approaches
export const compressionGuide = {
  basic: 'Use <CompressedImage src="..." alt="..." /> directly',
  dropIn: 'Replace <img> with <Image> from this utility file',
  advanced: 'Use the withCompressedImages HOC for wrapping components',
};
