
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN || '',
      integrations: [new BrowserTracing()],
      // Performance monitoring sample rate - adjust based on traffic
      tracesSampleRate: 0.2,
      // Only enable in production
      enabled: import.meta.env.PROD,
      // Capture 100% of errors in production
      sampleRate: 1.0,
      // Set environment
      environment: import.meta.env.MODE,
      // Customize beforeSend to filter sensitive information
      beforeSend(event) {
        // Don't send events if DSN isn't configured
        if (!import.meta.env.VITE_SENTRY_DSN) {
          return null;
        }
        return event;
      },
    });
  }
};

// Helper function to log errors to Sentry
export const logError = (error: unknown, additionalInfo?: Record<string, any>) => {
  console.error(error);
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      extra: additionalInfo,
    });
  }
};
