
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AppointmentFormData, bookAppointment } from '@/lib/appointment-service';
import FadeIn from '@/components/animations/FadeIn';
import { BackButton } from '@/components/ui/back-button';
import { useAppointmentFormData } from '@/hooks/use-appointment-form-data';

// Import the new component modules
import PatientSelect from './PatientSelect';
import DoctorSelect from './DoctorSelect';
import AppointmentTypeSelect from './AppointmentTypeSelect';
import DateSelect from './DateSelect';
import TimeSlotSelect from './TimeSlotSelect';
import NotesField from './NotesField';

const formSchema = z.object({
  patientId: z.string({
    required_error: "Please select a patient",
  }),
  doctorId: z.string({
    required_error: "Please select a doctor",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  type: z.enum(['Checkup', 'Consultation', 'Surgery', 'Follow-up'], {
    required_error: "Please select appointment type",
  }),
  notes: z.string().optional(),
});

interface AppointmentFormProps {
  onSuccess?: () => void;
  initialPatientId?: string;
  initialDoctorId?: string;
}

export default function AppointmentForm({
  onSuccess,
  initialPatientId,
  initialDoctorId,
}: AppointmentFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Use our custom hook to manage data fetching
  const { 
    patients, 
    doctors, 
    availableTimeSlots, 
    fetchTimeSlots 
  } = useAppointmentFormData();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: initialPatientId || '',
      doctorId: initialDoctorId || '',
      notes: '',
    },
  });
  
  // Watch for selected doctor and date to load available times
  const selectedDoctor = form.watch('doctorId');
  const selectedDate = form.watch('date');
  
  // Fetch available time slots when doctor and date are selected
  import React from 'react';
  
  React.useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchTimeSlots(selectedDoctor, selectedDate);
    }
  }, [selectedDoctor, selectedDate, fetchTimeSlots]);
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Format the data
      const appointmentData: AppointmentFormData = {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        type: data.type,
        notes: data.notes
      };
      
      const result = await bookAppointment(appointmentData);
      
      if (result.success) {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/appointments');
        }
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <FadeIn>
      <div className="space-y-6">
        <div className="flex items-center">
          <BackButton className="mr-2" />
          <h2 className="text-2xl font-bold">Book New Appointment</h2>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Selection */}
              <PatientSelect 
                patients={patients} 
                control={form.control} 
                disabled={isLoading} 
              />
              
              {/* Doctor Selection */}
              <DoctorSelect 
                doctors={doctors} 
                control={form.control} 
                disabled={isLoading} 
              />
              
              {/* Appointment Type Selection */}
              <AppointmentTypeSelect 
                control={form.control} 
                disabled={isLoading} 
              />
              
              {/* Date Selection */}
              <DateSelect 
                control={form.control} 
                disabled={isLoading} 
              />
              
              {/* Time Selection */}
              <TimeSlotSelect 
                control={form.control}
                availableTimeSlots={availableTimeSlots}
                isDisabled={isLoading}
                hasSelectedDoctor={!!selectedDoctor}
                hasSelectedDate={!!selectedDate}
              />
              
              {/* Notes */}
              <NotesField 
                control={form.control} 
                disabled={isLoading} 
              />
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </form>
        </Form>
      </div>
    </FadeIn>
  );
}
