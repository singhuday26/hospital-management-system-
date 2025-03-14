
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

export default function FeaturesSection() {
  return (
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
  );
}
