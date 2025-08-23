import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  shouldLoad?: boolean; // Prop to control when the image should load
  priority?: number;    // New prop for controlling load order (lower numbers load first)
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  shouldLoad = false,
  priority = 0
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldStartLoading, setShouldStartLoading] = useState(false);
  const [isShowingLoadEffect, setIsShowingLoadEffect] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Effect to handle when images should start loading
  useEffect(() => {
    if (shouldLoad) {
      // Show loading effect for 2 seconds
      setIsShowingLoadEffect(true);
      
      // Stagger the loading of images based on priority
      const loadDelay = priority * 200; // 200ms delay per priority level
      
      timeoutRef.current = setTimeout(() => {
        setShouldStartLoading(true);
        
        // Hide the loading effect after 2 seconds
        setTimeout(() => {
          setIsShowingLoadEffect(false);
        }, 2000);
      }, loadDelay);
    } else {
      // If shouldLoad becomes false (e.g., when dropdown closes), reset everything
      setIsLoaded(false);
      setIsInView(false);
      setShouldStartLoading(false);
      setIsShowingLoadEffect(false);
      
      // Clear any pending timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldLoad, priority]);

  useEffect(() => {
    if (!shouldStartLoading) return;
    
    // Create IntersectionObserver to detect when image is in viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" }); // Load image when it's 200px from viewport

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, [shouldStartLoading]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full">
      {/* Show placeholder with animated shine effect when loading */}
      {(!isLoaded || isShowingLoadEffect) && (
        <div className={`image-placeholder ${isShowingLoadEffect ? 'active-loading' : ''}`}></div>
      )}
      <img
        ref={imgRef}
        src={(isInView && shouldStartLoading) ? src : ''}
        alt={alt}
        className={`absolute top-0 left-0 w-full h-full object-cover ${className} ${isLoaded ? 'loaded' : ''}`}
        loading="lazy"
        onLoad={handleImageLoad}
        style={{ zIndex: 0 }} // Ensure image is behind overlay content
      />
    </div>
  );
};

export default LazyImage;
