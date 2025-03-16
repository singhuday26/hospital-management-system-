
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense, useState } from "react";
import ErrorBoundary from "@/components/utils/ErrorBoundary";
import LazyLoad from "@/components/utils/LazyLoad";

// Monitoring integrations
import { initSentry } from "@/lib/sentry";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import { initWebVitals } from "@/lib/web-vitals";

// Auth Guard
import AuthGuard from "./components/auth/AuthGuard";

// Eagerly load the Index page for better initial load performance
import Index from "./pages/Index";

// Lazy load other pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Patients = lazy(() => import("./pages/Patients"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Login = lazy(() => import("./pages/Login"));
const Billing = lazy(() => import("./pages/Billing"));
const Inventory = lazy(() => import("./pages/Inventory"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Initialize monitoring in production
if (import.meta.env.PROD) {
  try {
    initSentry();
    initAnalytics();
    initWebVitals();
  } catch (error) {
    console.error("Failed to initialize monitoring:", error);
  }
}

// Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      gcTime: 1000 * 60 * 30, // 30 minutes (replaces cacheTime)
    },
  },
});

// PageViewTracker component to track route changes
const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
  }, [location]);
  
  return null;
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Set up the theme on initial load
  useEffect(() => {
    try {
      const root = window.document.documentElement;
      const initialTheme = localStorage.getItem('theme') || 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(initialTheme);

      // Add smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Mark as initialized
      setIsInitialized(true);
      
      return () => {
        document.documentElement.style.scrollBehavior = '';
      };
    } catch (error) {
      console.error("Failed to initialize app:", error);
      setIsInitialized(true); // Continue anyway
    }
  }, []);

  if (!isInitialized) {
    return null; // Wait for initialization
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageViewTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={
                <LazyLoad>
                  <Login />
                </LazyLoad>
              } />
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard>
                    <LazyLoad>
                      <Dashboard />
                    </LazyLoad>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/patients" 
                element={
                  <AuthGuard>
                    <LazyLoad>
                      <Patients />
                    </LazyLoad>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/appointments" 
                element={
                  <AuthGuard>
                    <LazyLoad>
                      <Appointments />
                    </LazyLoad>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/doctors" 
                element={
                  <AuthGuard>
                    <LazyLoad>
                      <Doctors />
                    </LazyLoad>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/billing" 
                element={
                  <AuthGuard>
                    <LazyLoad>
                      <Billing />
                    </LazyLoad>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/inventory" 
                element={
                  <AuthGuard allowedRoles={['admin']}>
                    <LazyLoad>
                      <Inventory />
                    </LazyLoad>
                  </AuthGuard>
                } 
              />
              <Route path="*" element={
                <LazyLoad>
                  <NotFound />
                </LazyLoad>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
