import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ApplicationData } from "@/pages/Index";
import { ArrowLeft, Send, Instagram, MessageCircle } from "lucide-react";

interface StepFourProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepFour = ({ data, updateData, onNext, onBack }: StepFourProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Fast fertig!
        </h2>
        <p className="text-muted-foreground text-lg">
          Wie sollen wir dich kontaktieren?
        </p>
      </div>

      <div className="space-y-4">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => updateData({ contactPreference: "instagram" })}
          className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
            data.contactPreference === "instagram"
              ? "border-foreground bg-foreground text-background"
              : "border-border hover:border-foreground/50"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              data.contactPreference === "instagram"
                ? "bg-background/20"
                : "bg-muted"
            }`}
          >
            <Instagram className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display font-semibold text-lg">Instagram DM</p>
            <p
              className={`text-sm ${
                data.contactPreference === "instagram"
                  ? "text-background/70"
                  : "text-muted-foreground"
              }`}
            >
              {data.instagram || "Wir schreiben dir auf Instagram"}
            </p>
          </div>
        </motion.button>

        {data.whatsapp && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => updateData({ contactPreference: "whatsapp" })}
            className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
              data.contactPreference === "whatsapp"
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:border-foreground/50"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                data.contactPreference === "whatsapp"
                  ? "bg-background/20"
                  : "bg-muted"
              }`}
            >
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display font-semibold text-lg">WhatsApp</p>
              <p
                className={`text-sm ${
                  data.contactPreference === "whatsapp"
                    ? "text-background/70"
                    : "text-muted-foreground"
                }`}
              >
                {data.whatsapp}
              </p>
            </div>
          </motion.button>
        )}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-muted rounded-xl border-2 border-border"
      >
        <h3 className="font-display font-semibold mb-4">Zusammenfassung</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location</span>
            <span className="font-medium">{data.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tools</span>
            <span className="font-medium text-right max-w-[200px]">
              {data.tools.join(", ") || data.otherTool}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Portfolio</span>
            <span className="font-medium">
              {data.portfolioLinks.filter((l) => l.trim()).length} Links,{" "}
              {data.uploadedFiles.length} Dateien
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 flex gap-4">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Zurück
        </Button>
        <Button
          variant="hero"
          size="xl"
          className="flex-[2]"
          onClick={onNext}
        >
          Bewerbung absenden
          <Send className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepFour;
