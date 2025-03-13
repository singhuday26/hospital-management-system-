
import { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ChevronDown, 
  CheckCircle2,
  XCircle,
  Clock
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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import FadeIn from '@/components/animations/FadeIn';
import PatientCard from '@/components/dashboard/PatientCard';
import { patients } from '@/lib/data';
import { Patient } from '@/lib/types';

const statusIcons = {
  active: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  inactive: <XCircle className="h-4 w-4 text-gray-400" />,
  pending: <Clock className="h-4 w-4 text-yellow-500" />
};

export default function Patients() {
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  
  // Filter patients based on search query and status filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(patient.status);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <FadeIn>
        <h1 className="text-3xl font-bold">Patients</h1>
        <p className="text-muted-foreground mt-1">Manage patient records and information</p>
      </FadeIn>
      
      <FadeIn delay={100}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search patients..." 
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
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2 font-medium text-sm">Status</div>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('active')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, 'active']);
                    } else {
                      setStatusFilter(statusFilter.filter(s => s !== 'active'));
                    }
                  }}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('inactive')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, 'inactive']);
                    } else {
                      setStatusFilter(statusFilter.filter(s => s !== 'inactive'));
                    }
                  }}
                >
                  Inactive
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('pending')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, 'pending']);
                    } else {
                      setStatusFilter(statusFilter.filter(s => s !== 'pending'));
                    }
                  }}
                >
                  Pending
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex gap-1 rounded-md overflow-hidden border">
              <Button 
                variant={view === 'table' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setView('table')}
                className="rounded-none"
              >
                Table
              </Button>
              <Button 
                variant={view === 'grid' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setView('grid')}
                className="rounded-none"
              >
                Grid
              </Button>
            </div>
            
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Patient
            </Button>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={200}>
        <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm p-1">
          {view === 'table' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Visit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-muted-foreground">No patients found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <TableCell className="font-medium">{patient.patientId}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell className="capitalize">{patient.gender}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {statusIcons[patient.status as keyof typeof statusIcons]}
                            <span className="capitalize">{patient.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {filteredPatients.length === 0 ? (
                <div className="col-span-full flex justify-center py-8">
                  <p className="text-muted-foreground">No patients found</p>
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))
              )}
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
