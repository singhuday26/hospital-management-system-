
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse, UserProfile } from '@/lib/api-types';
import { Session, User } from '@supabase/supabase-js';
import { getUserProfile, getUserRoles } from '@/lib/supabase-service';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  roles: string[];
  isLoading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: string | string[]) => boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await getUserProfile();
      
      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }
      
      setProfile(data || null);
    } catch (error) {
      console.error("Exception fetching user profile:", error);
    }
  };

  // Fetch user roles
  const fetchUserRoles = async (userId: string) => {
    try {
      const { data, error } = await getUserRoles();
      
      if (error) {
        console.error("Error fetching user roles:", error);
        return;
      }
      
      setRoles(data || []);
    } catch (error) {
      console.error("Exception fetching user roles:", error);
    }
  };

  // Initialize auth state and subscribe to changes
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        // Update session and user state
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Use setTimeout to avoid Supabase deadlock issues
          setTimeout(() => {
            fetchUserProfile(newSession.user.id);
            fetchUserRoles(newSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setRoles([]);
        }
      }
    );
    
    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          await Promise.all([
            fetchUserProfile(currentSession.user.id),
            fetchUserRoles(currentSession.user.id)
          ]);
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Helper to check if user has specific role(s)
  const hasRole = (roleCheck: string | string[]): boolean => {
    if (!roles.length) return false;
    
    if (Array.isArray(roleCheck)) {
      return roleCheck.some(role => roles.includes(role));
    }
    
    return roles.includes(roleCheck);
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      return {
        success: false,
        error: error.message || 'Authentication failed. Please check your credentials.',
      };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      return {
        success: false,
        error: error.message || 'Registration failed. Please try again later.',
      };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Sign out error:', error);
      
      return {
        success: false,
        error: error.message || 'Failed to sign out. Please try again later.',
      };
    }
  };

  // Refresh user profile data
  const refreshProfile = async () => {
    if (!user) return;
    
    await Promise.all([
      fetchUserProfile(user.id),
      fetchUserRoles(user.id)
    ]);
  };
  
  const value = {
    user,
    session,
    profile,
    roles,
    isLoading,
    isAuthenticated: !!user,
    hasRole,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  
  return context;
};
