
import { useSearchParams } from 'react-router-dom';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load the appointment form for better initial page load
const LazyAppointmentForm = lazy(() => import('@/components/appointments/AppointmentForm'));

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || undefined;
  const doctorId = searchParams.get('doctorId') || undefined;
  
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading booking form...</span>
        </div>
      }>
        <LazyAppointmentForm initialPatientId={patientId} initialDoctorId={doctorId} />
      </Suspense>
    </div>
  );
}
