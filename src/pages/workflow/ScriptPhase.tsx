import { motion } from "framer-motion";
import { FileText, Info, Check, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ScriptPhase() {
  const [script, setScript] = useState("");
  const words = script.trim().split(/\s+/).filter(w => w.length > 0);

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">
          Script & Word Mapping
        </h1>
        <p className="text-[hsl(0,0%,50%)]">
          Gib dein Skript ein und weise jedem Wort Animationen zu
        </p>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[hsl(var(--workflow-purple)/0.1)] border border-[hsl(var(--workflow-purple)/0.3)] rounded-xl p-4 mb-8 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-[hsl(var(--workflow-purple))] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-[hsl(0,0%,88%)] mb-1">Word-Level Animation Tracking</h3>
          <p className="text-sm text-[hsl(0,0%,60%)]">
            Dies ist die wichtigste Funktion. Jedes Wort bekommt einen Slide-Bereich zugewiesen.
            Markiere Wörter, die eine Animation benötigen (Charakter bewegt sich, Objekt erscheint, etc.).
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Script Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[hsl(0,0%,12%)]">
                <FileText className="w-5 h-5 text-[hsl(var(--workflow-purple))]" />
              </div>
              <h3 className="font-bold text-[hsl(0,0%,88%)]">Skript eingeben</h3>
            </div>
            <span className="text-sm text-[hsl(0,0%,50%)]">{words.length} Wörter</span>
          </div>
          
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Gib hier dein Skript ein... z.B. 'Die Banken kreieren neues Geld über die Drucker...'"
            className="bg-[hsl(0,0%,5%)] border-[hsl(0,0%,15%)] text-[hsl(0,0%,88%)] min-h-[300px] placeholder:text-[hsl(0,0%,35%)]"
          />
          
          <div className="flex items-center gap-4 mt-4 text-sm text-[hsl(0,0%,50%)]">
            <span>~{Math.ceil(words.length / 2.5)}s bei 2.5 WPS</span>
            <span>~{Math.ceil(words.length * 3)} Frames geschätzt</span>
          </div>
        </motion.div>

        {/* Word Mapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[hsl(0,0%,12%)]">
                <Sparkles className="w-5 h-5 text-[hsl(var(--workflow-orange))]" />
              </div>
              <h3 className="font-bold text-[hsl(0,0%,88%)]">Word Mapper</h3>
            </div>
            {words.length > 0 && (
              <span className="text-sm text-[hsl(var(--workflow-green))]">
                <Check className="w-4 h-4 inline mr-1" />
                0/{words.length} animiert
              </span>
            )}
          </div>
          
          {words.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-[hsl(0,0%,45%)]">
              Gib ein Skript ein, um die Wörter zu sehen
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-[350px] overflow-y-auto p-2">
              {words.map((word, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    "bg-[hsl(0,0%,12%)] text-[hsl(0,0%,70%)] border border-[hsl(0,0%,18%)]",
                    "hover:border-[hsl(var(--workflow-purple))] hover:text-[hsl(0,0%,90%)]"
                  )}
                >
                  <span>{word}</span>
                  <X className="w-3 h-3 inline ml-1 opacity-40" />
                </motion.button>
              ))}
            </div>
          )}
          
          {words.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[hsl(0,0%,15%)]">
              <p className="text-xs text-[hsl(0,0%,45%)]">
                Klicke auf ein Wort, um Animation-Details hinzuzufügen.
                Wörter mit Animation werden grün markiert.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
