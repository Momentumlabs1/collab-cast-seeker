import { motion } from "framer-motion";
import { Users, User, LayoutGrid, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const positioningTypes = [
  {
    id: "side_by_side",
    name: "Side-by-Side",
    description: "Beide Charaktere nebeneinander sichtbar. Ideal für Dialoge.",
    icon: Users,
    preview: (
      <div className="flex items-end justify-center gap-4 h-24">
        <div className="w-10 h-16 bg-green-500/30 rounded-t-full border-2 border-green-500" />
        <div className="w-10 h-14 bg-orange-500/30 rounded-t-full border-2 border-orange-500" />
      </div>
    ),
  },
  {
    id: "closeup",
    name: "Closeup",
    description: "Ein Charakter im Fokus. Für wichtige Erklärungen.",
    icon: User,
    preview: (
      <div className="flex items-end justify-center h-24">
        <div className="w-16 h-20 bg-green-500/30 rounded-t-full border-2 border-green-500" />
      </div>
    ),
  },
  {
    id: "no_characters",
    name: "No Characters",
    description: "Nur Grafiken/Charts. Für Datenvisualisierung.",
    icon: LayoutGrid,
    preview: (
      <div className="flex items-center justify-center gap-3 h-24">
        <div className="w-16 h-12 bg-[hsl(var(--workflow-purple)/0.3)] rounded border-2 border-[hsl(var(--workflow-purple))]" />
        <div className="w-12 h-16 bg-[hsl(var(--workflow-violet)/0.3)] rounded border-2 border-[hsl(var(--workflow-violet))]" />
      </div>
    ),
  },
];

export default function PositioningPhase() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">
          Positioning Setup
        </h1>
        <p className="text-[hsl(0,0%,50%)]">
          Wähle die Charakter-Positionierung für deine Szenen
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
          <h3 className="font-medium text-[hsl(0,0%,88%)] mb-1">Positioning Guidelines</h3>
          <p className="text-sm text-[hsl(0,0%,60%)]">
            Jede Szene sollte 3-7 Sekunden dauern. Wähle die Positionierung basierend auf dem Inhalt 
            der Szene. Dialoge → Side-by-Side, Erklärungen → Closeup, Daten → No Characters.
          </p>
        </div>
      </motion.div>

      {/* Positioning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {positioningTypes.map((type, i) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "bg-[hsl(0,0%,7%)] border-2 border-[hsl(0,0%,13%)] rounded-xl p-5 text-left transition-all",
              "hover:border-[hsl(var(--workflow-purple)/0.5)] hover:bg-[hsl(0,0%,8%)]"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[hsl(0,0%,12%)]">
                <type.icon className="w-5 h-5 text-[hsl(var(--workflow-purple))]" />
              </div>
              <h3 className="font-bold text-[hsl(0,0%,88%)]">{type.name}</h3>
            </div>
            
            <div className="bg-[hsl(0,0%,5%)] rounded-lg mb-4">
              {type.preview}
            </div>
            
            <p className="text-sm text-[hsl(0,0%,55%)]">{type.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Placeholder for scene list */}
      <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-8 text-center">
        <p className="text-[hsl(0,0%,50%)]">
          Wähle zuerst ein Projekt im Dashboard, um Szenen hinzuzufügen.
        </p>
      </div>
    </div>
  );
}
