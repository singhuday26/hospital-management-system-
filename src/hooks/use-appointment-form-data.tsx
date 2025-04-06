
import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Patient, Doctor } from '@/lib/types';
import { getAvailableTimeSlots } from '@/lib/appointment-service';
import { Json } from '@/integrations/supabase/types';

export function useAppointmentFormData() {
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch patients and doctors
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Use Promise.all to fetch patients and doctors in parallel
        const [patientsResponse, doctorsResponse] = await Promise.all([
          supabase.from('patients').select('*').order('name'),
          supabase.from('doctors').select('*').order('name')
        ]);
        
        if (patientsResponse.error) {
          throw new Error(`Error fetching patients: ${patientsResponse.error.message}`);
        }
        
        if (doctorsResponse.error) {
          throw new Error(`Error fetching doctors: ${doctorsResponse.error.message}`);
        }
        
        // Transform from DB format to our Patient type
        const transformedPatients: Patient[] = patientsResponse.data.map(patient => ({
          id: patient.id,
          name: patient.name,
          patientId: patient.id, // Use the same ID for both fields
          gender: patient.gender as 'male' | 'female' | 'other',
          age: patient.age || 0,
          phone: patient.phone || '',
          email: patient.email || '',
          address: patient.address || '',
          status: patient.status as 'active' | 'inactive' | 'pending',
          lastVisit: patient.last_visit || '',
          medicalHistory: patient.medical_history 
            ? (Array.isArray(patient.medical_history) 
                ? (patient.medical_history as any[]).map(item => ({
                    condition: item?.condition || '',
                    diagnosedDate: item?.diagnosedDate || ''
                  }))
                : []) 
            : []
        }));
        
        // Transform from DB format to our Doctor type
        const transformedDoctors: Doctor[] = doctorsResponse.data.map(doctor => ({
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
          image: doctor.image_url,
          experience: doctor.experience || 0,
          phone: doctor.phone || '',
          email: doctor.email || '',
          availableDays: doctor.available_days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          availableTime: {
            start: doctor.available_time_start || '09:00:00',
            end: doctor.available_time_end || '17:00:00'
          },
          rating: doctor.rating || 4.5,
          patientsCount: doctor.patients_count || 0,
          about: doctor.about || ''
        }));
        
        setPatients(transformedPatients);
        setDoctors(transformedDoctors);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Helper function to fetch time slots when doctor and date are selected
  const fetchTimeSlots = useCallback(async (doctorId: string, date: Date) => {
    if (!doctorId || !date) {
      setAvailableTimeSlots([]);
      return;
    }
    
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const slots = await getAvailableTimeSlots(doctorId, formattedDate);
      setAvailableTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      toast({
        title: 'Error',
        description: 'Failed to load available time slots',
        variant: 'destructive',
      });
      setAvailableTimeSlots([]);
    }
  }, [toast]);
  
  return {
    patients,
    doctors,
    availableTimeSlots,
    fetchTimeSlots,
    setAvailableTimeSlots,
    isLoading
  };
}
