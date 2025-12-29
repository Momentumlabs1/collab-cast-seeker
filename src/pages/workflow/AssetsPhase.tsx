import { motion } from "framer-motion";
import { Image, Upload, User, Shapes, Film, Trash2 } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const assetCategories = [
  { id: "characters", name: "Characters", icon: User, accept: "image/png" },
  { id: "graphics", name: "Graphics & Icons", icon: Shapes, accept: "image/*" },
  { id: "videos", name: "B-Roll Videos", icon: Film, accept: "video/*" },
];

interface UploadedAsset {
  id: string;
  name: string;
  type: string;
  url: string;
}

export default function AssetsPhase() {
  const [activeCategory, setActiveCategory] = useState("characters");
  const [assets, setAssets] = useState<Record<string, UploadedAsset[]>>({
    characters: [],
    graphics: [],
    videos: [],
  });
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // File handling would go here
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[hsl(0,0%,88%)] font-display mb-2">
          Asset Management
        </h1>
        <p className="text-[hsl(0,0%,50%)]">
          Lade Charaktere, Grafiken und B-Roll Videos hoch
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6">
        {assetCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeCategory === cat.id
                ? "bg-gradient-to-r from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))] text-white"
                : "bg-[hsl(0,0%,10%)] text-[hsl(0,0%,60%)] hover:bg-[hsl(0,0%,12%)] hover:text-[hsl(0,0%,80%)]"
            )}
          >
            <cat.icon className="w-4 h-4" />
            {cat.name}
            <span className="px-1.5 py-0.5 rounded bg-black/20 text-xs">
              {assets[cat.id]?.length || 0}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "bg-[hsl(0,0%,7%)] border-2 border-dashed rounded-xl p-12 text-center transition-all",
              dragOver
                ? "border-[hsl(var(--workflow-purple))] bg-[hsl(var(--workflow-purple)/0.05)]"
                : "border-[hsl(0,0%,18%)] hover:border-[hsl(0,0%,25%)]"
            )}
          >
            <div className="w-16 h-16 bg-[hsl(0,0%,12%)] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-[hsl(var(--workflow-purple))]" />
            </div>
            <h3 className="text-lg font-medium text-[hsl(0,0%,80%)] mb-2">
              Dateien hier ablegen
            </h3>
            <p className="text-sm text-[hsl(0,0%,50%)] mb-4">
              oder klicken zum Auswählen
            </p>
            <input
              type="file"
              className="hidden"
              accept={assetCategories.find(c => c.id === activeCategory)?.accept}
              multiple
            />
            <button className="px-4 py-2 bg-[hsl(0,0%,15%)] hover:bg-[hsl(0,0%,20%)] text-[hsl(0,0%,70%)] rounded-lg text-sm transition-colors">
              Dateien auswählen
            </button>
          </div>

          {/* Asset Grid */}
          {assets[activeCategory]?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {assets[activeCategory].map((asset) => (
                <div
                  key={asset.id}
                  className="group relative bg-[hsl(0,0%,10%)] rounded-xl overflow-hidden aspect-square"
                >
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors">
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs text-white truncate">{asset.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[hsl(0,0%,45%)]">
              Noch keine {assetCategories.find(c => c.id === activeCategory)?.name} hochgeladen
            </div>
          )}
        </motion.div>

        {/* Character Presets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-xl p-5"
        >
          <h3 className="font-bold text-[hsl(0,0%,88%)] mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[hsl(var(--workflow-purple))]" />
            Charakter Slots
          </h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-[hsl(0,0%,88%)]">Bob</p>
                  <p className="text-xs text-[hsl(0,0%,50%)]">Grüner Charakter</p>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm transition-colors">
                PNG hochladen
              </button>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-[hsl(0,0%,88%)]">Strich-Abi</p>
                  <p className="text-xs text-[hsl(0,0%,50%)]">Oranger Charakter</p>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg text-sm transition-colors">
                PNG hochladen
              </button>
            </div>
          </div>
          
          <p className="text-xs text-[hsl(0,0%,40%)] mt-4">
            PNG mit transparentem Hintergrund erforderlich
          </p>
        </motion.div>
      </div>
    </div>
  );
}
