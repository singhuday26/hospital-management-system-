
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  CalendarDays, 
  Users, 
  Stethoscope, 
  ClipboardList, 
  FileText, 
  ArrowRight, 
  Activity,
  Shield,
  Search
} from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';

export default function Index() {
  const features = [
    {
      title: 'Patient Management',
      description: 'Track patient information, medical history, and appointments all in one place.',
      icon: <Users />,
      color: 'bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300'
    },
    {
      title: 'Appointment Scheduling',
      description: 'Easily schedule, reschedule, and manage patient appointments.',
      icon: <CalendarDays />,
      color: 'bg-green-50 text-green-500 dark:bg-green-900/30 dark:text-green-300'
    },
    {
      title: 'Doctor Directory',
      description: 'Maintain a directory of doctors with specialties and availability.',
      icon: <Stethoscope />,
      color: 'bg-purple-50 text-purple-500 dark:bg-purple-900/30 dark:text-purple-300'
    },
    {
      title: 'Medical Records',
      description: 'Securely store and access patient medical records and history.',
      icon: <FileText />,
      color: 'bg-orange-50 text-orange-500 dark:bg-orange-900/30 dark:text-orange-300'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Get insights into hospital operations with detailed analytics.',
      icon: <Activity />,
      color: 'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-300'
    },
    {
      title: 'Billing Management',
      description: 'Generate and manage patient bills and payment records.',
      icon: <ClipboardList />,
      color: 'bg-teal-50 text-teal-500 dark:bg-teal-900/30 dark:text-teal-300'
    }
  ];

  const benefits = [
    {
      title: 'Enhanced Patient Care',
      description: 'Streamlined workflows allow healthcare providers to focus more on patient care and less on administrative tasks.',
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: 'Reduced Admin Overhead',
      description: 'Automated scheduling, billing, and record-keeping significantly reduces administrative workload.',
      icon: <ClipboardList className="h-6 w-6" />
    },
    {
      title: 'Improved Data Accuracy',
      description: 'Digital records and validation ensure patient information is always accurate and up-to-date.',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: 'Faster Decision Making',
      description: 'Real-time analytics and reporting tools help administrators make informed decisions quickly.',
      icon: <Activity className="h-6 w-6" />
    }
  ];

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
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 lg:pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={100}>
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  Hospital Management System
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  Transform Your Healthcare Management
                </h1>
                <p className="text-xl text-muted-foreground">
                  A comprehensive solution to efficiently manage patients, appointments, medical records, and administrative tasks in one secure platform.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all" asChild>
                    <Link to="/dashboard">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full" asChild>
                    <a href="#features">Explore Features</a>
                  </Button>
                </div>
              </div>
            </FadeIn>
            
            <div className="relative order-first lg:order-last">
              <div className="aspect-video lg:aspect-square relative">
                <SlideUp delay={300} staggerChildren staggerDelay={150}>
                  <div className="absolute w-[300px] h-[180px] top-0 right-0 lg:right-16 lg:top-16 animate-float z-20">
                    <Card className="w-full h-full shadow-lg glass overflow-hidden">
                      <div className="p-3">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                              <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                            </div>
                            <h3 className="font-medium text-sm">Appointments</h3>
                          </div>
                          <div className="text-xs font-medium text-green-500">+12.5%</div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="absolute w-[280px] h-[140px] top-1/2 -translate-y-1/2 left-0 lg:left-0 lg:top-1/4 animate-float animation-delay-1000 z-10">
                    <Card className="w-full h-full shadow-lg glass overflow-hidden">
                      <div className="p-3">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                              <Users className="h-3.5 w-3.5 text-green-600 dark:text-green-300" />
                            </div>
                            <h3 className="font-medium text-xs">Active Patients</h3>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xl font-semibold">
                          <span>543</span>
                          <div className="text-xs font-medium text-green-500 flex items-center">
                            +8.2%
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="absolute w-[240px] h-[180px] bottom-0 left-1/4 lg:left-1/3 lg:bottom-16 animate-float animation-delay-500 z-30">
                    <Card className="w-full h-full shadow-lg glass overflow-hidden">
                      <div className="p-3">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium text-sm">Doctor Availability</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Dr. Johnson</span>
                            <span className="text-xs text-green-500">Available</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Dr. Miller</span>
                            <span className="text-xs text-green-500">Available</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Dr. Chen</span>
                            <span className="text-xs text-red-500">Unavailable</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Dr. Wilson</span>
                            <span className="text-xs text-green-500">Available</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </SlideUp>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comprehensive Hospital Management</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to efficiently manage your hospital operations in one secure, integrated platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={100 + index * 50}>
                <Card className="h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] overflow-hidden border border-gray-200 dark:border-gray-800">
                  <CardContent className="p-6">
                    <div className={`p-3 rounded-lg ${feature.color} inline-block mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button variant="ghost" className="gap-2 p-0 h-auto text-primary" asChild>
                      <Link to="/dashboard">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose MediCare</h2>
            <p className="text-xl text-muted-foreground">
              Our platform offers numerous benefits to healthcare facilities of all sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <FadeIn key={benefit.title} delay={100 + index * 50}>
                <div className="flex gap-5">
                  <div className={`p-3 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Healthcare Providers</h2>
            <p className="text-xl text-muted-foreground">
              Here's what our clients have to say about MediCare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic flex-grow">
                      "MediCare has completely transformed how we manage patient appointments and records. Our administrative overhead has decreased by 40% since implementation."
                    </p>
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold">JD</div>
                        <div className="ml-3">
                          <h4 className="font-semibold">Dr. James Davis</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Medical Director, City General Hospital</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={150}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic flex-grow">
                      "The analytics dashboard has given us incredible insights into our operations. We've been able to optimize staffing and reduce patient wait times significantly."
                    </p>
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-300 font-semibold">SP</div>
                        <div className="ml-3">
                          <h4 className="font-semibold">Sarah Peters</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Operations Manager, HealthFirst Clinic</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            
            <FadeIn delay={200}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic flex-grow">
                      "Implementing MediCare was incredibly smooth. The interface is intuitive and our staff required minimal training. The billing system alone has paid for the entire investment."
                    </p>
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300 font-semibold">RK</div>
                        <div className="ml-3">
                          <h4 className="font-semibold">Dr. Robert Kim</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Owner, Family Care Practice</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <FadeIn>
                <h2 className="text-3xl font-bold mb-4">Ready to streamline your hospital management?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of healthcare providers who are managing their operations more efficiently with MediCare.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="rounded-full px-8 shadow-lg" asChild>
                    <Link to="/dashboard">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                    <a href="#features">Explore Features</a>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
