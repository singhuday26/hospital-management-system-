
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency: number;
  error?: string;
  timestamp: string;
}

/**
 * Performs a health check on the Supabase connection
 */
export const checkDatabaseHealth = async (): Promise<HealthCheckResult> => {
  const startTime = performance.now();
  
  try {
    // Perform a minimal query to check database connectivity
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
      .maybeSingle();
      
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    
    if (error) {
      console.error('Database health check failed:', error);
      return {
        status: 'unhealthy',
        latency,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
    
    // Check if latency is acceptable
    const status = latency < 500 ? 'healthy' : 'degraded';
    
    return {
      status,
      latency,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    
    console.error('Database health check exception:', error);
    return {
      status: 'unhealthy',
      latency,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Reports a database error and shows a toast notification
 */
export const reportDatabaseError = (error: any, context: string): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`Database error in ${context}:`, error);
  
  // Show toast notification for user
  toast({
    title: 'Database Error',
    description: `An error occurred while ${context}. Please try again later.`,
    variant: 'destructive',
  });
  
  // In production, you might want to log this to a monitoring service
  if (import.meta.env.PROD) {
    // Send to monitoring service (placeholder)
    console.error(`[MONITORING] Database error in ${context}: ${errorMessage}`);
  }
};

/**
 * Optimized query helper with automatic error handling
 */
export const safeQuery = async <T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  context: string
): Promise<T | null> => {
  try {
    const { data, error } = await queryFn();
    
    if (error) {
      reportDatabaseError(error, context);
      return null;
    }
    
    return data;
  } catch (error) {
    reportDatabaseError(error, context);
    return null;
  }
};

/**
 * Adds real-time subscription to a table
 */
export const subscribeToTable = (
  table: string,
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
  callback: (payload: any) => void
) => {
  // Using the correct type for the channel event
  const channel = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event,
        schema: 'public',
        table,
      },
      callback
    )
    .subscribe();
    
  // Return unsubscribe function
  return () => {
    void supabase.removeChannel(channel);
  };
};
