
// This file is based on recommendations from web.dev for monitoring Web Vitals

import { ReportHandler } from 'web-vitals';

// Define the metrics we want to capture
type Metric = {
  id: string;
  name: string;
  value: number;
  delta?: number;
};

// Helper function to send metrics to analytics
const sendToAnalytics = ({ name, id, value, delta }: Metric) => {
  // Ensure Google Analytics is loaded if you want to send metrics there
  if (window.gtag && import.meta.env.VITE_GA_MEASUREMENT_ID) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS values need to be multiplied
      non_interaction: true, // Don't count these events as user interactions
    });
  }

  // You can also log to console in development
  if (import.meta.env.DEV) {
    console.log('Web Vitals:', name, value);
  }

  // Optionally send to Sentry if available
  if (import.meta.env.PROD && window.Sentry) {
    window.Sentry.captureMessage(`Web Vital: ${name}`, {
      level: 'info',
      extra: { id, value, delta },
    });
  }
};

// Function to report all vitals
export const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry); // First Input Delay
      getFCP(onPerfEntry); // First Contentful Paint
      getLCP(onPerfEntry); // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

// Initialize web vitals reporting
export const initWebVitals = () => {
  if (import.meta.env.PROD) {
    reportWebVitals(sendToAnalytics);
  }
};
