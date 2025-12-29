import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play, FileText, Users, Layout, Zap, Download, Film,
  Volume2, Sparkles, Upload, LogOut, User, ChevronLeft,
  ChevronRight, BookOpen, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface WorkflowSidebarProps {
  userName: string;
  onLogout: () => void;
  userId?: string;
}

interface Phase {
  id: string;
  order_index: number;
  title: string;
  icon: string | null;
}

const iconMap: Record<string, React.ElementType> = {
  Play, FileText, Users, Layout, Zap, Download, Film, Volume2, Sparkles, Upload, BookOpen
};

export default function WorkflowSidebar({ userName, onLogout, userId }: WorkflowSidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPhases();
  }, [userId]);

  const fetchPhases = async () => {
    const { data: phasesData } = await supabase
      .from("workflow_phases")
      .select("id, order_index, title, icon")
      .eq("is_published", true)
      .order("order_index");

    if (phasesData) setPhases(phasesData);

    if (userId) {
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("phase_id")
        .eq("user_id", userId)
        .eq("completed", true);

      if (progressData) {
        setCompletedPhases(new Set(progressData.map(p => p.phase_id)));
      }
    }
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "h-screen bg-[hsl(0,0%,5%)] border-r border-[hsl(0,0%,13%)] flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-[hsl(0,0%,13%)] flex items-center justify-between">
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-display font-bold text-[hsl(0,0%,88%)] text-sm">Workflow</span>
          </motion.div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-[hsl(0,0%,10%)] text-[hsl(0,0%,50%)] hover:text-[hsl(0,0%,70%)] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {/* Dashboard Link */}
        <NavLink
          to="/workflow"
          end
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-2",
            isActive
              ? "bg-gradient-to-r from-[hsl(var(--workflow-purple)/0.2)] to-[hsl(var(--workflow-violet)/0.2)] text-[hsl(0,0%,95%)] border border-[hsl(var(--workflow-purple)/0.3)]"
              : "text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,80%)] hover:bg-[hsl(0,0%,8%)]",
            collapsed && "justify-center px-2"
          )}
        >
          <BookOpen className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
        </NavLink>

        <div className="h-px bg-[hsl(0,0%,13%)] my-2" />

        {/* Phases */}
        <div className="space-y-1">
          {phases.map((phase) => {
            const isActive = location.pathname === `/workflow/phase/${phase.id}`;
            const Icon = iconMap[phase.icon || "BookOpen"] || BookOpen;
            const isCompleted = completedPhases.has(phase.id);

            return (
              <NavLink
                key={phase.id}
                to={`/workflow/phase/${phase.id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[hsl(var(--workflow-purple)/0.2)] to-[hsl(var(--workflow-violet)/0.2)] text-[hsl(0,0%,95%)] border border-[hsl(var(--workflow-purple)/0.3)]"
                    : "text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,80%)] hover:bg-[hsl(0,0%,8%)]",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? phase.title : undefined}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500" />
                ) : (
                  <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-[hsl(var(--workflow-purple))]")} />
                )}
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{phase.title}</span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="p-2 border-t border-[hsl(0,0%,13%)]">
        <div className={cn("flex items-center gap-3 p-3 rounded-lg bg-[hsl(0,0%,7%)]", collapsed && "justify-center p-2")}>
          <div className="w-8 h-8 bg-[hsl(0,0%,15%)] rounded-full flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-[hsl(0,0%,55%)]" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[hsl(0,0%,88%)] truncate">{userName}</p>
              <p className="text-xs text-[hsl(0,0%,45%)]">Team</p>
            </div>
          )}
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg hover:bg-[hsl(0,0%,15%)] text-[hsl(0,0%,50%)] hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
