
import { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Patient, Doctor } from '@/lib/types';
import { getAvailableTimeSlots } from '@/lib/appointment-service';

export function useAppointmentFormData() {
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(true);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);
  
  // Computed property for overall loading state
  const isLoading = useMemo(() => 
    isLoadingPatients || isLoadingDoctors, 
    [isLoadingPatients, isLoadingDoctors]
  );
  
  // Fetch patients - separated for better error handling
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoadingPatients(true);
      try {
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        // Transform from DB format to our Patient type
        const transformedPatients: Patient[] = data.map(patient => ({
          id: patient.id,
          name: patient.name,
          patientId: patient.id,
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
                    condition: (item as any)?.condition || '',
                    diagnosedDate: (item as any)?.diagnosedDate || ''
                  }))
                : []) 
            : []
        }));
        
        setPatients(transformedPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load patients',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingPatients(false);
      }
    };
    
    fetchPatients();
  }, [toast]);
  
  // Fetch doctors - separated for better error handling
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoadingDoctors(true);
      try {
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        // Transform from DB format to our Doctor type
        const transformedDoctors: Doctor[] = data.map(doctor => ({
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
        
        setDoctors(transformedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load doctors',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingDoctors(false);
      }
    };
    
    fetchDoctors();
  }, [toast]);
  
  // Helper function to fetch time slots when doctor and date are selected
  const fetchTimeSlots = useCallback(async (doctorId: string, date: Date) => {
    if (!doctorId || !date) {
      setAvailableTimeSlots([]);
      return;
    }
    
    setIsLoadingTimeSlots(true);
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
    } finally {
      setIsLoadingTimeSlots(false);
    }
  }, [toast]);
  
  return {
    patients,
    doctors,
    availableTimeSlots,
    fetchTimeSlots,
    setAvailableTimeSlots,
    isLoading,
    isLoadingPatients,
    isLoadingDoctors,
    isLoadingTimeSlots
  };
}
