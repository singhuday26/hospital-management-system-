
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Appointment } from '@/lib/types';

export interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'Checkup' | 'Consultation' | 'Surgery' | 'Follow-up';
  notes?: string;
}

/**
 * Creates a new appointment in the database
 */
export const bookAppointment = async (data: AppointmentFormData): Promise<{
  success: boolean;
  appointment?: Appointment;
  error?: string;
}> => {
  try {
    const { data: newAppointment, error } = await supabase
      .from('appointments')
      .insert([{
        patient_id: data.patientId,
        doctor_id: data.doctorId,
        date: data.date,
        time: data.time,
        type: data.type,
        notes: data.notes,
        status: 'scheduled'
      }])
      .select('*, patients:patient_id(name), doctors:doctor_id(name)')
      .single();

    if (error) throw error;

    // Transform to our Appointment type
    const appointment: Appointment = {
      id: newAppointment.id,
      patientId: newAppointment.patient_id,
      patientName: newAppointment.patients?.name || '',
      doctorId: newAppointment.doctor_id,
      doctorName: newAppointment.doctors?.name || '',
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type as 'Checkup' | 'Consultation' | 'Surgery' | 'Follow-up',
      status: newAppointment.status as 'scheduled' | 'confirmed' | 'cancelled' | 'completed',
      notes: newAppointment.notes
    };

    toast({
      title: "Appointment Booked",
      description: `Appointment scheduled successfully for ${appointment.date} at ${appointment.time}`,
    });

    return { success: true, appointment };
  } catch (error: any) {
    console.error('Error booking appointment:', error);
    
    toast({
      title: "Booking Failed",
      description: error.message || "Failed to book appointment. Please try again.",
      variant: "destructive"
    });
    
    return {
      success: false,
      error: error.message || "Unknown error occurred"
    };
  }
};

/**
 * Gets available time slots for a doctor on a specific date
 */
export const getAvailableTimeSlots = async (
  doctorId: string,
  date: string
): Promise<string[]> => {
  try {
    // First, get the doctor's availability
    const { data: doctorData, error: doctorError } = await supabase
      .from('doctors')
      .select('available_time_start, available_time_end, available_days')
      .eq('id', doctorId)
      .single();

    if (doctorError) throw doctorError;
    
    // Check if doctor works on this day of the week
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const availableDays = doctorData.available_days?.map(day => day.toLowerCase()) || 
                          ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    
    if (!availableDays.includes(dayOfWeek.toLowerCase())) {
      return [];
    }
    
    // Get default office hours if not specified
    const startTime = doctorData.available_time_start || '09:00:00';
    const endTime = doctorData.available_time_end || '17:00:00';
    
    // Now get booked appointments for this doctor on this date
    const { data: bookedAppointments, error: bookingError } = await supabase
      .from('appointments')
      .select('time')
      .eq('doctor_id', doctorId)
      .eq('date', date);
    
    if (bookingError) throw bookingError;
    
    // Generate time slots (30 min intervals)
    const bookedTimes = bookedAppointments.map(app => app.time);
    const slots = generateTimeSlots(startTime, endTime, 30);
    
    // Filter out booked slots
    return slots.filter(slot => !bookedTimes.includes(slot));
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    return [];
  }
};

/**
 * Helper to generate time slots
 */
const generateTimeSlots = (
  startTime: string,
  endTime: string,
  intervalMinutes: number
): string[] => {
  const slots: string[] = [];
  
  // Parse start and end times
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMinute = startMinute;
  
  // Generate slots until we reach end time
  while (
    currentHour < endHour || 
    (currentHour === endHour && currentMinute < endMinute)
  ) {
    // Format the time slot
    const formattedHour = currentHour.toString().padStart(2, '0');
    const formattedMinute = currentMinute.toString().padStart(2, '0');
    slots.push(`${formattedHour}:${formattedMinute}:00`);
    
    // Move to next slot
    currentMinute += intervalMinutes;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  }
  
  return slots;
};
