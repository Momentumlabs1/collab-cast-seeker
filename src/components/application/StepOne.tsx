import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApplicationData } from "@/pages/Application";
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
      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-foreground text-background rounded-xl p-5 mb-8"
      >
        <p className="font-display font-bold text-xl mb-1">
          💰 $1,000 / month
        </p>
        <p className="text-background/80 text-sm">
          Once your first video goes live. Free training phase – prove yourself, best performer gets the job!
        </p>
      </motion.div>

      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground text-lg">
          We're looking for talented editors to join our team. Let us know who you are.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Name
          </label>
          <Input
            placeholder="Your full name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Where are you from?
          </label>
          <Input
            placeholder="City, Country"
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
            placeholder="@yourname"
            value={data.instagram}
            onChange={(e) => updateData({ instagram: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            WhatsApp Number (optional)
          </label>
          <Input
            placeholder="+1 234 567890"
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
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepOne;