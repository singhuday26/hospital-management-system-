
import React, { useState, useEffect, useCallback } from 'react';
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
import { Loader2 } from 'lucide-react';

// Import the component modules
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use our custom hook to manage data fetching
  const { 
    patients, 
    doctors, 
    availableTimeSlots, 
    fetchTimeSlots,
    isLoadingPatients,
    isLoadingDoctors,
    isLoadingTimeSlots
  } = useAppointmentFormData();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: initialPatientId || '',
      doctorId: initialDoctorId || '',
      notes: '',
      type: 'Checkup',
    },
  });
  
  // Watch for selected doctor and date to load available times
  const selectedDoctor = form.watch('doctorId');
  const selectedDate = form.watch('date');
  
  // Fetch available time slots when doctor and date are selected - memoized to prevent unnecessary fetches
  const fetchTimeSlotsForSelection = useCallback(() => {
    if (selectedDoctor && selectedDate) {
      fetchTimeSlots(selectedDoctor, selectedDate);
    }
  }, [selectedDoctor, selectedDate, fetchTimeSlots]);
  
  // Effect for fetching time slots
  useEffect(() => {
    fetchTimeSlotsForSelection();
  }, [fetchTimeSlotsForSelection]);
  
  // Submit handler - optimized to prevent double submissions
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
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
        toast({
          title: "Success",
          description: "Appointment booked successfully",
        });
        
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/appointments');
        }
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <FadeIn>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BackButton className="mr-2" />
            <h2 className="text-2xl font-bold">Book New Appointment</h2>
          </div>
          {(isLoadingPatients || isLoadingDoctors) && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Loading data...
            </div>
          )}
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Selection */}
              <PatientSelect 
                patients={patients} 
                control={form.control} 
                disabled={isSubmitting} 
                isLoading={isLoadingPatients}
              />
              
              {/* Doctor Selection */}
              <DoctorSelect 
                doctors={doctors} 
                control={form.control} 
                disabled={isSubmitting} 
                isLoading={isLoadingDoctors}
              />
              
              {/* Appointment Type Selection */}
              <AppointmentTypeSelect 
                control={form.control} 
                disabled={isSubmitting} 
              />
              
              {/* Date Selection */}
              <DateSelect 
                control={form.control} 
                disabled={isSubmitting} 
              />
              
              {/* Time Selection */}
              <TimeSlotSelect 
                control={form.control}
                availableTimeSlots={availableTimeSlots}
                isDisabled={isSubmitting}
                hasSelectedDoctor={!!selectedDoctor}
                hasSelectedDate={!!selectedDate}
                isLoading={isLoadingTimeSlots}
              />
              
              {/* Notes */}
              <NotesField 
                control={form.control} 
                disabled={isSubmitting} 
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting || isLoadingPatients || isLoadingDoctors} 
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : "Book Appointment"}
            </Button>
          </form>
        </Form>
      </div>
    </FadeIn>
  );
}
