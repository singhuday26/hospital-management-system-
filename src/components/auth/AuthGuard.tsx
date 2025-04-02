
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { user, isLoading, userRoles, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Add periodic token refresh check
  useEffect(() => {
    if (!user) return;
    
    // Check token validity every 5 minutes
    const tokenCheckInterval = setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
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

  // Check authentication and roles
  useEffect(() => {
    if (!isLoading) {
      // Delay slightly to ensure smooth UX
      const timer = setTimeout(() => {
        setIsChecking(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
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
