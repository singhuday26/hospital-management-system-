
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/react';
import { logError } from '@/lib/sentry';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Enhanced ErrorBoundary component with Sentry integration
 * Displays a fallback UI when an error occurs and reports to Sentry in production
 */
class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console in development and to Sentry in production
    console.error('Uncaught error:', error, errorInfo);
    
    // Log to Sentry in production
    logError(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-sm bg-red-50 dark:bg-red-900/10">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4 text-center">
            We're sorry, but an error occurred. Our team has been notified.
          </p>
          <div className="flex space-x-4">
            <Button
              onClick={() => window.location.reload()}
              variant="destructive"
            >
              Refresh Page
            </Button>
            {import.meta.env.PROD && (
              <Button
                onClick={() => 
                  Sentry.showReportDialog({ 
                    eventId: Sentry.lastEventId() 
                  })
                }
                variant="outline"
              >
                Report Feedback
              </Button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default EnhancedErrorBoundary;
