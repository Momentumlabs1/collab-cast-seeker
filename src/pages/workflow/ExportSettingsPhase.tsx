import { motion } from "framer-motion";
import { Settings2, Info } from "lucide-react";

export default function ExportSettingsPhase() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">Export Settings</h1>
        <p className="text-[hsl(0,0%,50%)]">Bild-für-Bild vs. Separate Pages konfigurieren</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[hsl(var(--workflow-purple)/0.1)] border border-[hsl(var(--workflow-purple)/0.3)] rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-[hsl(var(--workflow-purple))] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-[hsl(0,0%,88%)] mb-1">Export-Typen</h3>
          <p className="text-sm text-[hsl(0,0%,60%)]"><strong>Bild-für-Bild:</strong> Alle Frames auf einer Canva-Seite. Für Character-Bewegungen.<br/><strong>Separate Page:</strong> Ein Element pro Seite als PNG. Für fliegende Objekte/CapCut Keyframes.</p>
        </div>
      </motion.div>
      <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-8 text-center">
        <Settings2 className="w-12 h-12 text-[hsl(0,0%,30%)] mx-auto mb-4" />
        <p className="text-[hsl(0,0%,50%)]">Wähle zuerst ein Projekt, um Export-Settings zu konfigurieren.</p>
      </div>
    </div>
  );
}
