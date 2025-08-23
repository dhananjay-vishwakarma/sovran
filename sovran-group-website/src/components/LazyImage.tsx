import React, { useState, useEffect } from 'react';
import '../styles/megaMenu.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  startLoading: boolean;
  priority: number;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, startLoading, priority }) => {
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

  useEffect(() => {
    if (shouldLoad) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoaded(true);
      };
    }
  }, [shouldLoad, src]);

  return (
    <>
      {!isLoaded && <div className="image-placeholder active-loading" />}
      <img
        src={shouldLoad ? src : ''}
        alt={alt}
        className={`${className} ${isLoaded ? 'loaded' : ''}`}
      />
    </>
  );
};

export default LazyImage;
