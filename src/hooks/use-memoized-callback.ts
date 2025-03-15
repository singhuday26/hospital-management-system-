import { useCallback, useRef } from 'react';

/**
 * Custom hook for memoizing callbacks with dependencies
 * Similar to useCallback but prevents unnecessary renders
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T {
  // Keep track of the latest callback
  const callbackRef = useRef<T>(callback);
  
  // Update the callback ref whenever it changes
  callbackRef.current = callback;
  
  // Return a memoized version of the callback
  return useCallback(
    ((...args: any[]) => {
      // Call the latest callback
      return callbackRef.current(...args);
    }) as T,
    dependencies
  );
}
