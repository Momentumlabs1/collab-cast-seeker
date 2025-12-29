import { motion } from "framer-motion";
import { Frame, ArrowRight, Plus, Info, Lightbulb } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function FramePlanningPhase() {
  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">
          Frame Planning
        </h1>
        <p className="text-[hsl(0,0%,50%)]">
          End-Frame-First Methodik: Visualisiere zuerst das Endergebnis
        </p>
      </div>

      {/* Method Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[hsl(var(--workflow-orange)/0.1)] border border-[hsl(var(--workflow-orange)/0.3)] rounded-xl p-4 mb-8 flex items-start gap-3"
      >
        <Lightbulb className="w-5 h-5 text-[hsl(var(--workflow-orange))] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-[hsl(0,0%,88%)] mb-1">End-Frame-First Methodik</h3>
          <p className="text-sm text-[hsl(0,0%,60%)]">
            Starte immer mit dem Endergebnis. Wie soll die Szene am Ende aussehen? 
            Dann arbeite rückwärts zum Startpunkt. Das verhindert Design-Chaos und sorgt für klare Animationen.
          </p>
        </div>
      </motion.div>

      {/* Frame Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* End Frame */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[hsl(var(--workflow-green)/0.2)]">
              <Frame className="w-5 h-5 text-[hsl(var(--workflow-green))]" />
            </div>
            <div>
              <h3 className="font-bold text-[hsl(0,0%,88%)]">End Frame</h3>
              <p className="text-xs text-[hsl(0,0%,50%)]">Wie soll es am Ende aussehen?</p>
            </div>
          </div>
          
          {/* 9:16 Preview Box */}
          <div className="aspect-[9/16] bg-[hsl(0,0%,5%)] rounded-xl border-2 border-dashed border-[hsl(0,0%,18%)] flex items-center justify-center mb-4">
            <div className="text-center text-[hsl(0,0%,40%)]">
              <Frame className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Bild hochladen oder beschreiben</p>
            </div>
          </div>
          
          <Textarea
            placeholder="Beschreibe das Endergebnis: Welche Elemente sind sichtbar? Wo stehen die Charaktere? Welche Verbindungen/Pfeile gibt es?"
            className="bg-[hsl(0,0%,5%)] border-[hsl(0,0%,15%)] text-[hsl(0,0%,88%)] min-h-[100px] placeholder:text-[hsl(0,0%,35%)]"
          />
        </motion.div>

        {/* Start Frame */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[hsl(0,0%,15%)]">
              <Frame className="w-5 h-5 text-[hsl(0,0%,60%)]" />
            </div>
            <div>
              <h3 className="font-bold text-[hsl(0,0%,88%)]">Start Frame</h3>
              <p className="text-xs text-[hsl(0,0%,50%)]">Ausgangszustand der Szene</p>
            </div>
          </div>
          
          {/* 9:16 Preview Box */}
          <div className="aspect-[9/16] bg-[hsl(0,0%,5%)] rounded-xl border-2 border-dashed border-[hsl(0,0%,18%)] flex items-center justify-center mb-4">
            <div className="text-center text-[hsl(0,0%,40%)]">
              <Frame className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Bild hochladen oder beschreiben</p>
            </div>
          </div>
          
          <Textarea
            placeholder="Beschreibe den Startzustand: Was ist am Anfang zu sehen? Leerer Bildschirm? Nur Charaktere?"
            className="bg-[hsl(0,0%,5%)] border-[hsl(0,0%,15%)] text-[hsl(0,0%,88%)] min-h-[100px] placeholder:text-[hsl(0,0%,35%)]"
          />
        </motion.div>
      </div>

      {/* Steps Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[hsl(0,0%,88%)] flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-[hsl(var(--workflow-purple))]" />
            Zwischenschritte
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="border-[hsl(0,0%,20%)] text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,12%)]"
          >
            <Plus className="w-4 h-4 mr-1" />
            Schritt hinzufügen
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-[hsl(0,0%,5%)] rounded-xl border border-[hsl(0,0%,12%)]">
            <div className="w-8 h-8 bg-[hsl(var(--workflow-purple)/0.2)] rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-[hsl(var(--workflow-purple))]">1</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Was passiert in diesem Schritt?"
                className="w-full bg-transparent border-none text-[hsl(0,0%,88%)] placeholder:text-[hsl(0,0%,40%)] focus:outline-none"
              />
              <div className="flex gap-4 mt-2 text-xs text-[hsl(0,0%,45%)]">
                <span>Geschätzte Slides: —</span>
                <span>Assets: —</span>
              </div>
            </div>
          </div>
          
          <div className="text-center py-8 text-[hsl(0,0%,40%)]">
            Füge Zwischenschritte hinzu, um vom Start- zum End-Frame zu gelangen
          </div>
        </div>
      </motion.div>
    </div>
  );
}
