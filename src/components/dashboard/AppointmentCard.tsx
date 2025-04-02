
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  User, 
  Stethoscope, 
  MoreVertical,
  FileText
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlurCard from '@/components/ui/BlurCard';
import { formatDate, formatTime } from '@/lib/utils';
import { Appointment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { updateAppointmentStatus } from '@/lib/supabase-service';

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Format appointment date and time
  const displayDate = formatDate(new Date(appointment.date));
  const displayTime = appointment.time.substring(0, 5); // Format as HH:MM
  
  // Map status to badge colors
  const getStatusColor = () => {
    switch (appointment.status) {
      case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  // Handle appointment actions
  const handleStatusChange = async (status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed') => {
    try {
      const result = await updateAppointmentStatus(appointment.id, status);
      
      if (!result.error) {
        toast({
          title: "Status Updated",
          description: `Appointment is now ${status}`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: "Action Failed",
        description: error.message || "Could not update appointment status",
        variant: "destructive",
      });
    }
  };
  
  const handleReschedule = useCallback(() => {
    navigate(`/book-appointment?patientId=${appointment.patientId}&doctorId=${appointment.doctorId}`);
  }, [navigate, appointment]);

  return (
    <BlurCard>
      <div className="space-y-4">
        {/* Header with status badge and menu */}
        <div className="flex justify-between items-center">
          <Badge className={`${getStatusColor()}`}>
            {appointment.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : 'Scheduled'}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {appointment.status !== 'confirmed' && (
                <DropdownMenuItem onClick={() => handleStatusChange('confirmed')}>Confirm</DropdownMenuItem>
              )}
              {appointment.status !== 'completed' && (
                <DropdownMenuItem onClick={() => handleStatusChange('completed')}>Mark as Completed</DropdownMenuItem>
              )}
              {appointment.status !== 'cancelled' && (
                <DropdownMenuItem onClick={() => handleStatusChange('cancelled')} className="text-red-500 focus:text-red-500">
                  Cancel
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleReschedule}>Reschedule</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Date and time */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{displayDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{displayTime}</span>
          </div>
        </div>
        
        {/* Type */}
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{appointment.type}</span>
        </div>
        
        {/* Separator */}
        <div className="h-px bg-border"></div>
        
        {/* Patient and doctor */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{appointment.patientName}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{appointment.doctorName}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toast({
              title: "View Details",
              description: `Viewing details for appointment on ${displayDate}`,
            })}
            className="w-full"
          >
            View Details
          </Button>
        </div>
      </div>
    </BlurCard>
  );
}
