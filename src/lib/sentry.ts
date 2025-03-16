
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
  try {
    if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [new BrowserTracing()],
        // Performance monitoring sample rate - adjust based on traffic
        tracesSampleRate: 0.2,
        // Only enable in production
        enabled: Boolean(import.meta.env.VITE_SENTRY_DSN),
        // Capture 100% of errors in production
        sampleRate: 1.0,
        // Set environment
        environment: import.meta.env.MODE || 'production',
        // Don't wait for all events to send before page unloads
        beforeSend(event) {
          return event;
        },
      });
      console.log('Sentry initialized successfully');
    }
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
  }
};

// Helper function to log errors to Sentry
export const logError = (error: unknown, additionalInfo?: Record<string, any>) => {
  console.error(error);
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    try {
      Sentry.captureException(error, {
        extra: additionalInfo,
      });
    } catch (sentryError) {
      console.error('Failed to log to Sentry:', sentryError);
    }
  }
};
