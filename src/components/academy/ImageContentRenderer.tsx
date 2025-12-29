import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ZoomIn, X } from "lucide-react";

interface ImageContentRendererProps {
  sectionId: string;
}

interface ImageContent {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  caption: string | null;
}

export default function ImageContentRenderer({ sectionId }: ImageContentRendererProps) {
  const [content, setContent] = useState<ImageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [sectionId]);

  const fetchContent = async () => {
    try {
      const { data } = await supabase
        .from("image_content")
        .select("*")
        .eq("section_id", sectionId)
        .maybeSingle();

      if (data) setContent(data);
    } catch (error) {
      console.error("Error fetching image content:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="aspect-video bg-[hsl(0,0%,10%)] rounded-lg animate-pulse" />
    );
  }

  if (!content) {
    return (
      <p className="text-[hsl(0,0%,45%)] italic">No image content available.</p>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {content.title && (
          <h4 className="font-medium text-[hsl(0,0%,90%)]">{content.title}</h4>
        )}
        {content.description && (
          <p className="text-sm text-[hsl(0,0%,55%)]">{content.description}</p>
        )}
        
        {/* Image with zoom */}
        <div 
          className="relative group cursor-zoom-in rounded-lg overflow-hidden bg-[hsl(0,0%,8%)]"
          onClick={() => setIsZoomed(true)}
        >
          <img
            src={content.image_url}
            alt={content.title || "Content image"}
            className="w-full h-auto max-h-[500px] object-contain"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white" />
          </div>
        </div>

        {content.caption && (
          <p className="text-sm text-[hsl(0,0%,50%)] italic text-center">
            {content.caption}
          </p>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={content.image_url}
            alt={content.title || "Content image"}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
