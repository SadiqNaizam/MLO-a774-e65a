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
import { Badge } from '@/components/ui/badge';
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
import { Home, ShoppingCart, Package, Users2, Settings, Search, PlusCircle, Edit2, Trash2 } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  imageUrl?: string;
};

const allProductsData: Product[] = [
  { id: 'PROD001', name: 'Ergonomic Wireless Mouse', sku: 'EWM-BLK-01', category: 'Electronics', stock: 150, price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&h=100&fit=crop' },
  { id: 'PROD002', name: 'Mechanical Keyboard RGB', sku: 'MKB-RGB-02', category: 'Electronics', stock: 75, price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1601400698920-2dca26939383?w=100&h=100&fit=crop' },
  { id: 'PROD003', name: 'Organic Green Tea (50 Bags)', sku: 'OGT-50B-03', category: 'Groceries', stock: 300, price: 12.50, imageUrl: 'https://images.unsplash.com/photo-1578260056174-cba48ea0f180?w=100&h=100&fit=crop' },
  { id: 'PROD004', name: 'Stainless Steel Water Bottle', sku: 'SSWB-1L-04', category: 'Home Goods', stock: 0, price: 19.95, imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop' },
  { id: 'PROD005', name: 'Yoga Mat Premium', sku: 'YMP-BLU-05', category: 'Sports', stock: 5, price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop' },
  { id: 'PROD006', name: 'Novel - The Great Adventure', sku: 'NGA-HC-06', category: 'Books', stock: 120, price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=100&fit=crop' },
];

const ITEMS_PER_PAGE = 5;

const ProductInventoryPage: React.FC = () => {
  console.log('ProductInventoryPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = allProductsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStockBadgeVariant = (stock: number): "default" | "secondary" | "destructive" | "outline" => {
    if (stock === 0) return 'destructive';
    if (stock < 10) return 'secondary'; // Using secondary for low stock (e.g. orange/yellow)
    return 'default'; // Using default for in stock (e.g. green/blue)
  };
  
  const getStockBadgeText = (stock: number): string => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
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
              <BreadcrumbPage>Product Inventory</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Product Inventory</h1>

        <Card className="mb-6 bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by Name, SKU, or Category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button className="w-full md:w-auto">
              <PlusCircle className="h-4 w-4 mr-2" /> Add New Product
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
           <CardHeader>
            <CardTitle>Product List</CardTitle>
            <CardDescription>{filteredProducts.length} product(s) found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption className="sr-only">A list of products in inventory.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.length > 0 ? paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.imageUrl || `https://via.placeholder.com/50?text=${product.name.substring(0,1)}`} 
                        alt={product.name} 
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-center">{product.stock}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStockBadgeVariant(product.stock)}
                             className={
                                product.stock === 0 ? "bg-red-100 text-red-700 border-red-300" :
                                product.stock < 10 ? "bg-yellow-100 text-yellow-700 border-yellow-300" :
                                "bg-green-100 text-green-700 border-green-300"
                             }>
                        {getStockBadgeText(product.stock)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm" className="mr-1">
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button variant="destructive" size="sm" className="opacity-70 hover:opacity-100">
                         <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">No products found.</TableCell>
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

export default ProductInventoryPage;