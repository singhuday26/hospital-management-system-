import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CtaSection from '@/components/landing/CtaSection';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>MediCare - Hospital Management System</title>
        <meta name="description" content="A comprehensive hospital management system for streamlining patient care, appointments, billing, and administrative tasks." />
        <meta name="keywords" content="hospital management, healthcare, patient management, appointment scheduling, medical records, billing" />
        <meta property="og:title" content="MediCare - Hospital Management System" />
        <meta property="og:description" content="A comprehensive hospital management system for streamlining patient care, appointments, billing, and administrative tasks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://medicare.example.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <Navbar />
      
      {/* Main content sections */}
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
      
      <Footer />
    </div>
  );
}
