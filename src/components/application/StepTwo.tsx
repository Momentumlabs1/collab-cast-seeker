import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ApplicationData } from "@/pages/Index";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

interface StepTwoProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const tools = [
  "After Effects",
  "Premiere Pro",
  "DaVinci Resolve",
  "Final Cut Pro",
  "CapCut",
  "Blender",
  "Cinema 4D",
];

const StepTwo = ({ data, updateData, onNext, onBack }: StepTwoProps) => {
  const toggleTool = (tool: string) => {
    const newTools = data.tools.includes(tool)
      ? data.tools.filter((t) => t !== tool)
      : [...data.tools, tool];
    updateData({ tools: newTools });
  };

  const isValid = data.tools.length > 0 || data.otherTool.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Deine Editing-Tools
        </h2>
        <p className="text-muted-foreground text-lg">
          Mit welcher Software arbeitest du? Wähle alle aus, die zutreffen.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool, index) => (
            <motion.button
              key={tool}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleTool(tool)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                data.tools.includes(tool)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50"
              }`}
            >
              <span className="font-medium">{tool}</span>
              {data.tools.includes(tool) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Andere Tools (optional)
          </label>
          <Input
            placeholder="Weitere Software..."
            value={data.otherTool}
            onChange={(e) => updateData({ otherTool: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Erfahrung & Skills
          </label>
          <Textarea
            placeholder="Erzähl uns kurz von deiner Erfahrung als Editor..."
            value={data.experience}
            onChange={(e) => updateData({ experience: e.target.value })}
            className="min-h-[120px]"
          />
        </div>
      </div>

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
          disabled={!isValid}
        >
          Weiter
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepTwo;
