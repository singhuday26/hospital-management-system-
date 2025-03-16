
// Simple Google Analytics integration
export const initAnalytics = () => {
  try {
    if (import.meta.env.PROD && import.meta.env.VITE_GA_MEASUREMENT_ID) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID);
      console.log('Google Analytics initialized successfully');
    }
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  try {
    if (
      import.meta.env.PROD &&
      import.meta.env.VITE_GA_MEASUREMENT_ID &&
      window.gtag
    ) {
      window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

// Track custom events
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  try {
    if (
      import.meta.env.PROD &&
      import.meta.env.VITE_GA_MEASUREMENT_ID &&
      window.gtag
    ) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};
