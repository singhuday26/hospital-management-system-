
import { CalendarDays, Clock, User, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BlurCard from '../ui/BlurCard';
import { cn } from '@/lib/utils';
import { Appointment } from '@/lib/api-types';
import { useToast } from '@/hooks/use-toast';
import { updateAppointmentStatus } from '@/lib/supabase-service';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusChange?: () => void;
}

export default function AppointmentCard({ appointment, onStatusChange }: AppointmentCardProps) {
  const { toast } = useToast();
  
  const handleStatusChange = async (status: 'confirmed' | 'cancelled' | 'completed') => {
    try {
      const { error } = await updateAppointmentStatus(appointment.id, status);
      
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: `Appointment ${status}`,
        description: `The appointment has been ${status}`,
      });
      
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const statusStyles = {
    scheduled: "bg-blue-50 text-blue-600 border-blue-200",
    confirmed: "bg-green-50 text-green-600 border-green-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
    completed: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <BlurCard className="h-full">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-start">
          <div className={cn(
            "p-2 rounded-md",
            appointment.type === 'Checkup' ? 'bg-blue-50 text-blue-500' :
            appointment.type === 'Surgery' ? 'bg-purple-50 text-purple-500' :
            appointment.type === 'Consultation' ? 'bg-green-50 text-green-500' :
            'bg-gray-50 text-gray-500'
          )}>
            <CalendarDays className="h-5 w-5" />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{appointment.type}</h3>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full border", 
                statusStyles[appointment.status as keyof typeof statusStyles]
              )}>
                {appointment.status}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{appointment.patientName}</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{appointment.time}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStatusChange('confirmed')}>
              Confirm
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleStatusChange('cancelled')}
              className="text-red-500 focus:text-red-500"
            >
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
        <div className="text-xs">
          <span className="text-muted-foreground">Doctor: </span>
          <span className="font-medium">{appointment.doctorName}</span>
        </div>
        
        <Button variant="outline" size="sm" className="text-xs">
          View Details
        </Button>
      </div>
    </BlurCard>
  );
}
