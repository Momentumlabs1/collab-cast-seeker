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
import WorkflowDashboard from "./pages/workflow/WorkflowDashboard";
import PositioningPhase from "./pages/workflow/PositioningPhase";
import ScriptPhase from "./pages/workflow/ScriptPhase";
import AssetsPhase from "./pages/workflow/AssetsPhase";
import FramePlanningPhase from "./pages/workflow/FramePlanningPhase";
import CanvaDesignsPhase from "./pages/workflow/CanvaDesignsPhase";
import ExportSettingsPhase from "./pages/workflow/ExportSettingsPhase";
import ImportValidatePhase from "./pages/workflow/ImportValidatePhase";
import CapCutPrepPhase from "./pages/workflow/CapCutPrepPhase";
import FinalChecklistPhase from "./pages/workflow/FinalChecklistPhase";

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
            <Route index element={<WorkflowDashboard />} />
            <Route path="positioning" element={<PositioningPhase />} />
            <Route path="script" element={<ScriptPhase />} />
            <Route path="assets" element={<AssetsPhase />} />
            <Route path="frames" element={<FramePlanningPhase />} />
            <Route path="canva" element={<CanvaDesignsPhase />} />
            <Route path="export-settings" element={<ExportSettingsPhase />} />
            <Route path="import" element={<ImportValidatePhase />} />
            <Route path="capcut" element={<CapCutPrepPhase />} />
            <Route path="checklist" element={<FinalChecklistPhase />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
