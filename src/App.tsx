import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import newly generated pages
import LoginPage from "./pages/LoginPage";
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import OrdersManagementPage from "./pages/OrdersManagementPage";
import ProductInventoryPage from "./pages/ProductInventoryPage";
import CustomerInsightsPage from "./pages/CustomerInsightsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardOverviewPage />} /> {/* Default to dashboard */}
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/orders-management" element={<OrdersManagementPage />} />
          <Route path="/product-inventory" element={<ProductInventoryPage />} />
          <Route path="/customer-insights" element={<CustomerInsightsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;