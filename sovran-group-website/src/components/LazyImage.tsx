import React, { useState, useEffect } from 'react';
import '../styles/megaMenu.css';
import CompressedImage from './CompressedImage';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  startLoading?: boolean;
  priority?: number;
  width?: number;
  height?: number;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  startLoading = true,
  priority = 0,
  width,
  height,
  quality = 0.8,
  objectFit = 'cover'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (startLoading) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, 1000 + priority * 100); // 1s delay + stagger loading by 100ms per image

      return () => clearTimeout(timer);
    }
  }, [startLoading, priority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded && <div className="image-placeholder active-loading" />}
      {shouldLoad && (
        <CompressedImage
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'loaded' : ''}`}
          onLoad={handleImageLoad}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          objectFit={objectFit}
          startLoading={shouldLoad}
        />
      )}
    </>
  );
};

export default LazyImage;
