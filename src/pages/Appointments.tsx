
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarPlus, 
  Search, 
  Calendar, 
  Filter, 
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { appointments } from '@/lib/data';
import AppointmentCard from '@/components/dashboard/AppointmentCard';
import FadeIn from '@/components/animations/FadeIn';

export default function Appointments() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  
  // Group appointments by status
  const todayDate = new Date().toISOString().split('T')[0];
  const upcomingAppointments = appointments.filter(
    app => app.status !== 'completed' && app.status !== 'cancelled' && app.date >= todayDate
  );
  const completedAppointments = appointments.filter(app => app.status === 'completed');
  const cancelledAppointments = appointments.filter(app => app.status === 'cancelled');
  
  // Filter appointments based on search query and type filter
  const filterAppointments = (appts: typeof appointments) => {
    return appts.filter(appointment => {
      const matchesSearch = 
        appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesType = typeFilter.length === 0 || typeFilter.includes(appointment.type);
      
      return matchesSearch && matchesType;
    });
  };
  
  const filteredUpcoming = filterAppointments(upcomingAppointments);
  const filteredCompleted = filterAppointments(completedAppointments);
  const filteredCancelled = filterAppointments(cancelledAppointments);
  
  const handleNewAppointment = () => {
    navigate('/book-appointment');
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <FadeIn>
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="mr-2 p-0 h-8 w-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-muted-foreground mt-1">Schedule and manage patient appointments</p>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={100}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search appointments..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              View Calendar
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2 font-medium text-sm">Appointment Type</div>
                <DropdownMenuCheckboxItem
                  checked={typeFilter.includes('Checkup')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTypeFilter([...typeFilter, 'Checkup']);
                    } else {
                      setTypeFilter(typeFilter.filter(t => t !== 'Checkup'));
                    }
                  }}
                >
                  Checkup
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={typeFilter.includes('Consultation')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTypeFilter([...typeFilter, 'Consultation']);
                    } else {
                      setTypeFilter(typeFilter.filter(t => t !== 'Consultation'));
                    }
                  }}
                >
                  Consultation
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={typeFilter.includes('Surgery')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTypeFilter([...typeFilter, 'Surgery']);
                    } else {
                      setTypeFilter(typeFilter.filter(t => t !== 'Surgery'));
                    }
                  }}
                >
                  Surgery
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={typeFilter.includes('Follow-up')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTypeFilter([...typeFilter, 'Follow-up']);
                    } else {
                      setTypeFilter(typeFilter.filter(t => t !== 'Follow-up'));
                    }
                  }}
                >
                  Follow-up
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="gap-2" onClick={handleNewAppointment}>
              <CalendarPlus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={200}>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUpcoming.length === 0 ? (
                <div className="col-span-full flex justify-center py-8">
                  <p className="text-muted-foreground">No upcoming appointments found</p>
                </div>
              ) : (
                filteredUpcoming.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompleted.length === 0 ? (
                <div className="col-span-full flex justify-center py-8">
                  <p className="text-muted-foreground">No completed appointments found</p>
                </div>
              ) : (
                filteredCompleted.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCancelled.length === 0 ? (
                <div className="col-span-full flex justify-center py-8">
                  <p className="text-muted-foreground">No cancelled appointments found</p>
                </div>
              ) : (
                filteredCancelled.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}
