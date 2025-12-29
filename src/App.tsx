import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Application from "./pages/Application";
import AdminDashboard from "./pages/AdminDashboard";
import InfoPage from "./pages/InfoPage";
import NotFound from "./pages/NotFound";
import TeamLogin from "./pages/TeamLogin";
import WorkflowLayout from "./components/workflow/WorkflowLayout";
import AcademyDashboard from "./pages/workflow/AcademyDashboard";
import PhaseViewer from "./pages/workflow/PhaseViewer";
import FilesPage from "./pages/workflow/FilesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apply" element={<Application />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/login" element={<TeamLogin />} />
          <Route path="/workflow" element={<WorkflowLayout />}>
            <Route index element={<AcademyDashboard />} />
            <Route path="files" element={<FilesPage isAdmin />} />
            <Route path="phase/:phaseId" element={<PhaseViewer />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
