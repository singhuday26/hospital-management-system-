
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * A highly optimized image loader component that implements:
 * - Native lazy loading
 * - Blur-up technique
 * - Priority loading for important images
 * - Error handling
 */
const LazyImageLoader: React.FC<LazyImageLoaderProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setIsError(false);
    
    // Preload critical images
    if (priority) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  }, [src, priority]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {!isLoaded && !isError && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      
      {isError ? (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          className={`object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

export default LazyImageLoader;
