
import { useState } from 'react';
import { MoreHorizontal, Phone, Mail, Calendar } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import BlurCard from '../ui/BlurCard';
import { Patient } from '@/lib/api-types';
import { useToast } from '@/hooks/use-toast';

interface PatientCardProps {
  patient: Patient;
  compact?: boolean;
}

export default function PatientCard({ patient, compact = false }: PatientCardProps) {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleEditClick = () => {
    toast({
      title: "Edit Patient",
      description: `Editing details for ${patient.name}`,
    });
  };

  const handleDeleteClick = () => {
    toast({
      title: "Delete Patient",
      description: `${patient.name} has been deleted`,
      variant: "destructive",
    });
  };

  return (
    <BlurCard 
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              patient.status === 'active' ? 'bg-green-500' : 
              patient.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
            }`}></div>
          </div>
          <div>
            <h3 className="font-medium text-sm">{patient.name}</h3>
            <p className="text-xs text-muted-foreground">{patient.id.substring(0, 8)}</p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDeleteClick}
              className="text-red-500 focus:text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {!compact && (
        <>
          <div className="h-px bg-border my-3"></div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">
                Last visit: {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">{patient.phone || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">{patient.email || 'N/A'}</span>
            </div>
          </div>
          
          <div className="h-px bg-border my-3"></div>
          
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="w-full text-xs">
              View Details
            </Button>
            <Button size="sm" className="w-full text-xs">
              Book Appointment
            </Button>
          </div>
        </>
      )}
    </BlurCard>
  );
}
