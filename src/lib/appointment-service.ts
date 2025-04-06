
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
    // Clean and validate the input data
    const cleanData = {
      patient_id: data.patientId.trim(),
      doctor_id: data.doctorId.trim(),
      date: data.date,
      time: data.time,
      type: data.type,
      notes: data.notes?.trim() || null,
      status: 'scheduled'
    };

    // Check for required fields
    if (!cleanData.patient_id || !cleanData.doctor_id || !cleanData.date || !cleanData.time) {
      return {
        success: false,
        error: "All required fields must be provided"
      };
    }
    
    // Create appointment with optimized query
    const { data: newAppointment, error } = await supabase
      .from('appointments')
      .insert([cleanData])
      .select('id, patient_id, doctor_id, date, time, type, status, notes')
      .single();

    if (error) throw error;
    
    // Fetch patient and doctor names in parallel to improve performance
    const [patientResult, doctorResult] = await Promise.all([
      supabase.from('patients').select('name').eq('id', newAppointment.patient_id).single(),
      supabase.from('doctors').select('name').eq('id', newAppointment.doctor_id).single()
    ]);

    // Transform to our Appointment type
    const appointment: Appointment = {
      id: newAppointment.id,
      patientId: newAppointment.patient_id,
      patientName: patientResult.data?.name || 'Unknown Patient',
      doctorId: newAppointment.doctor_id,
      doctorName: doctorResult.data?.name || 'Unknown Doctor',
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      status: newAppointment.status,
      notes: newAppointment.notes
    };

    toast({
      title: "Appointment Booked",
      description: `Appointment scheduled for ${appointment.date} at ${appointment.time}`,
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

// Improved time slot cache with expiration
const timeSlotCache = new Map<string, {
  slots: string[],
  timestamp: number
}>();

// Clear cache periodically to prevent memory leaks
const CACHE_LIFETIME = 5 * 60 * 1000; // 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of timeSlotCache.entries()) {
    if (now - value.timestamp > CACHE_LIFETIME) {
      timeSlotCache.delete(key);
    }
  }
}, CACHE_LIFETIME);

/**
 * Gets available time slots for a doctor on a specific date
 * Optimized with better caching and error handling
 */
export const getAvailableTimeSlots = async (
  doctorId: string,
  date: string
): Promise<string[]> => {
  try {
    if (!doctorId || !date) {
      return [];
    }
    
    // Create a cache key from doctor ID and date
    const cacheKey = `${doctorId}-${date}`;
    
    // Check if we have cached data less than 2 minutes old
    const cachedData = timeSlotCache.get(cacheKey);
    const now = Date.now();
    
    if (cachedData && (now - cachedData.timestamp < 120000)) {
      return cachedData.slots;
    }
    
    // First, get the doctor's availability with a timeout of 5 seconds
    const controllerDoctor = new AbortController();
    const timeoutDoctorId = setTimeout(() => controllerDoctor.abort(), 5000);
    
    const { data: doctorData, error: doctorError } = await supabase
      .from('doctors')
      .select('available_time_start, available_time_end, available_days')
      .eq('id', doctorId)
      .single()
      .abortSignal(controllerDoctor.signal);
      
    clearTimeout(timeoutDoctorId);
    
    if (doctorError) {
      console.error('Error fetching doctor data:', doctorError);
      return [];
    }
    
    if (!doctorData) {
      return [];
    }
    
    // Check if doctor works on this day of the week
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const availableDays = doctorData.available_days?.map(day => day.toLowerCase()) || 
                        ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    
    if (!availableDays.includes(dayOfWeek.toLowerCase())) {
      // Cache the empty result
      timeSlotCache.set(cacheKey, { slots: [], timestamp: now });
      return [];
    }
    
    // Get default office hours if not specified
    const startTime = doctorData.available_time_start || '09:00:00';
    const endTime = doctorData.available_time_end || '17:00:00';
    
    // Now get booked appointments for this doctor on this date with a timeout
    const controllerBookings = new AbortController();
    const timeoutBookingId = setTimeout(() => controllerBookings.abort(), 5000);
    
    const { data: bookedAppointments, error: bookingError } = await supabase
      .from('appointments')
      .select('time')
      .eq('doctor_id', doctorId)
      .eq('date', date)
      .abortSignal(controllerBookings.signal);
    
    clearTimeout(timeoutBookingId);
    
    if (bookingError) {
      console.error('Error fetching booked appointments:', bookingError);
      // Return generated slots even if we can't fetch bookings
      const allSlots = generateTimeSlots(startTime, endTime, 30);
      timeSlotCache.set(cacheKey, { slots: allSlots, timestamp: now });
      return allSlots;
    }
    
    // Generate time slots (30 min intervals)
    const bookedTimes = bookedAppointments?.map(app => app.time) || [];
    const slots = generateTimeSlots(startTime, endTime, 30);
    
    // Filter out booked slots
    const availableSlots = slots.filter(slot => !bookedTimes.includes(slot));
    
    // Cache the result
    timeSlotCache.set(cacheKey, { slots: availableSlots, timestamp: now });
    
    return availableSlots;
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    return [];
  }
};

/**
 * Optimized helper to generate time slots
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
  
  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0, 0);
  
  const endDate = new Date();
  endDate.setHours(endHour, endMinute, 0, 0);
  
  // Generate slots using date objects for better accuracy
  const currentTime = new Date(startDate);
  
  while (currentTime < endDate) {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    slots.push(`${hours}:${minutes}:00`);
    
    // Add interval
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }
  
  return slots;
};
