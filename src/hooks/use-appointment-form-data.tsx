
import { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Patient, Doctor } from '@/lib/types';
import { getAvailableTimeSlots } from '@/lib/appointment-service';

// Global cache to avoid redundant API calls across component instances
const globalCache = {
  patients: {
    data: null as Patient[] | null,
    timestamp: 0,
    expiryTime: 60000 // 1 minute
  },
  doctors: {
    data: null as Doctor[] | null,
    timestamp: 0,
    expiryTime: 60000 // 1 minute
  }
};

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
  
  // Fetch patients with caching
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoadingPatients(true);
      
      // Check cache first
      const now = Date.now();
      if (globalCache.patients.data && 
          (now - globalCache.patients.timestamp < globalCache.patients.expiryTime)) {
        console.log('Using cached patients data');
        setPatients(globalCache.patients.data);
        setIsLoadingPatients(false);
        return;
      }
      
      try {
        console.log('Fetching patients from API');
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          console.log('No patients found in database');
          setPatients([]);
          setIsLoadingPatients(false);
          return;
        }
        
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
        
        // Update cache
        globalCache.patients.data = transformedPatients;
        globalCache.patients.timestamp = now;
        
        setPatients(transformedPatients);
        console.log(`Loaded ${transformedPatients.length} patients`);
      } catch (error) {
        console.error('Error fetching patients:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load patients',
          variant: 'destructive',
        });
        setPatients([]);
      } finally {
        setIsLoadingPatients(false);
      }
    };
    
    fetchPatients();
  }, [toast]);
  
  // Fetch doctors with caching
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoadingDoctors(true);
      
      // Check cache first
      const now = Date.now();
      if (globalCache.doctors.data && 
          (now - globalCache.doctors.timestamp < globalCache.doctors.expiryTime)) {
        console.log('Using cached doctors data');
        setDoctors(globalCache.doctors.data);
        setIsLoadingDoctors(false);
        return;
      }
      
      try {
        console.log('Fetching doctors from API');
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        if (!data || data.length === 0) {
          console.log('No doctors found in database');
          setDoctors([]);
          setIsLoadingDoctors(false);
          return;
        }
        
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
        
        // Update cache
        globalCache.doctors.data = transformedDoctors;
        globalCache.doctors.timestamp = now;
        
        setDoctors(transformedDoctors);
        console.log(`Loaded ${transformedDoctors.length} doctors`);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load doctors',
          variant: 'destructive',
        });
        setDoctors([]);
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
