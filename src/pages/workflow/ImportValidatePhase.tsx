import { motion } from "framer-motion";
import { Upload, CheckCircle2 } from "lucide-react";

export default function ImportValidatePhase() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">Import & Validate</h1>
        <p className="text-[hsl(0,0%,50%)]">Lade exportierte Canva ZIPs hoch und validiere die Frames</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[hsl(0,0%,7%)] border-2 border-dashed border-[hsl(0,0%,18%)] rounded-xl p-12 text-center">
        <Upload className="w-12 h-12 text-[hsl(0,0%,40%)] mx-auto mb-4" />
        <h3 className="text-lg font-medium text-[hsl(0,0%,70%)] mb-2">Canva Export ZIP hochladen</h3>
        <p className="text-sm text-[hsl(0,0%,45%)]">Das System validiert automatisch: Anzahl, Benennung, Auflösung</p>
      </motion.div>
    </div>
  );
}
