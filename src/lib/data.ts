
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
    name: 'Rajesh Kumar',
    patientId: 'PT-0001',
    gender: 'male',
    age: 45,
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@example.com',
    address: '123 Lajpat Nagar, New Delhi, Delhi',
    status: 'active',
    lastVisit: '2023-09-15',
    medicalHistory: [
      { condition: 'Hypertension', diagnosedDate: '2020-03-10' },
      { condition: 'Diabetes Type 2', diagnosedDate: '2021-06-15' }
    ]
  },
  {
    id: '2',
    name: 'Priya Sharma',
    patientId: 'PT-0002',
    gender: 'female',
    age: 32,
    phone: '+91 87654 32109',
    email: 'priya.sharma@example.com',
    address: '456 Bandra West, Mumbai, Maharashtra',
    status: 'active',
    lastVisit: '2023-10-25',
    medicalHistory: [
      { condition: 'Asthma', diagnosedDate: '2015-02-22' }
    ]
  },
  {
    id: '3',
    name: 'Mohan Singh',
    patientId: 'PT-0003',
    gender: 'male',
    age: 58,
    phone: '+91 76543 21098',
    email: 'mohan.singh@example.com',
    address: '789 Jayanagar, Bengaluru, Karnataka',
    status: 'inactive',
    lastVisit: '2023-02-10',
    medicalHistory: [
      { condition: 'Arthritis', diagnosedDate: '2018-07-11' },
      { condition: 'Coronary Heart Disease', diagnosedDate: '2019-04-30' }
    ]
  },
  {
    id: '4',
    name: 'Ananya Patel',
    patientId: 'PT-0004',
    gender: 'female',
    age: 27,
    phone: '+91 65432 10987',
    email: 'ananya.patel@example.com',
    address: '101 Navrangpura, Ahmedabad, Gujarat',
    status: 'pending',
    lastVisit: '2023-11-04',
    medicalHistory: []
  },
  {
    id: '5',
    name: 'Vikram Mehta',
    patientId: 'PT-0005',
    gender: 'male',
    age: 41,
    phone: '+91 54321 09876',
    email: 'vikram.mehta@example.com',
    address: '222 Velachery, Chennai, Tamil Nadu',
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
    name: 'Dr. Arjun Reddy',
    specialty: 'Cardiology',
    experience: 12,
    phone: '+91 98765 12345',
    email: 'arjun.reddy@example.com',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableTime: { start: '09:00', end: '17:00' },
    rating: 4.8,
    patientsCount: 125,
    about: 'Dr. Reddy is a board-certified cardiologist with over 12 years of experience in diagnosing and treating cardiovascular conditions at AIIMS Delhi.'
  },
  {
    id: '2',
    name: 'Dr. Meera Agarwal',
    specialty: 'Neurology',
    experience: 15,
    phone: '+91 87654 23456',
    email: 'meera.agarwal@example.com',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTime: { start: '10:00', end: '18:00' },
    rating: 4.9,
    patientsCount: 98,
    about: 'Dr. Agarwal specializes in neurological disorders and has published several research papers on progressive neurological conditions while working at Fortis Hospital.'
  },
  {
    id: '3',
    name: 'Dr. Kavita Desai',
    specialty: 'Pediatrics',
    experience: 8,
    phone: '+91 76543 34567',
    email: 'kavita.desai@example.com',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    availableTime: { start: '08:00', end: '16:00' },
    rating: 4.7,
    patientsCount: 210,
    about: 'Dr. Desai is dedicated to the health and wellbeing of children from infancy through adolescence, with a special interest in developmental pediatrics at Rainbow Children\'s Hospital.'
  },
  {
    id: '4',
    name: 'Dr. Rajan Verma',
    specialty: 'Orthopedics',
    experience: 20,
    phone: '+91 65432 45678',
    email: 'rajan.verma@example.com',
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    availableTime: { start: '09:00', end: '15:00' },
    rating: 4.6,
    patientsCount: 175,
    about: 'Dr. Verma is an experienced orthopedic surgeon specializing in sports medicine and joint replacement procedures at Apollo Hospitals.'
  }
];

// Mock Appointments Data
export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Rajesh Kumar',
    doctorId: '1',
    doctorName: 'Dr. Arjun Reddy',
    date: '2023-11-15',
    time: '10:00 AM',
    type: 'Checkup',
    status: 'confirmed',
    notes: 'Regular follow-up for hypertension and diabetes.'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Priya Sharma',
    doctorId: '3',
    doctorName: 'Dr. Kavita Desai',
    date: '2023-11-16',
    time: '2:30 PM',
    type: 'Consultation',
    status: 'scheduled'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Mohan Singh',
    doctorId: '4',
    doctorName: 'Dr. Rajan Verma',
    date: '2023-11-17',
    time: '9:15 AM',
    type: 'Surgery',
    status: 'confirmed',
    notes: 'Knee arthroscopy procedure. Patient should fast for 12 hours before surgery.'
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Ananya Patel',
    doctorId: '2',
    doctorName: 'Dr. Meera Agarwal',
    date: '2023-11-18',
    time: '11:45 AM',
    type: 'Consultation',
    status: 'scheduled'
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'Vikram Mehta',
    doctorId: '1',
    doctorName: 'Dr. Arjun Reddy',
    date: '2023-11-15',
    time: '3:00 PM',
    type: 'Checkup',
    status: 'confirmed'
  },
  {
    id: '6',
    patientId: '1',
    patientName: 'Rajesh Kumar',
    doctorId: '2',
    doctorName: 'Dr. Meera Agarwal',
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
    total: '₹12,84,500',
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
  { name: 'Ayurveda', value: 15450 }
];
