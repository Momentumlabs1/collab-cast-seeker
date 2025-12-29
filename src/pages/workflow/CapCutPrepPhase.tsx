import { motion } from "framer-motion";
import { Video, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CapCutPrepPhase() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">CapCut Preparation</h1>
        <p className="text-[hsl(0,0%,50%)]">Frame-Sequenz und separate Elemente für CapCut vorbereiten</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-6">
          <Video className="w-8 h-8 text-[hsl(var(--workflow-purple))] mb-4" />
          <h3 className="font-bold text-[hsl(0,0%,88%)] mb-2">Frame Sequence</h3>
          <p className="text-sm text-[hsl(0,0%,50%)] mb-4">Nummerierte Frames (Frame_0001.png, Frame_0002.png...)</p>
          <Button disabled className="w-full" variant="outline">
            <Download className="w-4 h-4 mr-2" />Frames herunterladen
          </Button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-6">
          <Video className="w-8 h-8 text-[hsl(var(--workflow-orange))] mb-4" />
          <h3 className="font-bold text-[hsl(0,0%,88%)] mb-2">Separate Elemente</h3>
          <p className="text-sm text-[hsl(0,0%,50%)] mb-4">Animierte Elemente für CapCut Keyframes</p>
          <Button disabled className="w-full" variant="outline">
            <Download className="w-4 h-4 mr-2" />Elemente herunterladen
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
