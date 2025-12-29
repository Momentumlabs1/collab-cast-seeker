import { motion } from "framer-motion";
import { CheckCircle2, Circle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const checklistItems = [
  { id: 1, label: "Alle Wörter haben Animationen", done: false },
  { id: 2, label: "Alle Assets hochgeladen", done: false },
  { id: 3, label: "Alle Canva Designs exportiert", done: false },
  { id: 4, label: "Frame-Validierung bestanden", done: false },
  { id: 5, label: "Audio synchronisiert", done: false },
  { id: 6, label: "Captions vorbereitet", done: false },
];

export default function FinalChecklistPhase() {
  const completedCount = checklistItems.filter(i => i.done).length;
  
  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">Final Checklist</h1>
        <p className="text-[hsl(0,0%,50%)]">{completedCount}/{checklistItems.length} abgeschlossen</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl divide-y divide-[hsl(0,0%,12%)]">
        {checklistItems.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={cn("flex items-center gap-4 p-4", item.done && "bg-[hsl(var(--workflow-green)/0.05)]")}>
            {item.done ? <CheckCircle2 className="w-5 h-5 text-[hsl(var(--workflow-green))]" /> : <Circle className="w-5 h-5 text-[hsl(0,0%,30%)]" />}
            <span className={cn("text-[hsl(0,0%,70%)]", item.done && "text-[hsl(0,0%,88%)]")}>{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
      <Button disabled className="w-full mt-6 bg-gradient-to-r from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))]">
        <Download className="w-4 h-4 mr-2" />Projekt-Archiv herunterladen
      </Button>
    </div>
  );
}
