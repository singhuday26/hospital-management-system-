
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Guard
import AuthGuard from "./components/auth/AuthGuard";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } 
          />
          <Route 
            path="/patients" 
            element={
              <AuthGuard>
                <Patients />
              </AuthGuard>
            } 
          />
          <Route 
            path="/appointments" 
            element={
              <AuthGuard>
                <Appointments />
              </AuthGuard>
            } 
          />
          <Route 
            path="/doctors" 
            element={
              <AuthGuard>
                <Doctors />
              </AuthGuard>
            } 
          />
          <Route 
            path="/billing" 
            element={
              <AuthGuard>
                <Billing />
              </AuthGuard>
            } 
          />
          <Route 
            path="/inventory" 
            element={
              <AuthGuard allowedRoles={['admin']}>
                <Inventory />
              </AuthGuard>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
