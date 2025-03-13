
import { 
  Patient, 
  Doctor, 
  Appointment, 
  DashboardStats, 
  ChartData 
} from './types';

// Mock Patients Data
export const patients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    patientId: 'PT-0001',
    gender: 'male',
    age: 45,
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    status: 'active',
    lastVisit: '2023-09-15',
    medicalHistory: [
      { condition: 'Hypertension', diagnosedDate: '2020-03-10' },
      { condition: 'Diabetes Type 2', diagnosedDate: '2021-06-15' }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    patientId: 'PT-0002',
    gender: 'female',
    age: 32,
    phone: '+1 (555) 987-6543',
    email: 'jane.smith@example.com',
    address: '456 Elm St, Othertown, USA',
    status: 'active',
    lastVisit: '2023-10-25',
    medicalHistory: [
      { condition: 'Asthma', diagnosedDate: '2015-02-22' }
    ]
  },
  {
    id: '3',
    name: 'Michael Johnson',
    patientId: 'PT-0003',
    gender: 'male',
    age: 58,
    phone: '+1 (555) 222-3333',
    email: 'michael.j@example.com',
    address: '789 Oak Ave, Somewhere, USA',
    status: 'inactive',
    lastVisit: '2023-02-10',
    medicalHistory: [
      { condition: 'Arthritis', diagnosedDate: '2018-07-11' },
      { condition: 'Coronary Heart Disease', diagnosedDate: '2019-04-30' }
    ]
  },
  {
    id: '4',
    name: 'Emily Wilson',
    patientId: 'PT-0004',
    gender: 'female',
    age: 27,
    phone: '+1 (555) 444-5555',
    email: 'emily.wilson@example.com',
    address: '101 Pine Rd, Elsewhere, USA',
    status: 'pending',
    lastVisit: '2023-11-04',
    medicalHistory: []
  },
  {
    id: '5',
    name: 'Robert Garcia',
    patientId: 'PT-0005',
    gender: 'male',
    age: 41,
    phone: '+1 (555) 777-8888',
    email: 'robert.g@example.com',
    address: '222 Cedar Ln, Nowhere, USA',
    status: 'active',
    lastVisit: '2023-10-15',
    medicalHistory: [
      { condition: 'Migraine', diagnosedDate: '2022-01-17' }
    ]
  }
];

// Mock Doctors Data
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: 12,
    phone: '+1 (555) 111-2222',
    email: 'sarah.johnson@example.com',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableTime: { start: '09:00', end: '17:00' },
    rating: 4.8,
    patientsCount: 125,
    about: 'Dr. Johnson is a board-certified cardiologist with over 12 years of experience in diagnosing and treating cardiovascular conditions.'
  },
  {
    id: '2',
    name: 'Dr. Mark Wilson',
    specialty: 'Neurology',
    experience: 15,
    phone: '+1 (555) 333-4444',
    email: 'mark.wilson@example.com',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTime: { start: '10:00', end: '18:00' },
    rating: 4.9,
    patientsCount: 98,
    about: 'Dr. Wilson specializes in neurological disorders and has published several research papers on progressive neurological conditions.'
  },
  {
    id: '3',
    name: 'Dr. Lisa Chen',
    specialty: 'Pediatrics',
    experience: 8,
    phone: '+1 (555) 555-6666',
    email: 'lisa.chen@example.com',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    availableTime: { start: '08:00', end: '16:00' },
    rating: 4.7,
    patientsCount: 210,
    about: 'Dr. Chen is dedicated to the health and wellbeing of children from infancy through adolescence, with a special interest in developmental pediatrics.'
  },
  {
    id: '4',
    name: 'Dr. James Miller',
    specialty: 'Orthopedics',
    experience: 20,
    phone: '+1 (555) 777-9999',
    email: 'james.miller@example.com',
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    availableTime: { start: '09:00', end: '15:00' },
    rating: 4.6,
    patientsCount: 175,
    about: 'Dr. Miller is an experienced orthopedic surgeon specializing in sports medicine and joint replacement procedures.'
  }
];

// Mock Appointments Data
export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    date: '2023-11-15',
    time: '10:00 AM',
    type: 'Checkup',
    status: 'confirmed',
    notes: 'Regular follow-up for hypertension and diabetes.'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Jane Smith',
    doctorId: '3',
    doctorName: 'Dr. Lisa Chen',
    date: '2023-11-16',
    time: '2:30 PM',
    type: 'Consultation',
    status: 'scheduled'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Michael Johnson',
    doctorId: '4',
    doctorName: 'Dr. James Miller',
    date: '2023-11-17',
    time: '9:15 AM',
    type: 'Surgery',
    status: 'confirmed',
    notes: 'Knee arthroscopy procedure. Patient should fast for 12 hours before surgery.'
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Emily Wilson',
    doctorId: '2',
    doctorName: 'Dr. Mark Wilson',
    date: '2023-11-18',
    time: '11:45 AM',
    type: 'Consultation',
    status: 'scheduled'
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'Robert Garcia',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    date: '2023-11-15',
    time: '3:00 PM',
    type: 'Checkup',
    status: 'confirmed'
  },
  {
    id: '6',
    patientId: '1',
    patientName: 'John Doe',
    doctorId: '2',
    doctorName: 'Dr. Mark Wilson',
    date: '2023-10-25',
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'completed'
  }
];

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  patients: {
    total: 543,
    newThisMonth: 48,
    growth: 12.5
  },
  appointments: {
    total: 289,
    completed: 187,
    cancelled: 24,
    growth: 8.7
  },
  doctors: {
    total: 32,
    active: 28,
    growth: 4.2
  },
  revenue: {
    total: '$128,450',
    growth: 15.3
  }
};

// Chart Data for Dashboard
export const patientsByMonth: ChartData[] = [
  { name: 'Jan', value: 32 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 38 },
  { name: 'May', value: 42 },
  { name: 'Jun', value: 48 },
  { name: 'Jul', value: 55 },
  { name: 'Aug', value: 60 },
  { name: 'Sep', value: 58 },
  { name: 'Oct', value: 65 },
  { name: 'Nov', value: 48 },
  { name: 'Dec', value: 52 }
];

export const appointmentsByType: ChartData[] = [
  { name: 'Checkup', value: 45 },
  { name: 'Consultation', value: 30 },
  { name: 'Surgery', value: 15 },
  { name: 'Follow-up', value: 10 }
];

export const revenueByDepartment: ChartData[] = [
  { name: 'Cardiology', value: 35000 },
  { name: 'Neurology', value: 28000 },
  { name: 'Orthopedics', value: 32000 },
  { name: 'Pediatrics', value: 18000 },
  { name: 'Oncology', value: 15450 }
];
