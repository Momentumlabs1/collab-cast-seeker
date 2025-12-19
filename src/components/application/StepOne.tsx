import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApplicationData } from "@/pages/Index";
import { ArrowRight, MapPin, User, Instagram, Phone } from "lucide-react";

interface StepOneProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
}

const StepOne = ({ data, updateData, onNext }: StepOneProps) => {
  const isValid = data.name.trim() && data.location.trim() && (data.instagram.trim() || data.whatsapp.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Info Banner - Top Positioned */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-foreground text-background rounded-xl p-5 mb-8"
      >
        <p className="font-display font-bold text-xl mb-1">
          💰 1.000€ / Monat
        </p>
        <p className="text-background/80 text-sm">
          Sobald dein erstes Video live geht. Teaching-Phase kostenlos – mehrere Runden, wir nehmen nur die Besten!
        </p>
      </motion.div>

      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Erzähl uns von dir
        </h2>
        <p className="text-muted-foreground text-lg">
          Wir suchen talentierte Editoren für unser Team. Lass uns wissen, wer du bist.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Name
          </label>
          <Input
            placeholder="Dein vollständiger Name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Woher kommst du?
          </label>
          <Input
            placeholder="Stadt, Land"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Instagram Handle
          </label>
          <Input
            placeholder="@deinname"
            value={data.instagram}
            onChange={(e) => updateData({ instagram: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            WhatsApp Nummer (optional)
          </label>
          <Input
            placeholder="+49 123 456789"
            value={data.whatsapp}
            onChange={(e) => updateData({ whatsapp: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-10">
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          onClick={onNext}
          disabled={!isValid}
        >
          Weiter
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepOne;
