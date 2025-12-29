import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useWorkflowAuth } from "@/hooks/useWorkflowAuth";
import { 
  Play, FileText, Users, Layout, Zap, Download, Film, 
  Volume2, Sparkles, Upload, CheckCircle2, Clock, BookOpen 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowPhase {
  id: string;
  order_index: number;
  title: string;
  subtitle: string | null;
  icon: string | null;
  estimated_time: string | null;
  difficulty: string | null;
  is_published: boolean;
}

interface UserProgress {
  phase_id: string;
  completed: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Play, FileText, Users, Layout, Zap, Download, Film, Volume2, Sparkles, Upload
};

export default function AcademyDashboard() {
  const { session } = useWorkflowAuth();
  const [phases, setPhases] = useState<WorkflowPhase[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [session]);

  const fetchData = async () => {
    try {
      // Fetch phases
      const { data: phasesData } = await supabase
        .from("workflow_phases")
        .select("*")
        .eq("is_published", true)
        .order("order_index");

      if (phasesData) setPhases(phasesData);

      // Fetch user progress
      if (session?.id) {
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("phase_id, completed")
          .eq("user_id", session.id);

        if (progressData) setProgress(progressData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const completedCount = progress.filter(p => p.completed).length;
  const totalPhases = phases.length;
  const progressPercent = totalPhases > 0 ? Math.round((completedCount / totalPhases) * 100) : 0;

  const isPhaseCompleted = (phaseId: string) => {
    return progress.some(p => p.phase_id === phaseId && p.completed);
  };

  const getDifficultyColor = (difficulty: string | null) => {
    switch (difficulty) {
      case "beginner": return "text-green-400 bg-green-400/10";
      case "intermediate": return "text-yellow-400 bg-yellow-400/10";
      case "advanced": return "text-red-400 bg-red-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[hsl(var(--workflow-purple)/0.3)] border-t-[hsl(var(--workflow-purple))] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-[hsl(0,0%,95%)] mb-2">
          Hey {session?.name}!
        </h1>
        <p className="text-[hsl(0,0%,55%)]">
          StrichAbi Video Production Workflow
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--workflow-purple)/0.1)] to-[hsl(var(--workflow-violet)/0.1)] border border-[hsl(var(--workflow-purple)/0.2)]"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-[hsl(0,0%,90%)]">Progress</h2>
            <p className="text-sm text-[hsl(0,0%,55%)]">
              {completedCount} of {totalPhases} phases completed
            </p>
          </div>
          <div className="text-3xl font-bold text-[hsl(var(--workflow-purple))]">
            {progressPercent}%
          </div>
        </div>
        <div className="h-2 bg-[hsl(0,0%,15%)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))]"
          />
        </div>
      </motion.div>

      {/* Phases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {phases.map((phase, index) => {
          const IconComponent = iconMap[phase.icon || "BookOpen"] || BookOpen;
          const completed = isPhaseCompleted(phase.id);

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link
                to={`/workflow/phase/${phase.id}`}
                className={cn(
                  "block p-5 rounded-xl border transition-all duration-200 group",
                  completed
                    ? "bg-[hsl(var(--workflow-purple)/0.05)] border-[hsl(var(--workflow-purple)/0.3)]"
                    : "bg-[hsl(0,0%,6%)] border-[hsl(0,0%,13%)] hover:border-[hsl(var(--workflow-purple)/0.4)]"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    completed
                      ? "bg-[hsl(var(--workflow-purple)/0.2)]"
                      : "bg-[hsl(0,0%,10%)] group-hover:bg-[hsl(var(--workflow-purple)/0.1)]"
                  )}>
                    {completed ? (
                      <CheckCircle2 className="w-6 h-6 text-[hsl(var(--workflow-purple))]" />
                    ) : (
                      <IconComponent className="w-6 h-6 text-[hsl(0,0%,55%)] group-hover:text-[hsl(var(--workflow-purple))]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[hsl(0,0%,45%)]">
                        Phase {phase.order_index}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[hsl(0,0%,90%)] mb-1 group-hover:text-[hsl(var(--workflow-purple))] transition-colors">
                      {phase.title}
                    </h3>
                    {phase.subtitle && (
                      <p className="text-sm text-[hsl(0,0%,50%)] line-clamp-2">
                        {phase.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
