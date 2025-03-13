
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
  Activity 
} from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Index() {
  const features = [
    {
      title: 'Patient Management',
      description: 'Track patient information, medical history, and appointments all in one place.',
      icon: <Users />,
      color: 'bg-blue-50 text-blue-500'
    },
    {
      title: 'Appointment Scheduling',
      description: 'Easily schedule, reschedule, and manage patient appointments.',
      icon: <CalendarDays />,
      color: 'bg-green-50 text-green-500'
    },
    {
      title: 'Doctor Directory',
      description: 'Maintain a directory of doctors with specialties and availability.',
      icon: <Stethoscope />,
      color: 'bg-purple-50 text-purple-500'
    },
    {
      title: 'Medical Records',
      description: 'Securely store and access patient medical records and history.',
      icon: <FileText />,
      color: 'bg-orange-50 text-orange-500'
    },
    {
      title: 'Dashboard & Analytics',
      description: 'Get insights into hospital operations with detailed analytics.',
      icon: <Activity />,
      color: 'bg-red-50 text-red-500'
    },
    {
      title: 'Billing Management',
      description: 'Generate and manage patient bills and payment records.',
      icon: <ClipboardList />,
      color: 'bg-teal-50 text-teal-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 lg:pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={100}>
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  Hospital Management System
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
                  Streamline Your Hospital Operations
                </h1>
                <p className="text-xl text-muted-foreground">
                  A modern, efficient solution to manage patients, appointments, medical records, and more.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" asChild>
                    <Link to="/dashboard">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
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
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <CalendarDays className="h-4 w-4 text-blue-600" />
                            </div>
                            <h3 className="font-medium text-sm">Appointments</h3>
                          </div>
                          <div className="text-xs font-medium text-green-500">+12.5%</div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2.5 bg-gray-100 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <div className="h-2.5 bg-gray-100 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <div className="h-2.5 bg-gray-100 rounded-full w-full overflow-hidden">
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
                            <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center">
                              <Users className="h-3.5 w-3.5 text-green-600" />
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
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Hospital Management</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to efficiently manage your hospital operations in one platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={100 + index * 50}>
                <Card className="h-full transition-all duration-300 hover:shadow-md overflow-hidden">
                  <CardContent className="p-6">
                    <div className={`p-3 rounded-lg ${feature.color} inline-block mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button variant="ghost" className="gap-2 p-0 h-auto" asChild>
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
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <FadeIn>
                <h2 className="text-3xl font-bold mb-4">Ready to streamline your hospital management?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start managing your hospital operations more efficiently today.
                </p>
                <Button size="lg" asChild>
                  <Link to="/dashboard">Get Started Now</Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
