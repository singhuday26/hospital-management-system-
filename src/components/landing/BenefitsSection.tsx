
import { Shield, ClipboardList, FileText, Activity } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

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

export default function BenefitsSection() {
  return (
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
  );
}
