import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '@/components/ui/table';
import OrderStatusBadge, { OrderStatus } from '@/components/OrderStatusBadge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Home, ShoppingCart, Package, Users2, Settings, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: { name: string; quantity: number; price: number }[];
};

const allOrdersData: Order[] = [
  { id: 'ORD001', customerName: 'Alice Wonderland', customerEmail: 'alice@example.com', date: '2023-10-26', total: 150.00, status: 'delivered', items: [{name: 'Mad Hatter Tea Set', quantity: 1, price: 150.00}] },
  { id: 'ORD002', customerName: 'Bob The Builder', customerEmail: 'bob@example.com', date: '2023-10-25', total: 75.50, status: 'processing', items: [{name: 'Toolbox Deluxe', quantity: 1, price: 75.50}] },
  { id: 'ORD003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', date: '2023-10-25', total: 220.10, status: 'shipped', items: [{name: 'Kite', quantity: 2, price: 20.00}, {name: 'Security Blanket', quantity: 1, price: 200.10}] },
  { id: 'ORD004', customerName: 'Diana Prince', customerEmail: 'diana@example.com', date: '2023-10-24', total: 99.99, status: 'delivered', items: [{name: 'Lasso of Truth Replica', quantity: 1, price: 99.99}] },
  { id: 'ORD005', customerName: 'Edward Scissorhands', customerEmail: 'edward@example.com', date: '2023-10-23', total: 45.00, status: 'pending', items: [{name: 'Topiary Shears', quantity: 1, price: 45.00}] },
  { id: 'ORD006', customerName: 'Fiona Gallagher', customerEmail: 'fiona@example.com', date: '2023-10-22', total: 120.00, status: 'cancelled', items: [{name: 'South Side Guide', quantity: 3, price: 40.00}] },
  { id: 'ORD007', customerName: 'Gordon Gekko', customerEmail: 'gordon@example.com', date: '2023-10-21', total: 5000.00, status: 'on-hold', items: [{name: 'Stock Tips', quantity: 1, price: 5000.00}] },
  { id: 'ORD008', customerName: 'Harry Potter', customerEmail: 'harry@example.com', date: '2023-10-20', total: 30.00, status: 'refunded', items: [{name: 'Bertie Botts Every Flavor Beans', quantity: 3, price: 10.00}] },
];

const ITEMS_PER_PAGE = 5;

const OrdersManagementPage: React.FC = () => {
  console.log('OrdersManagementPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = allOrdersData
    .filter(order =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || order.status === statusFilter)
    );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="h-4 w-4 mr-2" /> Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/orders-management">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 <ShoppingCart className="h-4 w-4 mr-2" /> Orders
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/product-inventory">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 <Package className="h-4 w-4 mr-2" /> Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/customer-insights">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Users2 className="h-4 w-4 mr-2" /> Customers
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <Link to="/settings"> {/* Placeholder */}
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Breadcrumb className="hidden md:flex ml-auto">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Orders Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Orders Management</h1>

        <Card className="mb-6 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle>Filter & Search Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by Order ID or Customer Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle>Order List</CardTitle>
            <CardDescription>{filteredOrders.length} order(s) found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption className="sr-only">A list of customer orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.length > 0 ? paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openOrderDetails(order)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </DialogTrigger>
                      {/* Add other actions like edit/delete if needed */}
                      {/* <Button variant="ghost" size="icon" className="ml-2"><Edit className="h-4 w-4" /></Button> */}
                      {/* <Button variant="ghost" size="icon" className="ml-1 text-red-500"><Trash2 className="h-4 w-4" /></Button> */}
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No orders found matching your criteria.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          {totalPages > 1 && (
             <CardFooter className="flex justify-center py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        // Basic pagination display logic (can be improved for many pages)
                        if (page === currentPage || 
                            page <= 2 || page >= totalPages -1 ||
                            (page >= currentPage -1 && page <= currentPage + 1)
                        ) {
                           return (
                            <PaginationItem key={page}>
                                <PaginationLink 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                                    isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                           )
                        } else if ( (page === currentPage - 2 && page > 2) || (page === currentPage + 2 && page < totalPages - 1) ) {
                            return <PaginationEllipsis key={`ellipsis-${page}`} />;
                        }
                        return null;
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
             </CardFooter>
          )}
        </Card>
      </main>

      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={(isOpen) => !isOpen && closeOrderDetails()}>
          <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Customer: {selectedOrder.customerName} ({selectedOrder.customerEmail}) <br />
                Date: {selectedOrder.date}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-2">
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each</li>
                ))}
              </ul>
              <p className="font-semibold text-lg">Total: ${selectedOrder.total.toFixed(2)}</p>
              <div className="flex items-center">
                <span className="mr-2 font-medium">Status:</span>
                <OrderStatusBadge status={selectedOrder.status} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeOrderDetails}>Close</Button>
              {/* <Button type="button">Update Status</Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrdersManagementPage;