
import { Doctor } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Stethoscope, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(`/book-appointment?doctorId=${doctor.id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
          <div className="absolute -bottom-12 left-4">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden">
              {doctor.image ? (
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-muted">
                  <Stethoscope className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-14 pb-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{doctor.name}</h3>
            <p className="text-muted-foreground text-sm mb-1">{doctor.specialty}</p>
            
            <div className="mt-3 flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" /> 
              <span>{doctor.availableDays.join(', ')}</span>
            </div>
            
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" /> 
              <span>{doctor.patientsCount} patients</span>
            </div>
          </div>
          
          <div>
            <div className="flex flex-col items-end">
              <Badge variant="outline" className="mb-1">
                {doctor.experience} years exp.
              </Badge>
              
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill={star <= doctor.rating ? "gold" : "none"}
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-yellow-400"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm ml-1">{doctor.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 pt-2 pb-2">
        <Button className="w-full gap-2" variant="default" onClick={handleBookAppointment}>
          <Plus className="h-4 w-4" /> Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}
