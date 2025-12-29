import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileText, File, FileArchive, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadContentRendererProps {
  sectionId: string;
}

interface DownloadContent {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string | null;
  file_size_mb: number | null;
}

export default function DownloadContentRenderer({ sectionId }: DownloadContentRendererProps) {
  const [content, setContent] = useState<DownloadContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [sectionId]);

  const fetchContent = async () => {
    try {
      const { data } = await supabase
        .from("downloadable_resources")
        .select("*")
        .eq("section_id", sectionId)
        .maybeSingle();

      if (data) setContent(data);
    } catch (error) {
      console.error("Error fetching download content:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (fileType: string | null) => {
    if (!fileType) return File;
    if (fileType.includes('pdf')) return FileText;
    if (fileType.includes('zip') || fileType.includes('rar')) return FileArchive;
    if (fileType.includes('image') || fileType.includes('png') || fileType.includes('jpg')) return FileImage;
    return File;
  };

  const handleDownload = () => {
    if (!content) return;
    window.open(content.file_url, '_blank');
  };

  if (loading) {
    return (
      <div className="p-4 rounded-lg bg-[hsl(0,0%,8%)] animate-pulse">
        <div className="h-5 bg-[hsl(0,0%,12%)] rounded w-1/3 mb-2" />
        <div className="h-4 bg-[hsl(0,0%,12%)] rounded w-2/3" />
      </div>
    );
  }

  if (!content) {
    return (
      <p className="text-[hsl(0,0%,45%)] italic">No download available.</p>
    );
  }

  const FileIcon = getFileIcon(content.file_type);

  return (
    <div className="p-4 rounded-lg bg-[hsl(0,0%,8%)] border border-[hsl(0,0%,15%)] flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-[hsl(var(--workflow-purple)/0.1)] flex items-center justify-center shrink-0">
        <FileIcon className="w-6 h-6 text-[hsl(var(--workflow-purple))]" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[hsl(0,0%,90%)] truncate">{content.title}</h4>
        {content.description && (
          <p className="text-sm text-[hsl(0,0%,55%)] line-clamp-2">{content.description}</p>
        )}
        <div className="flex items-center gap-2 mt-1 text-xs text-[hsl(0,0%,45%)]">
          {content.file_type && <span className="uppercase">{content.file_type}</span>}
          {content.file_size_mb && <span>• {content.file_size_mb.toFixed(1)} MB</span>}
        </div>
      </div>

      <Button
        onClick={handleDownload}
        variant="outline"
        size="sm"
        className="gap-2 border-[hsl(var(--workflow-purple)/0.3)] text-[hsl(var(--workflow-purple))] hover:bg-[hsl(var(--workflow-purple)/0.1)]"
      >
        <Download className="w-4 h-4" />
        Download
      </Button>
    </div>
  );
}
