import { motion } from "framer-motion";
import { Palette, Plus, ExternalLink, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const mockDesigns = [
  { id: 1, slideCount: 87, maxSlides: 150, url: "" },
  { id: 2, slideCount: 45, maxSlides: 150, url: "" },
];

export default function CanvaDesignsPhase() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">
          Canva Design Management
        </h1>
        <p className="text-[hsl(0,0%,50%)]">
          Tracke deine Canva-Designs und Slide-Kapazitäten
        </p>
      </div>

      {/* Warning Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[hsl(var(--workflow-orange)/0.1)] border border-[hsl(var(--workflow-orange)/0.3)] rounded-xl p-4 mb-8 flex items-start gap-3"
      >
        <AlertTriangle className="w-5 h-5 text-[hsl(var(--workflow-orange))] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-[hsl(0,0%,88%)] mb-1">150 Slides Maximum</h3>
          <p className="text-sm text-[hsl(0,0%,60%)]">
            Canva wird bei mehr als 150 Slides langsam. Starte ein neues Design, bevor du 100 Slides erreichst, 
            um genug Puffer zu haben.
          </p>
        </div>
      </motion.div>

      {/* Designs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {mockDesigns.map((design, i) => {
          const percentage = (design.slideCount / design.maxSlides) * 100;
          const isWarning = percentage >= 66;
          const isDanger = percentage >= 85;
          
          return (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "bg-[hsl(0,0%,7%)] border rounded-xl p-5",
                isDanger
                  ? "border-red-500/50"
                  : isWarning
                  ? "border-[hsl(var(--workflow-orange)/0.5)]"
                  : "border-[hsl(0,0%,13%)]"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isDanger
                      ? "bg-red-500/20"
                      : isWarning
                      ? "bg-[hsl(var(--workflow-orange)/0.2)]"
                      : "bg-[hsl(var(--workflow-purple)/0.2)]"
                  )}>
                    <Palette className={cn(
                      "w-5 h-5",
                      isDanger
                        ? "text-red-500"
                        : isWarning
                        ? "text-[hsl(var(--workflow-orange))]"
                        : "text-[hsl(var(--workflow-purple))]"
                    )} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[hsl(0,0%,88%)]">Design #{design.id}</h3>
                    <p className="text-xs text-[hsl(0,0%,50%)]">
                      {design.slideCount} / {design.maxSlides} Slides
                    </p>
                  </div>
                </div>
                {isDanger && (
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                    Fast voll!
                  </span>
                )}
              </div>
              
              <Progress
                value={percentage}
                className={cn(
                  "h-2 mb-4",
                  isDanger
                    ? "[&>div]:bg-red-500"
                    : isWarning
                    ? "[&>div]:bg-[hsl(var(--workflow-orange))]"
                    : "[&>div]:bg-[hsl(var(--workflow-purple))]"
                )}
              />
              
              <div className="flex gap-2">
                <Input
                  placeholder="Canva URL einfügen..."
                  className="bg-[hsl(0,0%,5%)] border-[hsl(0,0%,15%)] text-[hsl(0,0%,80%)] text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[hsl(0,0%,20%)] hover:bg-[hsl(0,0%,12%)]"
                  disabled={!design.url}
                >
                  <ExternalLink className="w-4 h-4 text-[hsl(0,0%,60%)]" />
                </Button>
              </div>
            </motion.div>
          );
        })}

        {/* Add New Design */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[hsl(0,0%,7%)] border-2 border-dashed border-[hsl(0,0%,18%)] rounded-xl p-8 text-center hover:border-[hsl(var(--workflow-purple)/0.5)] transition-colors"
        >
          <div className="w-12 h-12 bg-[hsl(0,0%,12%)] rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-[hsl(0,0%,50%)]" />
          </div>
          <p className="text-[hsl(0,0%,60%)] font-medium">Neues Design hinzufügen</p>
          <p className="text-xs text-[hsl(0,0%,40%)] mt-1">Design #3</p>
        </motion.button>
      </div>

      {/* Page Naming Convention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5"
      >
        <h3 className="font-bold text-[hsl(0,0%,88%)] mb-4">Page Naming Convention</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "Scene_01_Frame_001", desc: "Frames für Szene 1" },
            { name: "Scene_01_Element_Bank", desc: "Separate Element-Page" },
            { name: "Scene_02_Frame_047", desc: "Frame 47 von Szene 2" },
            { name: "Element_Geldsack", desc: "Animiertes Element" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-[hsl(0,0%,5%)] rounded-lg"
            >
              <Check className="w-4 h-4 text-[hsl(var(--workflow-green))]" />
              <div>
                <code className="text-sm text-[hsl(var(--workflow-purple))]">{item.name}</code>
                <p className="text-xs text-[hsl(0,0%,45%)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
