
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Download
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
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FadeIn from '@/components/animations/FadeIn';

// Mock billing data for now
const billingData = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    patientName: "John Doe",
    date: "2023-06-15",
    amount: 350.00,
    status: "paid",
    paymentMethod: "Credit Card",
    service: "General Checkup"
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    patientName: "Jane Smith",
    date: "2023-06-17",
    amount: 1200.50,
    status: "pending",
    paymentMethod: "",
    service: "Surgery"
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    patientName: "Robert Johnson",
    date: "2023-06-20",
    amount: 75.00,
    status: "overdue",
    paymentMethod: "",
    service: "Consultation"
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    patientName: "Sarah Williams",
    date: "2023-06-22",
    amount: 450.75,
    status: "paid",
    paymentMethod: "Bank Transfer",
    service: "X-Ray"
  },
  {
    id: "5",
    invoiceNumber: "INV-005",
    patientName: "Michael Brown",
    date: "2023-06-25",
    amount: 125.00,
    status: "cancelled",
    paymentMethod: "",
    service: "Follow-up"
  }
];

const statusIcons = {
  paid: <CheckCircle className="h-4 w-4 text-green-500" />,
  pending: <Clock className="h-4 w-4 text-yellow-500" />,
  overdue: <XCircle className="h-4 w-4 text-red-500" />,
  cancelled: <XCircle className="h-4 w-4 text-gray-400" />
};

const statusColors = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  overdue: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800"
};

export default function Billing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  
  // Filter billing data based on search query and status filter
  const filteredBilling = billingData.filter(invoice => {
    const matchesSearch = 
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.service.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(invoice.status);
    
    return matchesSearch && matchesStatus;
  });

  // Summary calculations
  const totalRevenue = billingData.filter(i => i.status === 'paid').reduce((sum, curr) => sum + curr.amount, 0);
  const pendingAmount = billingData.filter(i => i.status === 'pending').reduce((sum, curr) => sum + curr.amount, 0);
  const overdueAmount = billingData.filter(i => i.status === 'overdue').reduce((sum, curr) => sum + curr.amount, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <FadeIn>
        <h1 className="text-3xl font-bold">Billing & Invoices</h1>
        <p className="text-muted-foreground mt-1">Manage patient payments and invoices</p>
      </FadeIn>
      
      <FadeIn delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                  <h3 className="text-2xl font-bold">${pendingAmount.toFixed(2)}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue Amount</p>
                  <h3 className="text-2xl font-bold">${overdueAmount.toFixed(2)}</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
      
      <FadeIn delay={200}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search invoices..." 
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
                  checked={statusFilter.includes('paid')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, 'paid']);
                    } else {
                      setStatusFilter(statusFilter.filter(s => s !== 'paid'));
                    }
                  }}
                >
                  Paid
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
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('overdue')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, 'overdue']);
                    } else {
                      setStatusFilter(statusFilter.filter(s => s !== 'overdue'));
                    }
                  }}
                >
                  Overdue
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.includes('cancelled')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, 'cancelled']);
                    } else {
                      setStatusFilter(statusFilter.filter(s => s !== 'cancelled'));
                    }
                  }}
                >
                  Cancelled
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={300}>
        <Card>
          <Tabs defaultValue="all" className="w-full">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>View and manage all patient invoices</CardDescription>
                </div>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="overdue">Overdue</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="all" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBilling.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          <p className="text-muted-foreground">No invoices found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBilling.map((invoice) => (
                        <TableRow key={invoice.id} className="group">
                          <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.patientName}</TableCell>
                          <TableCell>{invoice.service}</TableCell>
                          <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[invoice.status as keyof typeof statusColors]}`}>
                                {statusIcons[invoice.status as keyof typeof statusIcons]}
                                <span className="ml-1 capitalize">{invoice.status}</span>
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="paid" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBilling.filter(i => i.status === 'paid').length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          <p className="text-muted-foreground">No paid invoices found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBilling.filter(i => i.status === 'paid').map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.patientName}</TableCell>
                          <TableCell>{invoice.service}</TableCell>
                          <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>{invoice.paymentMethod}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBilling.filter(i => i.status === 'pending').length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          <p className="text-muted-foreground">No pending invoices found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBilling.filter(i => i.status === 'pending').map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.patientName}</TableCell>
                          <TableCell>{invoice.service}</TableCell>
                          <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="default" size="sm">Mark as Paid</Button>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="overdue" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBilling.filter(i => i.status === 'overdue').length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          <p className="text-muted-foreground">No overdue invoices found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBilling.filter(i => i.status === 'overdue').map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.patientName}</TableCell>
                          <TableCell>{invoice.service}</TableCell>
                          <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell className="text-red-500 font-medium">10 days</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="default" size="sm">Mark as Paid</Button>
                              <Button variant="outline" size="sm">Send Reminder</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </FadeIn>
    </div>
  );
}
