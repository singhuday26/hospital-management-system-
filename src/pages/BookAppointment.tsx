
import { useSearchParams } from 'react-router-dom';
import AppointmentForm from '@/components/appointments/AppointmentForm';

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || undefined;
  const doctorId = searchParams.get('doctorId') || undefined;
  
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <AppointmentForm initialPatientId={patientId} initialDoctorId={doctorId} />
    </div>
  );
}
