import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink, Link2, Plus, Trash2, Edit2, Save, X } from "lucide-react";
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
  content: string | null;
  file_type: string;
  created_at: string;
}

interface FilesPageProps {
  isAdmin?: boolean;
}

export default function FilesPage({ isAdmin = false }: FilesPageProps) {
  const [links, setLinks] = useState<SharedFile[]>([]);
  const [script, setScript] = useState<SharedFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SharedFile | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", url: "" });
  
  // Script editing
  const [editingScript, setEditingScript] = useState(false);
  const [scriptContent, setScriptContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("shared_files")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      const scriptItem = data.find(f => f.file_type === "script");
      const linkItems = data.filter(f => f.file_type === "link");
      setScript(scriptItem || null);
      setScriptContent(scriptItem?.content || "");
      setLinks(linkItems);
    }
    setLoading(false);
  };

  // Script handlers
  const handleSaveScript = async () => {
    if (script) {
      const { error } = await supabase
        .from("shared_files")
        .update({ content: scriptContent })
        .eq("id", script.id);

      if (error) {
        toast.error("Fehler beim Speichern");
        return;
      }
    } else {
      const { error } = await supabase.from("shared_files").insert({
        title: "Aktuelles Skript",
        url: "#",
        content: scriptContent,
        file_type: "script",
      });

      if (error) {
        toast.error("Fehler beim Speichern");
        return;
      }
    }
    toast.success("Skript gespeichert");
    setEditingScript(false);
    fetchData();
  };

  // Link handlers
  const handleSubmitLink = async () => {
    if (!formData.title || !formData.url) {
      toast.error("Titel und URL sind erforderlich");
      return;
    }

    if (editingLink) {
      const { error } = await supabase
        .from("shared_files")
        .update({
          title: formData.title,
          description: formData.description || null,
          url: formData.url,
        })
        .eq("id", editingLink.id);

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
    setEditingLink(null);
    setDialogOpen(false);
    fetchData();
  };

  const handleDeleteLink = async (id: string) => {
    const { error } = await supabase.from("shared_files").delete().eq("id", id);
    if (error) {
      toast.error("Fehler beim Löschen");
      return;
    }
    toast.success("Link gelöscht");
    fetchData();
  };

  const openEditLink = (file: SharedFile) => {
    setEditingLink(file);
    setFormData({ title: file.title, description: file.description || "", url: file.url });
    setDialogOpen(true);
  };

  const openNewLink = () => {
    setEditingLink(null);
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
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))] rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-[hsl(0,0%,95%)]">
              Designs & Files
            </h1>
            <p className="text-[hsl(0,0%,55%)]">
              Aktuelles Skript und Canva Design Links
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Script Section */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[hsl(0,0%,95%)]">
                📝 Aktuelles Skript
              </h2>
              {isAdmin && !editingScript && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingScript(true)}
                  className="text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,95%)]"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Bearbeiten
                </Button>
              )}
              {isAdmin && editingScript && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingScript(false);
                      setScriptContent(script?.content || "");
                    }}
                    className="text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,95%)]"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveScript}
                    className="bg-[hsl(var(--workflow-purple))] hover:bg-[hsl(var(--workflow-purple)/0.8)]"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Speichern
                  </Button>
                </div>
              )}
            </div>

            {editingScript ? (
              <Textarea
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                placeholder="Füge hier das englische Skript ein, das die Editoren testen sollen..."
                className="min-h-[400px] bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,90%)] font-mono text-sm"
              />
            ) : (
              <div className="min-h-[400px] bg-[hsl(0,0%,5%)] rounded-lg p-4 overflow-auto">
                {scriptContent ? (
                  <pre className="whitespace-pre-wrap text-[hsl(0,0%,80%)] font-mono text-sm leading-relaxed">
                    {scriptContent}
                  </pre>
                ) : (
                  <p className="text-[hsl(0,0%,45%)] italic">
                    Noch kein Skript hinzugefügt
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Design Links Section */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[hsl(0,0%,95%)]">
                🎨 Design Links
              </h2>
              {isAdmin && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={openNewLink}
                      className="bg-[hsl(var(--workflow-purple))] hover:bg-[hsl(var(--workflow-purple)/0.8)]"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Link
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[hsl(0,0%,8%)] border-[hsl(0,0%,15%)]">
                    <DialogHeader>
                      <DialogTitle className="text-[hsl(0,0%,95%)]">
                        {editingLink ? "Link bearbeiten" : "Neuen Link hinzufügen"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm text-[hsl(0,0%,65%)] mb-1 block">Titel</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="z.B. Canva Design #1"
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
                          placeholder="https://canva.com/..."
                          className="bg-[hsl(0,0%,12%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,95%)]"
                        />
                      </div>
                      <Button
                        onClick={handleSubmitLink}
                        className="w-full bg-[hsl(var(--workflow-purple))] hover:bg-[hsl(var(--workflow-purple)/0.8)]"
                      >
                        {editingLink ? "Speichern" : "Hinzufügen"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="space-y-3 min-h-[400px]">
              {links.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[380px] text-[hsl(0,0%,45%)]">
                  <Link2 className="w-10 h-10 mb-3 opacity-50" />
                  <p>Noch keine Links hinzugefügt</p>
                </div>
              ) : (
                links.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start justify-between p-4 bg-[hsl(0,0%,5%)] rounded-lg hover:bg-[hsl(0,0%,8%)] transition-colors group"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-[hsl(0,0%,12%)] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Link2 className="w-4 h-4 text-[hsl(var(--workflow-purple))]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[hsl(0,0%,95%)] font-medium truncate">{link.title}</h3>
                        {link.description && (
                          <p className="text-[hsl(0,0%,55%)] text-sm truncate">{link.description}</p>
                        )}
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-[hsl(var(--workflow-purple))] hover:text-[hsl(var(--workflow-violet))] transition-colors mt-1"
                        >
                          Öffnen
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditLink(link)}
                          className="p-1.5 rounded-lg hover:bg-[hsl(0,0%,12%)] text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,80%)] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-1.5 rounded-lg hover:bg-[hsl(0,0%,12%)] text-[hsl(0,0%,55%)] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
