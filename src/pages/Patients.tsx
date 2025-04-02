
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, ArrowLeft } from 'lucide-react';
import { patients } from '@/lib/data';
import PatientCard from '@/components/dashboard/PatientCard';
import FadeIn from '@/components/animations/FadeIn';
import { BackButton } from '@/components/ui/back-button';

const PatientList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <FadeIn>
        <div className="flex items-center">
          <BackButton className="mr-2" />
          <div>
            <h1 className="text-3xl font-bold">Patients</h1>
            <p className="text-muted-foreground mt-1">Manage all patient information and interactions</p>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={100}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search patients..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> New Patient
            </Button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
          
          {filteredPatients.length === 0 && (
            <div className="col-span-full flex justify-center py-8">
              <p className="text-muted-foreground">No patients found</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export default PatientList;
