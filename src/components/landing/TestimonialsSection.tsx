
import { Card, CardContent } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';

export default function TestimonialsSection() {
  return (
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
  );
}
