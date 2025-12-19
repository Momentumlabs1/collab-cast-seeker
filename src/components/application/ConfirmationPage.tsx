import { motion } from "framer-motion";
import { ApplicationData } from "@/pages/Application";
import { CheckCircle2, Instagram, MessageCircle, Sparkles } from "lucide-react";

interface ConfirmationPageProps {
  data: ApplicationData;
}

const accountNames: Record<string, string> = {
  agent_stick: "AGENT_STICK",
  atomic_buck: "ATOMIC BUCK",
  povyourai: "POVYOURAI",
  strichabi: "STRICHABI",
};

const ConfirmationPage = ({ data }: ConfirmationPageProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="w-24 h-24 bg-foreground rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-background" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4"
        >
          Application Received!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-lg mb-8"
        >
          Thanks for your interest, {data.name.split(" ")[0]}! You applied for{" "}
          <span className="font-semibold text-foreground">{accountNames[data.selectedAccount]}</span>.
          We'll review your portfolio and get back to you soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-muted rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {data.contactPreference === "instagram" ? (
              <Instagram className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
            <span className="font-display font-semibold text-lg">
              We'll contact you via{" "}
              {data.contactPreference === "instagram" ? "Instagram" : "WhatsApp"}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            {data.contactPreference === "instagram"
              ? data.instagram
              : data.whatsapp}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="border-2 border-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" />
            <span className="font-display font-semibold">What happens next?</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-foreground">1.</span>
              We review your application & portfolio
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-foreground">2.</span>
              If selected: Free training phase with my scripts & style
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-foreground">3.</span>
              First person to match my level gets the job directly
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-foreground">4.</span>
              <span className="font-semibold text-foreground">$1,000/month</span> once
              your first video goes live + growth opportunities
            </li>
          </ul>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          You can close this window now.
        </motion.p>
      </div>
    </div>
  );
};

export default ConfirmationPage;