
import { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ChevronDown, 
  Star, 
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { doctors } from '@/lib/data';
import FadeIn from '@/components/animations/FadeIn';

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string[]>([]);
  
  // Get all unique specialties
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  
  // Filter doctors based on search query and specialty filter
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesSpecialty = specialtyFilter.length === 0 || specialtyFilter.includes(doctor.specialty);
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <FadeIn>
        <h1 className="text-3xl font-bold">Doctors</h1>
        <p className="text-muted-foreground mt-1">Manage doctor profiles and specialties</p>
      </FadeIn>
      
      <FadeIn delay={100}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search doctors..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Specialty
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {specialties.map(specialty => (
                  <DropdownMenuCheckboxItem
                    key={specialty}
                    checked={specialtyFilter.includes(specialty)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSpecialtyFilter([...specialtyFilter, specialty]);
                      } else {
                        setSpecialtyFilter(specialtyFilter.filter(s => s !== specialty));
                      }
                    }}
                  >
                    {specialty}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Doctor
            </Button>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full flex justify-center py-8">
              <p className="text-muted-foreground">No doctors found</p>
            </div>
          ) : (
            filteredDoctors.map(doctor => (
              <Card key={doctor.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold text-primary">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <Badge variant="outline" className="mt-1">{doctor.specialty}</Badge>
                  
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm">{doctor.rating}</span>
                    <span className="mx-1 text-muted-foreground text-sm">•</span>
                    <span className="text-sm text-muted-foreground">{doctor.experience} years exp.</span>
                  </div>
                </div>
                
                <CardContent className="px-6 pb-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{doctor.email}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Available Days</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {doctor.availableDays.map(day => (
                        <span 
                          key={day} 
                          className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="px-6 pt-4 pb-6">
                  <Button className="w-full">View Profile</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </FadeIn>
    </div>
  );
}
