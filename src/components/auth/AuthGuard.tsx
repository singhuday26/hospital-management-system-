
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST to prevent missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event);
      
      // Update user state
      setUser(session?.user || null);
      
      // Handle session events
      if (event === 'SIGNED_OUT') {
        setUserRoles([]);
        if (location.pathname !== '/' && location.pathname !== '/login') {
          toast({
            title: "Signed out",
            description: "You have been signed out of your account",
          });
          navigate('/login');
        }
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Auth token refreshed');
      } else if (event === 'USER_UPDATED') {
        console.log('User profile updated');
      }
    });

    // THEN check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        
        if (session?.user) {
          // Fetch user roles if user is authenticated
          const { data: roles, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id);
          
          if (error) {
            console.error('Error fetching user roles:', error);
            toast({
              title: "Error",
              description: "Failed to fetch user permissions",
              variant: "destructive",
            });
          } else {
            setUserRoles(roles.map(r => r.role));
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session:', error);
        toast({
          title: "Authentication Error",
          description: "Failed to verify your login status",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname, toast]);

  // Add periodic token refresh check
  useEffect(() => {
    if (!user) return;
    
    // Check token validity every 5 minutes
    const tokenCheckInterval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log('Session expired, redirecting to login');
        toast({
          title: "Session expired",
          description: "Please sign in again to continue",
        });
        navigate('/login');
      }
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(tokenCheckInterval);
  }, [user, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));
    
    if (!hasRequiredRole) {
      // Redirect to dashboard with insufficient permissions message
      toast({
        title: "Access denied",
        description: `You don't have permission to access this area`,
        variant: "destructive",
      });
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If authenticated and has required role (or no role check needed), render children
  return <>{children}</>;
};

export default AuthGuard;
