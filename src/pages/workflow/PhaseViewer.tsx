import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useWorkflowAuth } from "@/hooks/useWorkflowAuth";
import { 
  ChevronLeft, ChevronRight, CheckCircle2, Circle, Clock,
  FileText, Video, Image, Download, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import TextContentRenderer from "@/components/academy/TextContentRenderer";
import VideoContentRenderer from "@/components/academy/VideoContentRenderer";
import ImageContentRenderer from "@/components/academy/ImageContentRenderer";
import DownloadContentRenderer from "@/components/academy/DownloadContentRenderer";

interface WorkflowPhase {
  id: string;
  order_index: number;
  title: string;
  subtitle: string | null;
  estimated_time: string | null;
  difficulty: string | null;
}

interface ContentSection {
  id: string;
  order_index: number;
  title: string;
  content_type: string;
}

interface UserProgress {
  id: string;
  completed: boolean;
  notes: string | null;
}

export default function PhaseViewer() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const { session } = useWorkflowAuth();
  const { toast } = useToast();
  
  const [phase, setPhase] = useState<WorkflowPhase | null>(null);
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [allPhases, setAllPhases] = useState<WorkflowPhase[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (phaseId) {
      fetchPhaseData();
    }
  }, [phaseId, session]);

  const fetchPhaseData = async () => {
    setLoading(true);
    try {
      // Fetch phase details
      const { data: phaseData } = await supabase
        .from("workflow_phases")
        .select("*")
        .eq("id", phaseId)
        .maybeSingle();

      if (phaseData) setPhase(phaseData);

      // Fetch all phases for navigation
      const { data: allPhasesData } = await supabase
        .from("workflow_phases")
        .select("id, order_index, title, subtitle, estimated_time, difficulty")
        .eq("is_published", true)
        .order("order_index");

      if (allPhasesData) setAllPhases(allPhasesData);

      // Fetch content sections
      const { data: sectionsData } = await supabase
        .from("content_sections")
        .select("*")
        .eq("phase_id", phaseId)
        .order("order_index");

      if (sectionsData) setSections(sectionsData);

      // Fetch user progress
      if (session?.id) {
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", session.id)
          .eq("phase_id", phaseId)
          .maybeSingle();

        if (progressData) {
          setProgress(progressData);
          setNotes(progressData.notes || "");
        }
      }
    } catch (error) {
      console.error("Error fetching phase data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = async () => {
    if (!session?.id || !phaseId) return;
    setSaving(true);
    
    try {
      if (progress) {
        await supabase
          .from("user_progress")
          .update({ notes, updated_at: new Date().toISOString() })
          .eq("id", progress.id);
      } else {
        const { data } = await supabase
          .from("user_progress")
          .insert({
            user_id: session.id,
            phase_id: phaseId,
            notes,
            completed: false
          })
          .select()
          .single();
        
        if (data) setProgress(data);
      }
      
      toast({ title: "Notes saved!" });
    } catch (error) {
      toast({ title: "Error saving notes", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleComplete = async () => {
    if (!session?.id || !phaseId) return;
    
    const newCompleted = !progress?.completed;
    
    try {
      if (progress) {
        await supabase
          .from("user_progress")
          .update({ 
            completed: newCompleted, 
            completed_at: newCompleted ? new Date().toISOString() : null,
            updated_at: new Date().toISOString()
          })
          .eq("id", progress.id);
        
        setProgress({ ...progress, completed: newCompleted });
      } else {
        const { data } = await supabase
          .from("user_progress")
          .insert({
            user_id: session.id,
            phase_id: phaseId,
            notes,
            completed: true,
            completed_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (data) setProgress(data);
      }
      
      toast({ 
        title: newCompleted ? "Phase marked as complete!" : "Phase marked as incomplete" 
      });
    } catch (error) {
      toast({ title: "Error updating progress", variant: "destructive" });
    }
  };

  const currentIndex = allPhases.findIndex(p => p.id === phaseId);
  const prevPhase = currentIndex > 0 ? allPhases[currentIndex - 1] : null;
  const nextPhase = currentIndex < allPhases.length - 1 ? allPhases[currentIndex + 1] : null;

  const getContentIcon = (type: string) => {
    switch (type) {
      case "text": return FileText;
      case "video": return Video;
      case "image": return Image;
      case "download": return Download;
      default: return FileText;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[hsl(var(--workflow-purple)/0.3)] border-t-[hsl(var(--workflow-purple))] rounded-full animate-spin" />
      </div>
    );
  }

  if (!phase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[hsl(0,0%,90%)] mb-2">Phase not found</h2>
          <Link to="/workflow" className="text-[hsl(var(--workflow-purple))] hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[hsl(0,0%,4%)]/95 backdrop-blur-sm border-b border-[hsl(0,0%,13%)]">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/workflow"
                className="p-2 rounded-lg hover:bg-[hsl(0,0%,10%)] text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,80%)] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[hsl(var(--workflow-purple))]">
                    Phase {phase.order_index}
                  </span>
                </div>
                <h1 className="text-xl font-display font-bold text-[hsl(0,0%,95%)]">
                  {phase.title}
                </h1>
              </div>
            </div>
            
            <Button
              onClick={toggleComplete}
              variant={progress?.completed ? "default" : "outline"}
              className={cn(
                "gap-2",
                progress?.completed 
                  ? "bg-[hsl(var(--workflow-purple))] hover:bg-[hsl(var(--workflow-purple)/0.9)]"
                  : "border-[hsl(0,0%,20%)] hover:border-[hsl(var(--workflow-purple))]"
              )}
            >
              {progress?.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Mark Complete
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Subtitle */}
          {phase.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-[hsl(0,0%,60%)] mb-8"
            >
              {phase.subtitle}
            </motion.p>
          )}

          {/* Content Sections */}
          {sections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[hsl(0,0%,50%)]">Content wird noch hinzugefügt.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {sections.map((section, index) => {
                const Icon = getContentIcon(section.content_type);
                
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-[hsl(0,0%,6%)] border border-[hsl(0,0%,13%)]"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[hsl(0,0%,10%)] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[hsl(var(--workflow-purple))]" />
                      </div>
                      <h3 className="font-semibold text-[hsl(0,0%,90%)]">{section.title}</h3>
                    </div>
                    
                    {section.content_type === "text" && (
                      <TextContentRenderer sectionId={section.id} />
                    )}
                    {section.content_type === "video" && (
                      <VideoContentRenderer sectionId={section.id} />
                    )}
                    {section.content_type === "image" && (
                      <ImageContentRenderer sectionId={section.id} />
                    )}
                    {section.content_type === "download" && (
                      <DownloadContentRenderer sectionId={section.id} />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Personal Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 rounded-xl bg-[hsl(0,0%,6%)] border border-[hsl(0,0%,13%)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[hsl(0,0%,90%)]">Eigene Notizen</h3>
              <Button
                onClick={saveNotes}
                variant="ghost"
                size="sm"
                disabled={saving}
                className="gap-2 text-[hsl(0,0%,55%)] hover:text-[hsl(var(--workflow-purple))]"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notizen hier eintragen..."
              className="min-h-[120px] bg-[hsl(0,0%,8%)] border-[hsl(0,0%,15%)] text-[hsl(0,0%,85%)] placeholder:text-[hsl(0,0%,40%)] focus:border-[hsl(var(--workflow-purple))]"
            />
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-[hsl(0,0%,13%)]">
            {prevPhase ? (
              <Link
                to={`/workflow/phase/${prevPhase.id}`}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-[hsl(0,0%,8%)] text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,85%)] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-xs text-[hsl(0,0%,45%)]">Previous</div>
                  <div className="text-sm font-medium">{prevPhase.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            
            {nextPhase ? (
              <Link
                to={`/workflow/phase/${nextPhase.id}`}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-[hsl(0,0%,8%)] text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,85%)] transition-colors"
              >
                <div className="text-right">
                  <div className="text-xs text-[hsl(0,0%,45%)]">Next</div>
                  <div className="text-sm font-medium">{nextPhase.title}</div>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
