
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarDays, Users } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import SlideUp from '@/components/animations/SlideUp';

export default function HeroSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo and Project Name Banner */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight animate-fade-in mb-2">
            MediCare
          </h1>
          <div className="bg-primary/10 h-1 w-40 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground">Advanced Hospital Management System</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={100}>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                Transform Your Healthcare Management
              </h2>
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
          
          <div className="relative lg:order-last">
            <div className="aspect-video lg:aspect-square relative">
              <SlideUp delay={300} staggerChildren staggerDelay={150}>
                {/* Dashboard Cards */}
                <div className="absolute w-[300px] h-[180px] top-0 right-0 lg:right-16 lg:top-16 animate-float z-20">
                  <Card className="w-full h-full shadow-lg glass overflow-hidden border-2 border-gray-100 dark:border-gray-800">
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
                  <Card className="w-full h-full shadow-lg glass overflow-hidden border-2 border-gray-100 dark:border-gray-800">
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
                  <Card className="w-full h-full shadow-lg glass overflow-hidden border-2 border-gray-100 dark:border-gray-800">
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-sm">Doctor Availability</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Dr. Arjun Reddy</span>
                          <span className="text-xs text-green-500">Available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Dr. Meera Agarwal</span>
                          <span className="text-xs text-green-500">Available</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Dr. Kavita Desai</span>
                          <span className="text-xs text-red-500">Unavailable</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Dr. Rajan Verma</span>
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
  );
}
