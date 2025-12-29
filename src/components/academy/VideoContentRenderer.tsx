import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Play, Maximize2 } from "lucide-react";

interface VideoContentRendererProps {
  sectionId: string;
}

interface VideoContent {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  duration_seconds: number | null;
  thumbnail_url: string | null;
}

export default function VideoContentRenderer({ sectionId }: VideoContentRendererProps) {
  const [content, setContent] = useState<VideoContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [sectionId]);

  const fetchContent = async () => {
    try {
      const { data } = await supabase
        .from("video_content")
        .select("*")
        .eq("section_id", sectionId)
        .maybeSingle();

      if (data) setContent(data);
    } catch (error) {
      console.error("Error fetching video content:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isYouTube = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (loading) {
    return (
      <div className="aspect-video bg-[hsl(0,0%,10%)] rounded-lg animate-pulse flex items-center justify-center">
        <Play className="w-12 h-12 text-[hsl(0,0%,25%)]" />
      </div>
    );
  }

  if (!content) {
    return (
      <p className="text-[hsl(0,0%,45%)] italic">No video content available.</p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative aspect-video bg-[hsl(0,0%,8%)] rounded-lg overflow-hidden">
        {isYouTube(content.video_url) ? (
          <iframe
            src={getYouTubeEmbedUrl(content.video_url)}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={content.video_url}
            controls
            className="absolute inset-0 w-full h-full"
            poster={content.thumbnail_url || undefined}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Video Info */}
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-[hsl(0,0%,90%)]">{content.title}</h4>
          {content.description && (
            <p className="text-sm text-[hsl(0,0%,55%)] mt-1">{content.description}</p>
          )}
        </div>
        {content.duration_seconds && (
          <span className="text-sm text-[hsl(0,0%,50%)]">
            {formatDuration(content.duration_seconds)}
          </span>
        )}
      </div>

      {/* Playback Speed (for HTML5 video only) */}
      {!isYouTube(content.video_url) && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-[hsl(0,0%,50%)]">Speed:</span>
          {[0.5, 1, 1.5, 2].map((speed) => (
            <button
              key={speed}
              onClick={() => {
                setPlaybackSpeed(speed);
                const video = document.querySelector('video');
                if (video) video.playbackRate = speed;
              }}
              className={`px-2 py-1 text-xs rounded ${
                playbackSpeed === speed
                  ? "bg-[hsl(var(--workflow-purple))] text-white"
                  : "bg-[hsl(0,0%,12%)] text-[hsl(0,0%,60%)] hover:bg-[hsl(0,0%,15%)]"
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
