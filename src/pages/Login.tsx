
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isLoading, signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  
  // If user is logged in, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // First, check if Supabase is available
      const { success: connectionSuccess } = await testConnection();
      
      if (!connectionSuccess) {
        toast({
          title: "Connection error",
          description: "Unable to connect to the authentication service. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const { success, error } = await signIn(loginEmail, loginPassword);
      
      if (!success) {
        toast({
          title: "Login failed",
          description: error || "Please check your credentials and try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate form
      if (!registerEmail || !registerPassword || !registerFirstName || !registerLastName) {
        toast({
          title: "Registration failed",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // First, check if Supabase is available
      const { success: connectionSuccess } = await testConnection();
      
      if (!connectionSuccess) {
        toast({
          title: "Connection error",
          description: "Unable to connect to the authentication service. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      const { success, error } = await signUp(
        registerEmail, 
        registerPassword, 
        {
          first_name: registerFirstName,
          last_name: registerLastName,
        }
      );
      
      if (!success) {
        toast({
          title: "Registration failed",
          description: error || "Please check your input and try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Please check your input and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Test Supabase connection
  const testConnection = async () => {
    try {
      // Simple query to test connection
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      
      if (error) {
        console.error("Supabase connection test failed:", error);
        return { success: false };
      }
      
      return { success: true };
    } catch (error) {
      console.error("Supabase connection test exception:", error);
      return { success: false };
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <FadeIn>
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold text-primary">MediCare</h1>
            <p className="text-muted-foreground">Hospital Management System</p>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Email"
                        className="pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        autoComplete="email"
                        disabled={loading || isLoading}
                      />
                    </div>
                    
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-10 pr-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        disabled={loading || isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading || isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading || isLoading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      value={registerFirstName}
                      onChange={(e) => setRegisterFirstName(e.target.value)}
                      required
                      disabled={loading || isLoading}
                    />
                    <Input
                      placeholder="Last Name"
                      value={registerLastName}
                      onChange={(e) => setRegisterLastName(e.target.value)}
                      required
                      disabled={loading || isLoading}
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      className="pl-10"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      autoComplete="email"
                      disabled={loading || isLoading}
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="pl-10 pr-10"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      disabled={loading || isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading || isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading || isLoading}>
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <Separator />
          
          <CardFooter className="text-center text-sm text-muted-foreground pt-4 px-8">
            <p className="w-full">
              By using our service, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
}
