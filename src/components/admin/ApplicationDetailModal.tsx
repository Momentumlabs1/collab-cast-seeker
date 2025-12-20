import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Instagram, MessageCircle, MapPin, Calendar, Link as LinkIcon, FileVideo, ExternalLink } from "lucide-react";

interface Application {
  id: string;
  selected_account: string;
  name: string;
  location: string;
  instagram: string | null;
  whatsapp: string | null;
  tools: string[] | null;
  other_tool: string | null;
  experience: string | null;
  portfolio_links: string[] | null;
  file_urls: string[] | null;
  contact_preference: string;
  status: string;
  created_at: string;
}

interface ApplicationDetailModalProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: string, status: string) => void;
  accountNames: Record<string, string>;
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30" },
  accepted: { label: "Accepted", color: "bg-green-500/20 text-green-600 border-green-500/30" },
  rejected: { label: "Rejected", color: "bg-red-500/20 text-red-600 border-red-500/30" },
};

export default function ApplicationDetailModal({
  application,
  open,
  onOpenChange,
  onStatusChange,
  accountNames,
}: ApplicationDetailModalProps) {
  if (!application) return null;

  const statusColor = statusConfig[application.status as keyof typeof statusConfig]?.color || "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{application.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status & Account */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={`${statusColor} border`}>
              {application.status}
            </Badge>
            <Badge variant="outline">
              {accountNames[application.selected_account] || application.selected_account}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium">{application.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Applied</p>
                <p className="font-medium">
                  {new Date(application.created_at).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            {application.instagram && (
              <a
                href={`https://instagram.com/${application.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <Instagram className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Instagram</p>
                  <p className="font-medium">{application.instagram}</p>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </a>
            )}
            {application.whatsapp && (
              <a
                href={`https://wa.me/${application.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">{application.whatsapp}</p>
                </div>
                <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
              </a>
            )}
          </div>

          {/* Preferred Contact */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Preferred Contact</p>
            <Badge variant="secondary">
              {application.contact_preference === "instagram" ? "Instagram" : "WhatsApp"}
            </Badge>
          </div>

          {/* Tools */}
          {application.tools && application.tools.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Tools</p>
              <div className="flex flex-wrap gap-2">
                {application.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
                {application.other_tool && (
                  <Badge variant="outline">{application.other_tool}</Badge>
                )}
              </div>
            </div>
          )}

          {/* Experience */}
          {application.experience && (
            <div>
              <p className="text-sm font-medium mb-2">Experience</p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{application.experience}</p>
              </div>
            </div>
          )}

          {/* Portfolio Links */}
          {application.portfolio_links && application.portfolio_links.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Portfolio Links
              </p>
              <div className="space-y-2">
                {application.portfolio_links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-sm"
                  >
                    <span className="truncate flex-1">{link}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Uploaded Files */}
          {application.file_urls && application.file_urls.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <FileVideo className="h-4 w-4" />
                Uploaded Files
              </p>
              <div className="space-y-2">
                {application.file_urls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-sm"
                  >
                    <FileVideo className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate flex-1">File {index + 1}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Status Change */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium mb-2">Change Status</p>
            <Select
              value={application.status}
              onValueChange={(value) => onStatusChange(application.id, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}