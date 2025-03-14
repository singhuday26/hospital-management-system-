
import { supabase } from '@/integrations/supabase/client';
import { Patient, Doctor, Appointment, Billing, Inventory, UserProfile, UserRole, ApiResponse } from './api-types';

// PATIENTS
export const getPatients = async (): Promise<ApiResponse<Patient[]>> => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return { data: data as Patient[] };
  } catch (error) {
    console.error('Error fetching patients:', error);
    return { error: (error as Error).message };
  }
};

export const getPatientById = async (id: string): Promise<ApiResponse<Patient>> => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    
    return { data: data as Patient };
  } catch (error) {
    console.error(`Error fetching patient with ID ${id}:`, error);
    return { error: (error as Error).message };
  }
};

// DOCTORS
export const getDoctors = async (): Promise<ApiResponse<Doctor[]>> => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return { data: data as Doctor[] };
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return { error: (error as Error).message };
  }
};

export const getDoctorById = async (id: string): Promise<ApiResponse<Doctor>> => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    
    return { data: data as Doctor };
  } catch (error) {
    console.error(`Error fetching doctor with ID ${id}:`, error);
    return { error: (error as Error).message };
  }
};

// APPOINTMENTS
export const getAppointments = async (): Promise<ApiResponse<Appointment[]>> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients(name),
        doctors(name)
      `)
      .order('date')
      .order('time');
    
    if (error) throw error;
    
    // Transform the response to match our Appointment type
    const transformedData = data.map(item => ({
      id: item.id,
      patientId: item.patient_id,
      doctorId: item.doctor_id,
      date: item.date,
      time: item.time,
      type: item.type,
      status: item.status,
      notes: item.notes,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      patientName: item.patients?.name,
      doctorName: item.doctors?.name
    }));
    
    return { data: transformedData as Appointment[] };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { error: (error as Error).message };
  }
};

export const updateAppointmentStatus = async (
  id: string, 
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
): Promise<ApiResponse<void>> => {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    
    if (error) throw error;
    
    return { data: undefined };
  } catch (error) {
    console.error(`Error updating appointment status:`, error);
    return { error: (error as Error).message };
  }
};

// AUTH & PROFILES
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

export const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (error) throw error;
    
    // Transform from snake_case to camelCase
    const profile = data ? {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      avatarUrl: data.avatar_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    } : null;
    
    return { data: profile as UserProfile };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { error: (error as Error).message };
  }
};

export const getUserRoles = async (): Promise<ApiResponse<string[]>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    const roles = data.map(r => r.role);
    
    return { data: roles };
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return { error: (error as Error).message };
  }
};
