
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyLoadProps {
  children: React.ReactNode;
}

/**
 * LazyLoad component to wrap lazy-loaded components
 * Provides a standardized loading UI
 */
const LazyLoad = ({ children }: LazyLoadProps) => {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full min-h-[200px] p-6 flex flex-col space-y-4 animate-pulse">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoad;
