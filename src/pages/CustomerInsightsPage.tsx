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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Home, ShoppingCart, Package, Users2, Settings, Search, PlusCircle, Eye } from 'lucide-react';

type Customer = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  totalOrders: number;
  totalSpend: number;
  lastOrderDate: string;
  memberSince: string;
};

const allCustomersData: Customer[] = [
  { id: 'CUST001', name: 'Alice Wonderland', email: 'alice@example.com', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&q=80', totalOrders: 5, totalSpend: 750.00, lastOrderDate: '2023-10-26', memberSince: '2022-01-15' },
  { id: 'CUST002', name: 'Bob The Builder', email: 'bob@example.com', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&q=80', totalOrders: 2, totalSpend: 150.50, lastOrderDate: '2023-10-25', memberSince: '2023-03-10' },
  { id: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&q=80', totalOrders: 10, totalSpend: 1230.75, lastOrderDate: '2023-10-25', memberSince: '2021-07-01' },
  { id: 'CUST004', name: 'Diana Prince', email: 'diana@example.com', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&q=80', totalOrders: 8, totalSpend: 999.00, lastOrderDate: '2023-10-24', memberSince: '2022-05-20' },
  { id: 'CUST005', name: 'Edward Scissorhands', email: 'edward@example.com', totalOrders: 1, totalSpend: 45.00, lastOrderDate: '2023-10-23', memberSince: '2023-09-01' },
  { id: 'CUST006', name: 'Fiona Gallagher', email: 'fiona@example.com', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', totalOrders: 12, totalSpend: 320.00, lastOrderDate: '2023-09-15', memberSince: '2020-02-28' },
];

const ITEMS_PER_PAGE = 5;

const CustomerInsightsPage: React.FC = () => {
  console.log('CustomerInsightsPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = allCustomersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
              <BreadcrumbPage>Customer Insights</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Customer Insights</h1>

        <Card className="mb-6 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle>Manage Customers</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by Name or Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button className="w-full md:w-auto">
              <PlusCircle className="h-4 w-4 mr-2" /> Add New Customer
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
            <CardDescription>{filteredCustomers.length} customer(s) found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption className="sr-only">A list of customers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Total Orders</TableHead>
                  <TableHead className="text-right">Total Spend</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Member Since</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.length > 0 ? paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell className="text-center">{customer.totalOrders}</TableCell>
                    <TableCell className="text-right">${customer.totalSpend.toFixed(2)}</TableCell>
                    <TableCell>{customer.lastOrderDate}</TableCell>
                    <TableCell>{customer.memberSince}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No customers found.</TableCell>
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
    </div>
  );
};

export default CustomerInsightsPage;