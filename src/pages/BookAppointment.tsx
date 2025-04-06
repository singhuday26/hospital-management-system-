
import { useSearchParams } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the appointment form for better initial page load
const LazyAppointmentForm = lazy(() => import('@/components/appointments/AppointmentForm'));

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || undefined;
  const doctorId = searchParams.get('doctorId') || undefined;
  
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <Suspense fallback={<LoadingBookingForm />}>
        <LazyAppointmentForm initialPatientId={patientId} initialDoctorId={doctorId} />
      </Suspense>
    </div>
  );
}

function LoadingBookingForm() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-48" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      
      <Skeleton className="h-10 w-full mt-6" />
    </div>
  );
}
