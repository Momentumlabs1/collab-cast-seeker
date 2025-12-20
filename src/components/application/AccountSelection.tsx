import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Star, Users } from "lucide-react";

interface AccountSelectionProps {
  selectedAccount: string;
  onSelect: (account: string) => void;
  onNext: () => void;
}

const accounts = [
  {
    id: "agent_stick",
    name: "AGENT_STICK → STRICHABI",
    handle: "@agent_stick",
    tag: "Karriere-Pfad",
    tagColor: "bg-emerald-500",
    description: "Starte bei Agent Stick, werde trainiert und steige zu Strichabi auf. Höchste Bezahlung & Gewinnbeteiligung.",
    platforms: "Instagram & TikTok",
    icon: Rocket,
  },
  {
    id: "povyourai",
    name: "POVYOURAI",
    handle: "@povyourai",
    tag: "KI-Content",
    tagColor: "bg-purple-500",
    description: "Eigenständiger Account für KI-themed Content mit einzigartigem Storytelling.",
    platforms: "Instagram",
    icon: Users,
  },
  {
    id: "atomic_buck",
    name: "ATOMIC BUCK",
    handle: "@atomicbuck",
    tag: "Kreativ-Projekt",
    tagColor: "bg-blue-500",
    description: "Inaktiver Account – bring deine eigenen Ideen mit und erwecke ihn zum Leben!",
    platforms: "Instagram",
    icon: Star,
  },
];

const AccountSelection = ({ selectedAccount, onSelect, onNext }: AccountSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-foreground text-background rounded-xl p-5 mb-8"
      >
        <p className="font-display font-bold text-xl mb-1">
          🎯 Wähle deinen Pfad
        </p>
        <p className="text-background/80 text-sm">
          3 verschiedene Wege – jeder mit eigenen Möglichkeiten und Anforderungen.
        </p>
      </motion.div>

      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Für welchen Account möchtest du arbeiten?
        </h2>
        <p className="text-muted-foreground text-lg">
          Wähle den Pfad, der am besten zu dir passt.
        </p>
      </div>

      <div className="space-y-4">
        {accounts.map((account, index) => {
          const Icon = account.icon;
          return (
            <motion.button
              key={account.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(account.id)}
              className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                selectedAccount === account.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedAccount === account.id
                      ? "bg-background/20"
                      : "bg-muted"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-display font-bold text-lg">{account.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${account.tagColor}`}
                    >
                      {account.tag}
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-2 ${
                      selectedAccount === account.id
                        ? "text-background/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {account.description}
                  </p>
                  <p
                    className={`text-xs ${
                      selectedAccount === account.id
                        ? "text-background/60"
                        : "text-muted-foreground/70"
                    }`}
                  >
                    {account.platforms}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Career Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-muted rounded-xl border border-border"
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Tipp:</span> Bei Agent Stick wirst du kostenlos trainiert und kannst zu Strichabi aufsteigen!
        </p>
      </motion.div>

      <div className="mt-10">
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          onClick={onNext}
          disabled={!selectedAccount}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default AccountSelection;
