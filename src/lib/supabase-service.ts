
import { supabase } from '@/integrations/supabase/client';
import { Patient, Doctor, Appointment, Billing, Inventory, UserProfile, UserRole, ApiResponse } from './api-types';
import { toast } from '@/hooks/use-toast';

// Helper function for error handling
const handleError = (error: any, context: string): string => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`Error in ${context}:`, error);
  return errorMessage;
};

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
    return { error: handleError(error, 'fetching patients') };
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
    return { error: handleError(error, `fetching patient with ID ${id}`) };
  }
};

export const createPatient = async (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Patient>> => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: data as Patient };
  } catch (error) {
    return { error: handleError(error, 'creating patient') };
  }
};

export const updatePatient = async (id: string, patient: Partial<Patient>): Promise<ApiResponse<Patient>> => {
  try {
    // Add updated_at timestamp
    const updates = {
      ...patient,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: data as Patient };
  } catch (error) {
    return { error: handleError(error, `updating patient with ID ${id}`) };
  }
};

export const deletePatient = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { data: undefined };
  } catch (error) {
    return { error: handleError(error, `deleting patient with ID ${id}`) };
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
    return { error: handleError(error, 'fetching doctors') };
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
    return { error: handleError(error, `fetching doctor with ID ${id}`) };
  }
};

export const createDoctor = async (doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Doctor>> => {
  try {
    const { data, error } = await supabase
      .from('doctors')
      .insert([doctor])
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: data as Doctor };
  } catch (error) {
    return { error: handleError(error, 'creating doctor') };
  }
};

export const updateDoctor = async (id: string, doctor: Partial<Doctor>): Promise<ApiResponse<Doctor>> => {
  try {
    // Add updated_at timestamp
    const updates = {
      ...doctor,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('doctors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { data: data as Doctor };
  } catch (error) {
    return { error: handleError(error, `updating doctor with ID ${id}`) };
  }
};

export const deleteDoctor = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { data: undefined };
  } catch (error) {
    return { error: handleError(error, `deleting doctor with ID ${id}`) };
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
    return { error: handleError(error, 'fetching appointments') };
  }
};

export const getAppointmentById = async (id: string): Promise<ApiResponse<Appointment>> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients(name),
        doctors(name)
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    
    if (!data) {
      return { error: 'Appointment not found' };
    }
    
    // Transform the response
    const transformedData = {
      id: data.id,
      patientId: data.patient_id,
      doctorId: data.doctor_id,
      date: data.date,
      time: data.time,
      type: data.type,
      status: data.status,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      patientName: data.patients?.name,
      doctorName: data.doctors?.name
    };
    
    return { data: transformedData as Appointment };
  } catch (error) {
    return { error: handleError(error, `fetching appointment with ID ${id}`) };
  }
};

export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'patientName' | 'doctorName' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Appointment>> => {
  try {
    // Prepare data for Supabase (convert from camelCase to snake_case)
    const appointmentData = {
      patient_id: appointment.patientId,
      doctor_id: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status || 'scheduled',
      notes: appointment.notes
    };
    
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select(`
        *,
        patients(name),
        doctors(name)
      `)
      .single();
    
    if (error) throw error;
    
    // Transform the response
    const transformedData = {
      id: data.id,
      patientId: data.patient_id,
      doctorId: data.doctor_id,
      date: data.date,
      time: data.time,
      type: data.type,
      status: data.status,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      patientName: data.patients?.name,
      doctorName: data.doctors?.name
    };
    
    return { data: transformedData as Appointment };
  } catch (error) {
    return { error: handleError(error, 'creating appointment') };
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
    return { error: handleError(error, `updating appointment status`) };
  }
};

export const updateAppointment = async (id: string, appointment: Partial<Appointment>): Promise<ApiResponse<Appointment>> => {
  try {
    // Convert from camelCase to snake_case and add updated_at
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString()
    };
    
    if (appointment.patientId !== undefined) updates.patient_id = appointment.patientId;
    if (appointment.doctorId !== undefined) updates.doctor_id = appointment.doctorId;
    if (appointment.date !== undefined) updates.date = appointment.date;
    if (appointment.time !== undefined) updates.time = appointment.time;
    if (appointment.type !== undefined) updates.type = appointment.type;
    if (appointment.status !== undefined) updates.status = appointment.status;
    if (appointment.notes !== undefined) updates.notes = appointment.notes;
    
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        patients(name),
        doctors(name)
      `)
      .single();
    
    if (error) throw error;
    
    // Transform the response
    const transformedData = {
      id: data.id,
      patientId: data.patient_id,
      doctorId: data.doctor_id,
      date: data.date,
      time: data.time,
      type: data.type,
      status: data.status,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      patientName: data.patients?.name,
      doctorName: data.doctors?.name
    };
    
    return { data: transformedData as Appointment };
  } catch (error) {
    return { error: handleError(error, `updating appointment with ID ${id}`) };
  }
};

export const deleteAppointment = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { data: undefined };
  } catch (error) {
    return { error: handleError(error, `deleting appointment with ID ${id}`) };
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
    return { error: handleError(error, 'fetching user profile') };
  }
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');
    
    // Transform from camelCase to snake_case
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString()
    };
    
    if (profile.firstName !== undefined) updates.first_name = profile.firstName;
    if (profile.lastName !== undefined) updates.last_name = profile.lastName;
    if (profile.avatarUrl !== undefined) updates.avatar_url = profile.avatarUrl;
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Transform from snake_case to camelCase
    const updatedProfile = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      avatarUrl: data.avatar_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
    
    return { data: updatedProfile as UserProfile };
  } catch (error) {
    return { error: handleError(error, 'updating user profile') };
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
    return { error: handleError(error, 'fetching user roles') };
  }
};

// BILLING
export const getBillingRecords = async (): Promise<ApiResponse<Billing[]>> => {
  try {
    const { data, error } = await supabase
      .from('billing')
      .select(`
        *,
        patients(name),
        appointments(date, time)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Transform the response
    const transformedData = data.map(item => ({
      id: item.id,
      patientId: item.patient_id,
      appointmentId: item.appointment_id,
      amount: item.amount,
      status: item.status,
      paymentMethod: item.payment_method,
      paymentDate: item.payment_date,
      invoiceNumber: item.invoice_number,
      description: item.description,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      // Additional fields from joins
      patientName: item.patients?.name,
      appointmentDate: item.appointments?.date,
      appointmentTime: item.appointments?.time
    }));
    
    return { data: transformedData as any[] };
  } catch (error) {
    return { error: handleError(error, 'fetching billing records') };
  }
};

