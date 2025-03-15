
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import ErrorBoundary from "@/components/utils/ErrorBoundary";
import LazyLoad from "@/components/utils/LazyLoad";

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

const App = () => {
  // Set up the theme on initial load
  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = localStorage.getItem('theme') || 'light';
    
    root.classList.remove('light', 'dark');
    root.classList.add(initialTheme);

    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
