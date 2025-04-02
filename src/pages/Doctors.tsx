
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search, ArrowLeft } from 'lucide-react';
import { doctors } from '@/lib/data';
import DoctorCard from '@/components/dashboard/DoctorCard';
import FadeIn from '@/components/animations/FadeIn';
import { BackButton } from '@/components/ui/back-button';

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <FadeIn>
        <div className="flex items-center">
          <BackButton className="mr-2" />
          <div>
            <h1 className="text-3xl font-bold">Doctors</h1>
            <p className="text-muted-foreground mt-1">View and manage healthcare professionals</p>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={100}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by name or specialty..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Doctor
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
          
          {filteredDoctors.length === 0 && (
            <div className="col-span-full flex justify-center py-8">
              <p className="text-muted-foreground">No doctors found</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
