import { motion } from "framer-motion";
import { Video, Zap, TrendingUp, UserPlus, Gift } from "lucide-react";

const InfoPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-lg mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-background" />
          </span>
          Now Hiring
        </motion.div>

        {/* Stats - Moved to top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-6 text-sm mb-8"
        >
          <div className="text-center">
            <p className="font-display text-2xl font-bold">4</p>
            <p className="text-muted-foreground text-xs">Accounts</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-display text-2xl font-bold">350K+</p>
            <p className="text-muted-foreground text-xs">Followers</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-display text-2xl font-bold">$500-1.5k</p>
            <p className="text-muted-foreground text-xs">Monthly Pay</p>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]"
        >
          We Need
          <br />
          <span className="relative inline-block">
            Video Editors
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 300 15"
              fill="none"
            >
              <motion.path
                d="M2 12 Q 150 -3, 298 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </motion.svg>
          </span>
        </motion.h1>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          <div className="bg-muted/30 border border-border rounded-xl p-4 text-left">
            <Video className="w-5 h-5 mb-2 text-foreground" />
            <p className="font-semibold text-sm">Reels & Shorts</p>
            <p className="text-xs text-muted-foreground">Edit engaging content</p>
          </div>

          <div className="bg-muted/30 border border-border rounded-xl p-4 text-left">
            <Zap className="w-5 h-5 mb-2 text-foreground" />
            <p className="font-semibold text-sm">Fully Remote</p>
            <p className="text-xs text-muted-foreground">Work from anywhere</p>
          </div>

          <div className="bg-muted/30 border border-border rounded-xl p-4 text-left">
            <TrendingUp className="w-5 h-5 mb-2 text-foreground" />
            <p className="font-semibold text-sm">Profit Sharing</p>
            <p className="text-xs text-muted-foreground">Grow with us</p>
          </div>

          <div className="bg-muted/30 border border-border rounded-xl p-4 text-left">
            <UserPlus className="w-5 h-5 mb-2 text-foreground" />
            <p className="font-semibold text-sm">Build Your Team</p>
            <p className="text-xs text-muted-foreground">Lead with great work</p>
          </div>
        </motion.div>

        {/* Referral Bonus */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2 font-medium"
        >
          <Gift className="w-4 h-4" />
          <span>€200 Referral Bonus</span>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-muted-foreground text-sm"
        >
          Link in Bio
        </motion.p>
      </div>
    </div>
  );
};

export default InfoPage;
