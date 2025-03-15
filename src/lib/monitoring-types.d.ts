
// Global type extensions for monitoring
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    Sentry?: {
      captureMessage: (message: string, options?: any) => void;
      captureException: (error: Error, options?: any) => void;
    };
  }
}

// Web Vitals types
export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  delta?: number;
  entries: PerformanceEntry[];
}

export {};
