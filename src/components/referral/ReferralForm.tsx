import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Gift, CheckCircle2, Users } from "lucide-react";

interface ReferralFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReferralForm({ open, onOpenChange }: ReferralFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerContact: "",
    referredName: "",
    referredContact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("referrals").insert({
        referrer_name: formData.referrerName,
        referrer_contact: formData.referrerContact,
        referred_name: formData.referredName,
        referred_contact: formData.referredContact,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Empfehlung erfolgreich eingereicht!");
    } catch (error) {
      console.error("Error submitting referral:", error);
      toast.error("Fehler beim Einreichen. Bitte erneut versuchen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        referrerName: "",
        referrerContact: "",
        referredName: "",
        referredContact: "",
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Empfehlung eingereicht!</h3>
            <p className="text-muted-foreground mb-6">
              Wir werden uns bei deinem Kandidaten melden. Wenn er/sie eingestellt wird, bekommst du €200!
            </p>
            <Button onClick={handleClose} variant="outline">
              Schließen
            </Button>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <DialogTitle className="text-xl">Empfehle einen Editor</DialogTitle>
                  <DialogDescription>Verdiene €200 wenn dein Kandidat eingestellt wird</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm">
                  Kennst du einen talentierten Video-Editor? Empfehle ihn/sie und erhalte <span className="font-bold text-foreground">€200 Bonus</span> wenn wir sie einstellen!
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Deine Daten</p>
                <div className="space-y-2">
                  <Label htmlFor="referrerName">Dein Name</Label>
                  <Input
                    id="referrerName"
                    placeholder="Max Mustermann"
                    value={formData.referrerName}
                    onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referrerContact">Dein Instagram oder WhatsApp</Label>
                  <Input
                    id="referrerContact"
                    placeholder="@dein_instagram oder +49..."
                    value={formData.referrerContact}
                    onChange={(e) => setFormData({ ...formData, referrerContact: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Empfohlene Person</p>
                <div className="space-y-2">
                  <Label htmlFor="referredName">Name des Editors</Label>
                  <Input
                    id="referredName"
                    placeholder="Name des Editors"
                    value={formData.referredName}
                    onChange={(e) => setFormData({ ...formData, referredName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referredContact">Instagram oder WhatsApp des Editors</Label>
                  <Input
                    id="referredContact"
                    placeholder="@editor_instagram oder +49..."
                    value={formData.referredContact}
                    onChange={(e) => setFormData({ ...formData, referredContact: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wird eingereicht..." : "Empfehlung einreichen"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}