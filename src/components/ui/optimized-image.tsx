
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurPlaceholder?: boolean;
  lazyLoad?: boolean;
}

/**
 * OptimizedImage component for better image loading practices
 * Supports lazy loading, blur placeholders, and fallbacks
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  blurPlaceholder = false,
  lazyLoad = true,
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setError(false);
  }, [src]);
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };
  
  // Calculate aspect ratio for proper placeholders
  const aspectRatio = width && height ? `aspect-[${width}/${height}]` : 'aspect-auto';
  
  return (
    <div className={`relative ${aspectRatio} overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          {blurPlaceholder ? (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
          ) : (
            <Skeleton className="w-full h-full" />
          )}
        </div>
      )}
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-sm text-muted-foreground">Image failed to load</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={lazyLoad ? "lazy" : "eager"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
