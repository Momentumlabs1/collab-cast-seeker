import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Star, Trophy, Users } from "lucide-react";

interface AccountSelectionProps {
  selectedAccount: string;
  onSelect: (account: string) => void;
  onNext: () => void;
}

const accounts = [
  {
    id: "agent_stick",
    name: "AGENT_STICK",
    handle: "@agent_stick",
    tag: "Start Here",
    tagColor: "bg-emerald-500",
    description: "Entry-level position. Learn our style, prove yourself.",
    platforms: "Instagram & TikTok",
    icon: Rocket,
  },
  {
    id: "atomic_buck",
    name: "ATOMIC BUCK",
    handle: "@atomicbuck",
    tag: "Advanced",
    tagColor: "bg-blue-500",
    description: "Complex animations and VFX. For experienced editors.",
    platforms: "Instagram",
    icon: Star,
  },
  {
    id: "povyourai",
    name: "POVYOURAI",
    handle: "@povyourai",
    tag: "Creative",
    tagColor: "bg-purple-500",
    description: "AI-themed content with unique storytelling.",
    platforms: "Instagram",
    icon: Users,
  },
  {
    id: "strichabi",
    name: "STRICHABI",
    handle: "@strichabi",
    tag: "Elite",
    tagColor: "bg-amber-500",
    description: "Top performer position. Highest pay & profit sharing.",
    platforms: "Instagram",
    icon: Trophy,
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
          🎯 Choose Your Path
        </p>
        <p className="text-background/80 text-sm">
          Each account has different requirements and pay. Start with Agent Stick if you're new!
        </p>
      </motion.div>

      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Which account do you want to edit for?
        </h2>
        <p className="text-muted-foreground text-lg">
          Select the account that matches your skill level.
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
          <span className="font-semibold text-foreground">Pro tip:</span> Start with Agent Stick to get trained for free. Best performers move up to higher-paying accounts!
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
