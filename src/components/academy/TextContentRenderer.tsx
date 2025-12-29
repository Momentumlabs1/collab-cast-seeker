import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TextContentRendererProps {
  sectionId: string;
}

interface TextContent {
  id: string;
  content: string;
}

export default function TextContentRenderer({ sectionId }: TextContentRendererProps) {
  const [content, setContent] = useState<TextContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [sectionId]);

  const fetchContent = async () => {
    try {
      const { data } = await supabase
        .from("text_content")
        .select("*")
        .eq("section_id", sectionId)
        .maybeSingle();

      if (data) setContent(data);
    } catch (error) {
      console.error("Error fetching text content:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-[hsl(0,0%,12%)] rounded w-3/4" />
        <div className="h-4 bg-[hsl(0,0%,12%)] rounded w-1/2" />
        <div className="h-4 bg-[hsl(0,0%,12%)] rounded w-5/6" />
      </div>
    );
  }

  if (!content) {
    return (
      <p className="text-[hsl(0,0%,45%)] italic">No text content available.</p>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h4 key={i} className="text-lg font-semibold text-[hsl(0,0%,90%)] mt-4 mb-2">{line.slice(4)}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={i} className="text-xl font-semibold text-[hsl(0,0%,92%)] mt-5 mb-2">{line.slice(3)}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={i} className="text-2xl font-bold text-[hsl(0,0%,95%)] mt-6 mb-3">{line.slice(2)}</h2>;
      }
      
      // Bold text
      let content: React.ReactNode = line;
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        content = parts.map((part, j) => 
          j % 2 === 1 ? <strong key={j} className="font-semibold text-[hsl(0,0%,95%)]">{part}</strong> : part
        );
      }
      
      // Empty line = paragraph break
      if (line.trim() === '') {
        return <div key={i} className="h-3" />;
      }
      
      // List items
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-[hsl(0,0%,75%)] ml-4 list-disc">
            {line.slice(2)}
          </li>
        );
      }
      
      return <p key={i} className="text-[hsl(0,0%,75%)] leading-relaxed">{content}</p>;
    });
  };

  return (
    <div className="prose prose-invert max-w-none">
      {renderContent(content.content)}
    </div>
  );
}
