
export interface Patient {
  id: string;
  name: string;
  patientId: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  phone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
  lastVisit: string;
  medicalHistory: {
    condition: string;
    diagnosedDate: string;
  }[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  experience: number;
  phone: string;
  email: string;
  availableDays: string[];
  availableTime: {
    start: string;
    end: string;
  };
  rating: number;
  patientsCount: number;
  about: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'Checkup' | 'Consultation' | 'Surgery' | 'Follow-up';
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

export interface DashboardStats {
  patients: {
    total: number;
    newThisMonth: number;
    growth: number;
  };
  appointments: {
    total: number;
    completed: number;
    cancelled: number;
    growth: number;
  };
  doctors: {
    total: number;
    active: number;
    growth: number;
  };
  revenue: {
    total: string;
    growth: number;
  };
}

export interface ChartData {
  name: string;
  value: number;
}
