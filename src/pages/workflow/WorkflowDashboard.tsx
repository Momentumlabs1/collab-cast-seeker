import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Plus, 
  FolderOpen, 
  Clock, 
  CheckCircle2, 
  PlayCircle,
  MoreVertical,
  Trash2,
  Edit,
  FileVideo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string | null;
  status: string;
  duration_seconds: number | null;
  total_slides: number | null;
  created_at: string;
  updated_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: "Entwurf", color: "bg-[hsl(0,0%,20%)] text-[hsl(0,0%,60%)]", icon: FolderOpen },
  in_progress: { label: "In Arbeit", color: "bg-[hsl(var(--workflow-purple)/0.2)] text-[hsl(var(--workflow-purple))]", icon: PlayCircle },
  review: { label: "Review", color: "bg-[hsl(var(--workflow-orange)/0.2)] text-[hsl(var(--workflow-orange))]", icon: Clock },
  completed: { label: "Fertig", color: "bg-[hsl(var(--workflow-green)/0.2)] text-[hsl(var(--workflow-green))]", icon: CheckCircle2 },
};

export default function WorkflowDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", duration: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const session = JSON.parse(localStorage.getItem("workflow_session") || "{}");
    
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("team_member_id", session.id)
      .order("updated_at", { ascending: false });

    if (error) {
      toast({
        title: "Fehler",
        description: "Projekte konnten nicht geladen werden.",
        variant: "destructive",
      });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!formData.title.trim()) return;
    setSaving(true);
    
    const session = JSON.parse(localStorage.getItem("workflow_session") || "{}");
    
    const { error } = await supabase.from("projects").insert({
      team_member_id: session.id,
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      duration_seconds: formData.duration ? parseInt(formData.duration) : null,
    });

    if (error) {
      toast({
        title: "Fehler",
        description: "Projekt konnte nicht erstellt werden.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Projekt erstellt!" });
      setCreateOpen(false);
      setFormData({ title: "", description: "", duration: "" });
      fetchProjects();
    }
    setSaving(false);
  };

  const handleUpdate = async () => {
    if (!editProject || !formData.title.trim()) return;
    setSaving(true);
    
    const { error } = await supabase
      .from("projects")
      .update({
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        duration_seconds: formData.duration ? parseInt(formData.duration) : null,
      })
      .eq("id", editProject.id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Projekt konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Projekt aktualisiert!" });
      setEditProject(null);
      setFormData({ title: "", description: "", duration: "" });
      fetchProjects();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Projekt wirklich löschen?")) return;
    
    const { error } = await supabase.from("projects").delete().eq("id", id);
    
    if (error) {
      toast({
        title: "Fehler",
        description: "Projekt konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Projekt gelöscht" });
      fetchProjects();
    }
  };

  const openEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description || "",
      duration: project.duration_seconds?.toString() || "",
    });
    setEditProject(project);
  };

  const stats = {
    total: projects.length,
    draft: projects.filter(p => p.status === "draft").length,
    in_progress: projects.filter(p => p.status === "in_progress").length,
    completed: projects.filter(p => p.status === "completed").length,
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display">
            Projekte
          </h1>
          <p className="text-[hsl(0,0%,50%)] mt-1">
            Verwalte deine Video-Projekte
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-gradient-to-r from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))] hover:opacity-90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Neues Projekt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Gesamt", value: stats.total, icon: FileVideo, color: "text-[hsl(var(--workflow-purple))]" },
          { label: "Entwürfe", value: stats.draft, icon: FolderOpen, color: "text-[hsl(0,0%,60%)]" },
          { label: "In Arbeit", value: stats.in_progress, icon: PlayCircle, color: "text-[hsl(var(--workflow-orange))]" },
          { label: "Fertig", value: stats.completed, icon: CheckCircle2, color: "text-[hsl(var(--workflow-green))]" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-[hsl(0,0%,10%)] ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[hsl(0,0%,88%)]">{stat.value}</p>
                <p className="text-sm text-[hsl(0,0%,50%)]">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[hsl(var(--workflow-purple)/0.3)] border-t-[hsl(var(--workflow-purple))] rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 bg-[hsl(0,0%,10%)] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileVideo className="w-8 h-8 text-[hsl(0,0%,40%)]" />
          </div>
          <h3 className="text-lg font-medium text-[hsl(0,0%,70%)] mb-2">Keine Projekte</h3>
          <p className="text-[hsl(0,0%,45%)] mb-6">Erstelle dein erstes Projekt, um loszulegen.</p>
          <Button
            onClick={() => setCreateOpen(true)}
            variant="outline"
            className="border-[hsl(0,0%,20%)] text-[hsl(0,0%,80%)] hover:bg-[hsl(0,0%,10%)]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Projekt erstellen
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => {
            const status = statusConfig[project.status] || statusConfig.draft;
            const StatusIcon = status.icon;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5 hover:border-[hsl(0,0%,20%)] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge className={status.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-[hsl(0,0%,15%)] text-[hsl(0,0%,50%)] opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)]">
                      <DropdownMenuItem onClick={() => openEdit(project)} className="text-[hsl(0,0%,80%)] hover:bg-[hsl(0,0%,15%)]">
                        <Edit className="w-4 h-4 mr-2" />
                        Bearbeiten
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(project.id)} className="text-red-400 hover:bg-[hsl(0,0%,15%)]">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Löschen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <h3 className="font-bold text-[hsl(0,0%,88%)] mb-1 line-clamp-1">{project.title}</h3>
                {project.description && (
                  <p className="text-sm text-[hsl(0,0%,50%)] mb-3 line-clamp-2">{project.description}</p>
                )}
                
                <div className="flex items-center gap-4 text-xs text-[hsl(0,0%,45%)]">
                  {project.duration_seconds && (
                    <span>{project.duration_seconds}s Ziel</span>
                  )}
                  <span>
                    {new Date(project.updated_at).toLocaleDateString("de-DE")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={createOpen || !!editProject} onOpenChange={(open) => {
        if (!open) {
          setCreateOpen(false);
          setEditProject(null);
          setFormData({ title: "", description: "", duration: "" });
        }
      }}>
        <DialogContent className="bg-[hsl(0,0%,7%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,88%)]">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editProject ? "Projekt bearbeiten" : "Neues Projekt"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-[hsl(0,0%,70%)]">Titel *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="z.B. Bitcoin Basics Video"
                className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,88%)]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(0,0%,70%)]">Beschreibung</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Worum geht es in diesem Video?"
                className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,88%)] min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[hsl(0,0%,70%)]">Ziel-Dauer (Sekunden)</Label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="z.B. 90"
                className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,88%)]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCreateOpen(false);
                setEditProject(null);
                setFormData({ title: "", description: "", duration: "" });
              }}
              className="border-[hsl(0,0%,20%)] text-[hsl(0,0%,70%)]"
            >
              Abbrechen
            </Button>
            <Button
              onClick={editProject ? handleUpdate : handleCreate}
              disabled={saving || !formData.title.trim()}
              className="bg-gradient-to-r from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))] text-white"
            >
              {saving ? "Speichern..." : editProject ? "Aktualisieren" : "Erstellen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