export const createBillingRecord = async (billing: Omit<Billing, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Billing>> => {
  try {
    // Convert from camelCase to snake_case
    const billingData = {
      patient_id: billing.patientId,
      appointment_id: billing.appointmentId,
      amount: billing.amount,
      status: billing.status || 'pending',
      payment_method: billing.paymentMethod,
      payment_date: billing.paymentDate,
      invoice_number: billing.invoiceNumber,
      description: billing.description
    };
    
    const { data, error } = await supabase
      .from('billing')
      .insert([billingData])
      .select()
      .single();
    
    if (error) throw error;
    
    // Transform from snake_case to camelCase
    const transformedData = {
      id: data.id,
      patientId: data.patient_id,
      appointmentId: data.appointment_id,
      amount: data.amount,
      status: data.status,
      paymentMethod: data.payment_method,
      paymentDate: data.payment_date,
      invoiceNumber: data.invoice_number,
      description: data.description,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
    
    return { data: transformedData as Billing };
  } catch (error) {
    return { error: handleError(error, 'creating billing record') };
  }
};

// INVENTORY
export const getInventoryItems = async (): Promise<ApiResponse<Inventory[]>> => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    // Transform from snake_case to camelCase
    const transformedData = data.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unit_price,
      supplier: item.supplier,
      reorderLevel: item.reorder_level,
      expiryDate: item.expiry_date,
      location: item.location,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
    
    return { data: transformedData as Inventory[] };
  } catch (error) {
    return { error: handleError(error, 'fetching inventory items') };
  }
};

export const createInventoryItem = async (item: Omit<Inventory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Inventory>> => {
  try {
    // Convert from camelCase to snake_case
    const itemData = {
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      unit_price: item.unitPrice,
      supplier: item.supplier,
      reorder_level: item.reorderLevel,
      expiry_date: item.expiryDate,
      location: item.location
    };
    
    const { data, error } = await supabase
      .from('inventory')
      .insert([itemData])
      .select()
      .single();
    
    if (error) throw error;
    
    // Transform from snake_case to camelCase
    const transformedData = {
      id: data.id,
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      unit: data.unit,
      unitPrice: data.unit_price,
      supplier: data.supplier,
      reorderLevel: data.reorder_level,
      expiryDate: data.expiry_date,
      location: data.location,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
    
    return { data: transformedData as Inventory };
  } catch (error) {
    return { error: handleError(error, 'creating inventory item') };
  }
};

export const updateInventoryItem = async (id: string, item: Partial<Inventory>): Promise<ApiResponse<Inventory>> => {
  try {
    // Convert from camelCase to snake_case and add updated_at
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString()
    };
    
    if (item.name !== undefined) updates.name = item.name;
    if (item.category !== undefined) updates.category = item.category;
    if (item.quantity !== undefined) updates.quantity = item.quantity;
    if (item.unit !== undefined) updates.unit = item.unit;
    if (item.unitPrice !== undefined) updates.unit_price = item.unitPrice;
    if (item.supplier !== undefined) updates.supplier = item.supplier;
    if (item.reorderLevel !== undefined) updates.reorder_level = item.reorderLevel;
    if (item.expiryDate !== undefined) updates.expiry_date = item.expiryDate;
    if (item.location !== undefined) updates.location = item.location;
    
    const { data, error } = await supabase
      .from('inventory')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Transform from snake_case to camelCase
    const transformedData = {
      id: data.id,
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      unit: data.unit,
      unitPrice: data.unit_price,
      supplier: data.supplier,
      reorderLevel: data.reorder_level,
      expiryDate: data.expiry_date,
      location: data.location,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
    
    return { data: transformedData as Inventory };
  } catch (error) {
    return { error: handleError(error, `updating inventory item with ID ${id}`) };
  }
};

export const deleteInventoryItem = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const { error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { data: undefined };
  } catch (error) {
    return { error: handleError(error, `deleting inventory item with ID ${id}`) };
  }
};
