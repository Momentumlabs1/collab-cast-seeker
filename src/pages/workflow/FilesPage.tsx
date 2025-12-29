import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink, Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SharedFile {
  id: string;
  title: string;
  description: string | null;
  url: string;
  content: string | null;
  file_type: string;
  created_at: string;
}

export default function FilesPage() {
  const [links, setLinks] = useState<SharedFile[]>([]);
  const [scriptContent, setScriptContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase
      .from("shared_files")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      const scriptItem = data.find(f => f.file_type === "script");
      const linkItems = data.filter(f => f.file_type === "link");
      setScriptContent(scriptItem?.content || "");
      setLinks(linkItems);
    }
    setLoading(false);
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
              Current script and Canva design links
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Script Section */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[hsl(0,0%,95%)]">
                📝 Current Script
              </h2>
            </div>

            <div className="min-h-[400px] bg-[hsl(0,0%,5%)] rounded-lg p-4 overflow-auto">
              {scriptContent ? (
                <pre className="whitespace-pre-wrap text-[hsl(0,0%,80%)] font-mono text-sm leading-relaxed">
                  {scriptContent}
                </pre>
              ) : (
                <p className="text-[hsl(0,0%,45%)] italic">
                  No script added yet
                </p>
              )}
            </div>
          </div>

          {/* Design Links Section */}
          <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[hsl(0,0%,95%)]">
                🎨 Design Links
              </h2>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {links.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[380px] text-[hsl(0,0%,45%)]">
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
                          Open
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
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
