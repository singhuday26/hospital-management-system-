
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase credentials with fallbacks for different environments
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://wfqoaievmuheaxmcqthp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcW9haWV2bXVoZWF4bWNxdGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNjQyMTIsImV4cCI6MjA1Mzk0MDIxMn0.u223EFIi_3tA4tQIAQwRzmhtbhOiaNlutW1MRrZd908";

// Create the Supabase client with improved configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: localStorage
    },
    global: {
      // Add global error handler
      fetch: (url: RequestInfo | URL, options?: RequestInit) => {
        return fetch(url, options).catch(error => {
          console.error('Supabase request error:', error);
          // Re-throw for proper handling
          throw error;
        });
      }
    }
  }
);

// Verify connection during development
if (import.meta.env.DEV) {
  console.log('Supabase connection initialized');
}

// Connection test utility
export const testSupabaseConnection = async () => {
  try {
    const start = performance.now();
    const { data, error } = await supabase.from('profiles').select('count');
    const duration = Math.round(performance.now() - start);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return {
        success: false,
        error: error.message,
        duration
      };
    }
    
    console.log(`Supabase connection test successful (${duration}ms)`);
    return {
      success: true,
      duration
    };
  } catch (error) {
    console.error('Supabase connection test exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      duration: -1
    };
  }
};

// Subscribe to auth events globally for debugging in development
if (import.meta.env.DEV) {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth event: ${event}`, session ? 'User present' : 'No user');
  });
}

// Add helper method for session recovery
export const recoverSession = async () => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Session recovery failed:', error);
      return false;
    }
    
    return !!data.session;
  } catch (error) {
    console.error('Session recovery exception:', error);
    return false;
  }
};
