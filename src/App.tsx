
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import GuestRegistration from "./pages/GuestRegistration";
import GuestsPage from "./pages/GuestList";
import RoomManagement from "./pages/RoomManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/registro" element={<Layout><GuestRegistration /></Layout>} />
            <Route path="/huespedes" element={<Layout><GuestsPage /></Layout>} />
            <Route path="/habitaciones" element={<Layout><RoomManagement /></Layout>} />
            <Route path="/ajustes" element={<Layout><Settings /></Layout>} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
