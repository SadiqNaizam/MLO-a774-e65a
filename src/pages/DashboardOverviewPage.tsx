import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
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
import KPICard from '@/components/KPICard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { ChartContainer } from "@/components/ui/chart";
import { DollarSign, Users, CreditCard, Package, Home, ShoppingCart, BarChart2, Users2, Settings } from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 4000, orders: 2400 },
  { name: 'Feb', sales: 3000, orders: 2210 },
  { name: 'Mar', sales: 2000, orders: 2290 },
  { name: 'Apr', sales: 2780, orders: 2000 },
  { name: 'May', sales: 1890, orders: 2181 },
  { name: 'Jun', sales: 2390, orders: 2500 },
  { name: 'Jul', sales: 3490, orders: 2100 },
];

const recentOrders = [
  { id: 'ORD001', customer: 'Alice Wonderland', date: '2023-10-26', amount: '$150.00', status: 'Delivered' },
  { id: 'ORD002', customer: 'Bob The Builder', date: '2023-10-25', amount: '$75.50', status: 'Processing' },
  { id: 'ORD003', customer: 'Charlie Brown', date: '2023-10-25', amount: '$220.10', status: 'Shipped' },
  { id: 'ORD004', customer: 'Diana Prince', date: '2023-10-24', amount: '$99.99', status: 'Delivered' },
];

const DashboardOverviewPage: React.FC = () => {
  console.log('DashboardOverviewPage loaded');

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
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Dashboard Overview</h1>
        
        {/* KPI Cards Section */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <KPICard
            title="Total Revenue"
            metric="$45,231.89"
            icon={<DollarSign className="h-5 w-5 text-green-500" />}
            description="+20.1% from last month"
            trend={{ value: "+$8,902", direction: 'up' }}
            className="bg-white dark:bg-gray-800 shadow-lg"
          />
          <KPICard
            title="New Customers"
            metric="+1,234"
            icon={<Users className="h-5 w-5 text-blue-500" />}
            description="+15% this month"
            trend={{ value: "+180", direction: 'up' }}
            className="bg-white dark:bg-gray-800 shadow-lg"
          />
          <KPICard
            title="Total Orders"
            metric="2,350"
            icon={<CreditCard className="h-5 w-5 text-purple-500" />}
            description="+5.2% from last week"
            trend={{ value: "+120", direction: 'up' }}
            className="bg-white dark:bg-gray-800 shadow-lg"
          />
          <KPICard
            title="Pending Shipments"
            metric="72"
            icon={<Package className="h-5 w-5 text-yellow-500" />}
            description="Awaiting fulfillment"
            trend={{ value: "-5", direction: 'down' }} // Example of neutral or slightly concerning
            className="bg-white dark:bg-gray-800 shadow-lg"
          />
        </section>

        {/* Sales Chart and Recent Orders Section */}
        <section className="grid gap-8 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-indigo-500" /> Sales Trends
              </CardTitle>
              <CardDescription>Last 7 months performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <RechartsTooltip
                      cursor={{ fill: 'hsl(var(--accent))', fillOpacity: 0.3 }}
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }}/>
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Sales ($)" />
                    <Bar dataKey="orders" fill="hsl(var(--secondary-foreground))" radius={[4, 4, 0, 0]} name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-pink-500" /> Recent Orders
              </CardTitle>
              <CardDescription>Top 4 recent transactions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption className="sr-only">A list of recent orders.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell className="text-right">{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default DashboardOverviewPage;