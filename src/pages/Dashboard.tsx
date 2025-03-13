
import { 
  Users, 
  CalendarDays, 
  UserCheck, 
  DollarSign,
  TrendingUp,
  Activity,
  BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  PieChart, 
  Pie,
  Cell,
  Legend
} from 'recharts';
import StatsCard from '@/components/dashboard/StatsCard';
import PatientCard from '@/components/dashboard/PatientCard';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import FadeIn from '@/components/animations/FadeIn';
import { 
  dashboardStats, 
  patients, 
  appointments, 
  patientsByMonth,
  appointmentsByType 
} from '@/lib/data';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pt-24">
      <FadeIn>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of the hospital management system</p>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FadeIn delay={100}>
          <StatsCard
            title="Total Patients"
            value={dashboardStats.patients.total}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: dashboardStats.patients.growth, isPositive: true }}
          />
        </FadeIn>
        
        <FadeIn delay={200}>
          <StatsCard
            title="Appointments"
            value={dashboardStats.appointments.total}
            icon={<CalendarDays className="h-5 w-5" />}
            trend={{ value: dashboardStats.appointments.growth, isPositive: true }}
          />
        </FadeIn>
        
        <FadeIn delay={300}>
          <StatsCard
            title="Doctors"
            value={dashboardStats.doctors.total}
            icon={<UserCheck className="h-5 w-5" />}
            trend={{ value: dashboardStats.doctors.growth, isPositive: true }}
          />
        </FadeIn>
        
        <FadeIn delay={400}>
          <StatsCard
            title="Revenue"
            value={dashboardStats.revenue.total}
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: dashboardStats.revenue.growth, isPositive: true }}
          />
        </FadeIn>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FadeIn className="lg:col-span-2" delay={150}>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Patient Statistics</h2>
                <p className="text-sm text-muted-foreground">Monthly new patients</p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
                  <span className="text-muted-foreground">New Patients</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+12.5%</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={patientsByMonth}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }} 
                    width={30}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{ 
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="rgba(37, 99, 235, 0.8)" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeIn>
        
        <FadeIn delay={250}>
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Appointment Types</h2>
              <p className="text-sm text-muted-foreground">Distribution by category</p>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {appointmentsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    formatter={(value) => [`${value} appointments`, 'Count']}
                    contentStyle={{ 
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </FadeIn>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FadeIn delay={300}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Patients</h2>
              <a href="/patients" className="text-sm text-primary hover:underline">View all</a>
            </div>
            <div className="space-y-4">
              {patients.slice(0, 3).map(patient => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </div>
        </FadeIn>
        
        <FadeIn className="lg:col-span-2" delay={350}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
              <a href="/appointments" className="text-sm text-primary hover:underline">View all</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments
                .filter(apt => apt.status !== 'completed')
                .slice(0, 4)
                .map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
