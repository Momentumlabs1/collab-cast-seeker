import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  Users, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Instagram, 
  MessageCircle,
  MapPin,
  ArrowLeft,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import ApplicationDetailModal from "@/components/admin/ApplicationDetailModal";
import ReferralsTab from "@/components/admin/ReferralsTab";

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

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30" },
  accepted: { label: "Accepted", icon: CheckCircle2, color: "bg-green-500/20 text-green-600 border-green-500/30" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-500/20 text-red-600 border-red-500/30" },
};

const accountNames: Record<string, string> = {
  AGENT_STICK: "AGENT_STICK",
  ATOMIC_BUCK: "ATOMIC BUCK",
  POVYOURAI: "POVYOURAI",
  STRICHABI: "STRICHABI",
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [accountFilter, setAccountFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Fehler",
        description: "Bewerbungen konnten nicht geladen werden.",
        variant: "destructive",
      });
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Status konnte nicht geändert werden.",
        variant: "destructive",
      });
    } else {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedApplication?.id === id) {
        setSelectedApplication((prev) => prev ? { ...prev, status: newStatus } : null);
      }
      toast({
        title: "Status aktualisiert",
        description: `Bewerbung wurde auf "${newStatus}" gesetzt.`,
      });
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesAccount = accountFilter === "all" || app.selected_account === accountFilter;
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesAccount && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Bewerbungen & Empfehlungen verwalten</p>
            </div>
          </div>
          <Button onClick={fetchApplications} variant="outline">
            Aktualisieren
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications" className="gap-2">
              <Users className="h-4 w-4" />
              Bewerbungen
            </TabsTrigger>
            <TabsTrigger value="referrals" className="gap-2">
              <Gift className="h-4 w-4" />
              Empfehlungen (€200)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Users className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Gesamt</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.accepted}</p>
                    <p className="text-sm text-muted-foreground">Accepted</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter:</span>
              </div>
              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Accounts</SelectItem>
                  <SelectItem value="AGENT_STICK">AGENT_STICK</SelectItem>
                  <SelectItem value="ATOMIC_BUCK">ATOMIC BUCK</SelectItem>
                  <SelectItem value="POVYOURAI">POVYOURAI</SelectItem>
                  <SelectItem value="STRICHABI">STRICHABI</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {loading ? (
                <div className="p-12 text-center text-muted-foreground">
                  Lädt Bewerbungen...
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  Keine Bewerbungen gefunden.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Kontakt</TableHead>
                      <TableHead>Tools</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => {
                      const StatusIcon = statusConfig[app.status as keyof typeof statusConfig]?.icon || Clock;
                      const statusColor = statusConfig[app.status as keyof typeof statusConfig]?.color || "";
                      
                      return (
                        <TableRow 
                          key={app.id} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedApplication(app)}
                        >
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {accountNames[app.selected_account] || app.selected_account}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {app.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {app.instagram && (
                                <a
                                  href={`https://instagram.com/${app.instagram.replace("@", "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-foreground transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Instagram className="h-4 w-4" />
                                </a>
                              )}
                              {app.whatsapp && (
                                <a
                                  href={`https://wa.me/${app.whatsapp.replace(/\D/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground hover:text-foreground transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MessageCircle className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {app.tools?.slice(0, 2).map((tool) => (
                                <Badge key={tool} variant="secondary" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                              {app.tools && app.tools.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{app.tools.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(app.created_at).toLocaleDateString("de-DE")}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${statusColor} border`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {app.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Select
                              value={app.status}
                              onValueChange={(value) => {
                                updateStatus(app.id, value);
                              }}
                            >
                              <SelectTrigger 
                                className="w-[130px]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralsTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        application={selectedApplication}
        open={!!selectedApplication}
        onOpenChange={(open) => !open && setSelectedApplication(null)}
        onStatusChange={updateStatus}
        accountNames={accountNames}
      />
    </div>
  );
}