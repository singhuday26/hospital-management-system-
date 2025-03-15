
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CtaSection from '@/components/landing/CtaSection';
import { usePerformance } from '@/hooks/use-performance';
import { useEffect } from 'react';
import ErrorBoundary from '@/components/utils/ErrorBoundary';

export default function Index() {
  // Track page performance
  const metrics = usePerformance();
  
  // Log performance metrics in production
  useEffect(() => {
    if (import.meta.env.PROD && metrics.pageLoadTime) {
      // This would typically send to an analytics service
      console.log('Performance metrics:', metrics);
    }
  }, [metrics]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>MediCare - Hospital Management System</title>
        <meta name="description" content="A comprehensive hospital management system for streamlining patient care, appointments, billing, and administrative tasks." />
        <meta name="keywords" content="hospital management, healthcare, patient management, appointment scheduling, medical records, billing" />
        <meta property="og:title" content="MediCare - Hospital Management System" />
        <meta property="og:description" content="A comprehensive hospital management system for streamlining patient care, appointments, billing, and administrative tasks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://medicare.example.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://medicare.example.com" />
        
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* PWA meta tags */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>
      
      <Navbar />
      
      {/* Main content sections with improved stability */}
      <main className="flex-grow">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <FeaturesSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <BenefitsSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <TestimonialsSection />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <CtaSection />
        </ErrorBoundary>
      </main>
      
      <Footer />
    </div>
  );
}
