
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  ShoppingCart,
  AlertTriangle,
  Package,
  BarChart3,
  ArrowUpDown
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
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import FadeIn from '@/components/animations/FadeIn';

// Mock inventory data for now
const inventoryData = [
  {
    id: "1",
    name: "Surgical Gloves",
    category: "PPE",
    quantity: 1200,
    unit: "pairs",
    unitPrice: 0.75,
    supplier: "MedSupply Inc.",
    reorderLevel: 300,
    expiryDate: "2024-12-31",
    location: "Storage A"
  },
  {
    id: "2",
    name: "Face Masks",
    category: "PPE",
    quantity: 500,
    unit: "pieces",
    unitPrice: 0.50,
    supplier: "HealthCare Supplies",
    reorderLevel: 200,
    expiryDate: "2024-10-15",
    location: "Storage A"
  },
  {
    id: "3",
    name: "Disposable Syringes",
    category: "Equipment",
    quantity: 800,
    unit: "pieces",
    unitPrice: 0.30,
    supplier: "MedEquip Ltd.",
    reorderLevel: 250,
    expiryDate: "2024-11-20",
    location: "Storage B"
  },
  {
    id: "4",
    name: "Paracetamol 500mg",
    category: "Medication",
    quantity: 50,
    unit: "boxes",
    unitPrice: 5.00,
    supplier: "PharmaCo",
    reorderLevel: 20,
    expiryDate: "2024-06-30",
    location: "Pharmacy"
  },
  {
    id: "5",
    name: "Bandages",
    category: "First Aid",
    quantity: 350,
    unit: "rolls",
    unitPrice: 1.20,
    supplier: "MedSupply Inc.",
    reorderLevel: 100,
    expiryDate: "2025-02-15",
    location: "Storage C"
  }
];

const lowStockItems = inventoryData.filter(item => item.quantity <= item.reorderLevel);

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Filter inventory data based on search query and category filter
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(item.category);
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort inventory data
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  // Calculate inventory statistics
  const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventoryData.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const lowStockCount = lowStockItems.length;
  const categories = [...new Set(inventoryData.map(item => item.category))];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pt-24">
      <FadeIn>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage medical supplies and equipment</p>
      </FadeIn>
      
      <FadeIn delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                  <h3 className="text-2xl font-bold">{totalItems}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <h3 className="text-2xl font-bold">${totalValue.toFixed(2)}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <h3 className="text-2xl font-bold">{categories.length}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Stock Alert</p>
                  <h3 className="text-2xl font-bold">{lowStockCount}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
      
      <FadeIn delay={150}>
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>Items that need to be reordered soon</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">No low stock items</p>
            ) : (
              <div className="space-y-4">
                {lowStockItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.quantity} {item.unit}</span>
                        <span>•</span>
                        <span>{item.supplier}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 w-32">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Stock Level</span>
                        <span className={item.quantity < item.reorderLevel/2 ? "text-red-500 font-medium" : "text-yellow-500 font-medium"}>
                          {Math.round((item.quantity / item.reorderLevel) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(item.quantity / item.reorderLevel) * 100} 
                        className={item.quantity < item.reorderLevel/2 ? "text-red-500" : "text-yellow-500"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Alerts</Button>
          </CardFooter>
        </Card>
      </FadeIn>
      
      <FadeIn delay={200}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search inventory..." 
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
                <div className="p-2 font-medium text-sm">Category</div>
                {categories.map(category => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={categoryFilter.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCategoryFilter([...categoryFilter, category]);
                      } else {
                        setCategoryFilter(categoryFilter.filter(c => c !== category));
                      }
                    }}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay={300}>
        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">
                      Item Name
                      {sortColumn === 'name' && (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                    <div className="flex items-center gap-1">
                      Category
                      {sortColumn === 'category' && (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('quantity')}>
                    <div className="flex items-center gap-1">
                      Quantity
                      {sortColumn === 'quantity' && (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('unitPrice')}>
                    <div className="flex items-center gap-1">
                      Unit Price
                      {sortColumn === 'unitPrice' && (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('expiryDate')}>
                    <div className="flex items-center gap-1">
                      Expiry Date
                      {sortColumn === 'expiryDate' && (
                        <ArrowUpDown className="h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Stock Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6">
                      <p className="text-muted-foreground">No inventory items found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {item.quantity <= item.reorderLevel / 2 ? (
                          <Badge variant="destructive">Low Stock</Badge>
                        ) : item.quantity <= item.reorderLevel ? (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600 bg-yellow-50">Reorder Soon</Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">In Stock</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Update</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
