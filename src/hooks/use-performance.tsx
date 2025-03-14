
import { useEffect, useState } from 'react';

type PerformanceMetrics = {
  pageLoadTime: number | null;
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
  firstInputDelay: number | null;
};

export function usePerformance(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: null,
    firstContentfulPaint: null,
    largestContentfulPaint: null,
    firstInputDelay: null,
  });

  useEffect(() => {
    // Skip performance monitoring in development
    if (import.meta.env.DEV) {
      return;
    }

    // Calculate page load time
    window.addEventListener('load', () => {
      if (performance && performance.timing) {
        const pageLoadTime = 
          performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        setMetrics(prev => ({ ...prev, pageLoadTime }));
        
        // Log performance metrics to console in production
        if (import.meta.env.PROD) {
          console.log(`Page load time: ${pageLoadTime}ms`);
        }
      }
    });

    // Handle First Contentful Paint
    const handleFCP = (entries: PerformanceObserverEntryList) => {
      const firstEntry = entries.getEntries()[0];
      const fcp = firstEntry ? firstEntry.startTime : null;
      setMetrics(prev => ({ ...prev, firstContentfulPaint: fcp }));
    };

    // Handle Largest Contentful Paint  
    const handleLCP = (entries: PerformanceObserverEntryList) => {
      const entry = entries.getEntries()[0];
      const lcp = entry ? entry.startTime : null;
      setMetrics(prev => ({ ...prev, largestContentfulPaint: lcp }));
    };

    // Create and observe performance events if browser supports it
    if ('PerformanceObserver' in window) {
      // FCP Observer
      const fcpObserver = new PerformanceObserver(handleFCP);
      fcpObserver.observe({ type: 'paint', buffered: true });

      // LCP Observer
      const lcpObserver = new PerformanceObserver(handleLCP);
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay Observer
      const fidObserver = new PerformanceObserver((entries) => {
        const firstInput = entries.getEntries()[0];
        if (firstInput) {
          // Use type assertion to access processingStart property on PerformanceEventTiming
          const eventTiming = firstInput as PerformanceEventTiming;
          const fid = eventTiming.processingStart - eventTiming.startTime;
          setMetrics(prev => ({ ...prev, firstInputDelay: fid }));
        }
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
      };
    }
  }, []);

  return metrics;
}
