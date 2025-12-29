import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink, Link2, Plus, Trash2, Edit2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SharedFile {
  id: string;
  title: string;
  description: string | null;
  url: string;
  file_type: string;
  created_at: string;
}

interface FilesPageProps {
  isAdmin?: boolean;
}

export default function FilesPage({ isAdmin = false }: FilesPageProps) {
  const [files, setFiles] = useState<SharedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<SharedFile | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", url: "" });

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from("shared_files")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setFiles(data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.url) {
      toast.error("Titel und URL sind erforderlich");
      return;
    }

    if (editingFile) {
      const { error } = await supabase
        .from("shared_files")
        .update({
          title: formData.title,
          description: formData.description || null,
          url: formData.url,
        })
        .eq("id", editingFile.id);

      if (error) {
        toast.error("Fehler beim Aktualisieren");
        return;
      }
      toast.success("Link aktualisiert");
    } else {
      const { error } = await supabase.from("shared_files").insert({
        title: formData.title,
        description: formData.description || null,
        url: formData.url,
        file_type: "link",
      });

      if (error) {
        toast.error("Fehler beim Hinzufügen");
        return;
      }
      toast.success("Link hinzugefügt");
    }

    setFormData({ title: "", description: "", url: "" });
    setEditingFile(null);
    setDialogOpen(false);
    fetchFiles();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("shared_files").delete().eq("id", id);
    if (error) {
      toast.error("Fehler beim Löschen");
      return;
    }
    toast.success("Link gelöscht");
    fetchFiles();
  };

  const openEdit = (file: SharedFile) => {
    setEditingFile(file);
    setFormData({ title: file.title, description: file.description || "", url: file.url });
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditingFile(null);
    setFormData({ title: "", description: "", url: "" });
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,4%)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[hsl(var(--workflow-purple))] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))] rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-[hsl(0,0%,95%)]">
                Designs & Files
              </h1>
              <p className="text-[hsl(0,0%,55%)]">
                Links zu Canva Designs und aktuellem Skript
              </p>
            </div>
          </div>

          {isAdmin && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openNew}
                  className="bg-[hsl(var(--workflow-purple))] hover:bg-[hsl(var(--workflow-purple)/0.8)]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Link hinzufügen
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[hsl(0,0%,8%)] border-[hsl(0,0%,15%)]">
                <DialogHeader>
                  <DialogTitle className="text-[hsl(0,0%,95%)]">
                    {editingFile ? "Link bearbeiten" : "Neuen Link hinzufügen"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm text-[hsl(0,0%,65%)] mb-1 block">Titel</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="z.B. Aktuelles Skript"
                      className="bg-[hsl(0,0%,12%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,95%)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[hsl(0,0%,65%)] mb-1 block">Beschreibung (optional)</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Kurze Beschreibung..."
                      className="bg-[hsl(0,0%,12%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,95%)]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[hsl(0,0%,65%)] mb-1 block">URL</label>
                    <Input
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://..."
                      className="bg-[hsl(0,0%,12%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,95%)]"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-[hsl(var(--workflow-purple))] hover:bg-[hsl(var(--workflow-purple)/0.8)]"
                  >
                    {editingFile ? "Speichern" : "Hinzufügen"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Files List */}
        {files.length === 0 ? (
          <div className="text-center py-16 text-[hsl(0,0%,45%)]">
            <Link2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Noch keine Links hinzugefügt</p>
          </div>
        ) : (
          <div className="space-y-4">
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5 hover:border-[hsl(var(--workflow-purple)/0.3)] transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[hsl(0,0%,12%)] rounded-lg flex items-center justify-center shrink-0">
                      <Link2 className="w-5 h-5 text-[hsl(var(--workflow-purple))]" />
                    </div>
                    <div>
                      <h3 className="text-[hsl(0,0%,95%)] font-medium mb-1">{file.title}</h3>
                      {file.description && (
                        <p className="text-[hsl(0,0%,55%)] text-sm mb-2">{file.description}</p>
                      )}
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[hsl(var(--workflow-purple))] hover:text-[hsl(var(--workflow-violet))] transition-colors"
                      >
                        Link öffnen
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(file)}
                        className="p-2 rounded-lg hover:bg-[hsl(0,0%,12%)] text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,80%)] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-2 rounded-lg hover:bg-[hsl(0,0%,12%)] text-[hsl(0,0%,55%)] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
