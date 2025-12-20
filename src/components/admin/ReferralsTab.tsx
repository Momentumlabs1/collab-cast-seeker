import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, XCircle, DollarSign, Users } from "lucide-react";
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

interface Referral {
  id: string;
  referrer_name: string;
  referrer_contact: string;
  referred_name: string;
  referred_contact: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30" },
  hired: { label: "Hired", icon: CheckCircle2, color: "bg-green-500/20 text-green-600 border-green-500/30" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-500/20 text-red-600 border-red-500/30" },
  paid: { label: "Paid €200", icon: DollarSign, color: "bg-blue-500/20 text-blue-600 border-blue-500/30" },
};

export default function ReferralsTab() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("referrals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Fehler",
        description: "Empfehlungen konnten nicht geladen werden.",
        variant: "destructive",
      });
    } else {
      setReferrals(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("referrals")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Status konnte nicht geändert werden.",
        variant: "destructive",
      });
    } else {
      setReferrals((prev) =>
        prev.map((ref) => (ref.id === id ? { ...ref, status: newStatus } : ref))
      );
      toast({
        title: "Status aktualisiert",
        description: `Empfehlung wurde auf "${newStatus}" gesetzt.`,
      });
    }
  };

  const stats = {
    total: referrals.length,
    pending: referrals.filter((r) => r.status === "pending").length,
    hired: referrals.filter((r) => r.status === "hired").length,
    paid: referrals.filter((r) => r.status === "paid").length,
  };

  return (
    <div className="space-y-6">
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
              <p className="text-2xl font-bold text-foreground">{stats.hired}</p>
              <p className="text-sm text-muted-foreground">Hired</p>
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
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.paid}</p>
              <p className="text-sm text-muted-foreground">€200 Paid</p>
            </div>
          </div>
        </motion.div>
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
            Lädt Empfehlungen...
          </div>
        ) : referrals.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Keine Empfehlungen gefunden.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vermittler</TableHead>
                <TableHead>Vermittler Kontakt</TableHead>
                <TableHead>Empfohlener Editor</TableHead>
                <TableHead>Editor Kontakt</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((ref) => {
                const StatusIcon = statusConfig[ref.status as keyof typeof statusConfig]?.icon || Clock;
                const statusColor = statusConfig[ref.status as keyof typeof statusConfig]?.color || "";

                return (
                  <TableRow key={ref.id}>
                    <TableCell className="font-medium">{ref.referrer_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ref.referrer_contact}</TableCell>
                    <TableCell className="font-medium">{ref.referred_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{ref.referred_contact}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(ref.created_at).toLocaleDateString("de-DE")}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColor} border`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[ref.status as keyof typeof statusConfig]?.label || ref.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        value={ref.status}
                        onValueChange={(value) => updateStatus(ref.id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="paid">Paid €200</SelectItem>
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
    </div>
  );
}