
import { useState, useEffect } from 'react';
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
  
  // Fetch patients and doctors
  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('name');
        
      if (error) {
        console.error('Error fetching patients:', error);
        toast({
          title: 'Error',
          description: 'Failed to load patients',
          variant: 'destructive',
        });
        return;
      }
      
      // Transform from DB format to our Patient type
      const transformedPatients: Patient[] = data.map(patient => ({
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
              ? patient.medical_history.map(item => ({
                  condition: item.condition || '',
                  diagnosedDate: item.diagnosedDate || ''
                }))
              : []) 
          : []
      }));
      
      setPatients(transformedPatients);
    };
    
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('name');
        
      if (error) {
        console.error('Error fetching doctors:', error);
        toast({
          title: 'Error',
          description: 'Failed to load doctors',
          variant: 'destructive',
        });
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
      
      setDoctors(transformedDoctors);
    };
    
    fetchPatients();
    fetchDoctors();
  }, [toast]);
  
  // Helper function to fetch time slots when doctor and date are selected
  const fetchTimeSlots = async (doctorId: string, date: Date) => {
    if (!doctorId || !date) {
      setAvailableTimeSlots([]);
      return;
    }
    
    const formattedDate = format(date, 'yyyy-MM-dd');
    const slots = await getAvailableTimeSlots(doctorId, formattedDate);
    setAvailableTimeSlots(slots);
  };
  
  return {
    patients,
    doctors,
    availableTimeSlots,
    fetchTimeSlots,
    setAvailableTimeSlots
  };
}
