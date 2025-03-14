
import { Database } from '@/integrations/supabase/types';

// Type aliases for Supabase tables
export type Patient = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  gender?: string | null;
  age?: number | null;
  address?: string | null;
  status?: string;
  lastVisit?: string | null;
  medicalHistory?: Record<string, any> | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  imageUrl?: string | null;
  experience?: number | null;
  phone?: string | null;
  email?: string | null;
  availableDays?: string[] | null;
  availableTimeStart?: string | null; 
  availableTimeEnd?: string | null;
  rating?: number;
  patientsCount?: number;
  about?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status?: string;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
  // Denormalized data for UI display
  patientName?: string;
  doctorName?: string;
};

export type Billing = {
  id: string;
  patientId: string;
  appointmentId?: string | null;
  amount: number;
  status?: string;
  paymentMethod?: string | null;
  paymentDate?: string | null;
  invoiceNumber?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Inventory = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit?: string | null;
  unitPrice?: number | null;
  supplier?: string | null;
  reorderLevel?: number | null;
  expiryDate?: string | null;
  location?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UserProfile = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UserRole = {
  id: string;
  userId: string;
  role: 'admin' | 'doctor' | 'staff';
  createdAt?: string;
  updatedAt?: string;
};

// API response types
export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

// Schema validation types with Zod will go here when needed
