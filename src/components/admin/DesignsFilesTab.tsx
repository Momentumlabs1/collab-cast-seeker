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

export default function DesignsFilesTab() {
  const [links, setLinks] = useState<SharedFile[]>([]);
  const [script, setScript] = useState<SharedFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SharedFile | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", url: "" });
  
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

  const handleSaveScript = async () => {
    try {
      if (script) {
        const { error } = await supabase
          .from("shared_files")
          .update({ content: scriptContent })
          .eq("id", script.id);

        if (error) {
          console.error("Update error:", error);
          toast.error("Failed to save: " + error.message);
          return;
        }
      } else {
        const { data, error } = await supabase.from("shared_files").insert({
          title: "Current Script",
          url: "#",
          content: scriptContent,
          file_type: "script",
        }).select();

        if (error) {
          console.error("Insert error:", error);
          toast.error("Failed to save: " + error.message);
          return;
        }
        console.log("Script created:", data);
      }
      toast.success("Script saved");
      setEditingScript(false);
      await fetchData();
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  const handleSubmitLink = async () => {
    if (!formData.title || !formData.url) {
      toast.error("Title and URL are required");
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
        toast.error("Failed to update");
        return;
      }
      toast.success("Link updated");
    } else {
      const { error } = await supabase.from("shared_files").insert({
        title: formData.title,
        description: formData.description || null,
        url: formData.url,
        file_type: "link",
      });

      if (error) {
        toast.error("Failed to add");
        return;
      }
      toast.success("Link added");
    }

    setFormData({ title: "", description: "", url: "" });
    setEditingLink(null);
    setDialogOpen(false);
    fetchData();
  };

  const handleDeleteLink = async (id: string) => {
    const { error } = await supabase.from("shared_files").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
      return;
    }
    toast.success("Link deleted");
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
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Designs & Files
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Manage script and design links that editors see in the workflow
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Script Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              📝 Current Script
            </h3>
            {!editingScript && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditingScript(true)}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            {editingScript && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingScript(false);
                    setScriptContent(script?.content || "");
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveScript}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            )}
          </div>

          {editingScript ? (
            <Textarea
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
              placeholder="Paste the English script that editors should test..."
              className="min-h-[350px] font-mono text-sm"
            />
          ) : (
            <div className="min-h-[350px] bg-muted rounded-lg p-4 overflow-auto">
              {scriptContent ? (
                <pre className="whitespace-pre-wrap text-foreground font-mono text-sm leading-relaxed">
                  {scriptContent}
                </pre>
              ) : (
                <p className="text-muted-foreground italic">
                  No script added yet. Click Edit to add the script.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Design Links Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              🎨 Design Links
            </h3>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={openNewLink}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingLink ? "Edit Link" : "Add New Link"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Canva Design #1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Description (optional)</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description..."
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">URL</label>
                    <Input
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://canva.com/..."
                    />
                  </div>
                  <Button onClick={handleSubmitLink} className="w-full">
                    {editingLink ? "Save" : "Add"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3 min-h-[350px]">
            {links.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[320px] text-muted-foreground">
                <Link2 className="w-10 h-10 mb-3 opacity-50" />
                <p>No links added yet</p>
              </div>
            ) : (
              links.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Link2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-foreground font-medium truncate">{link.title}</h4>
                      {link.description && (
                        <p className="text-muted-foreground text-sm truncate">{link.description}</p>
                      )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                      >
                        Open
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditLink(link)}
                      className="p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
