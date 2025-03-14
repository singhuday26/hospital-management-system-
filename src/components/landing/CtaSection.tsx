
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';

export default function CtaSection() {
  return (
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
  );
}
