import { motion } from "framer-motion";
import { Video, Zap, TrendingUp, UserPlus, Gift, ChevronDown } from "lucide-react";

const InfoPage = () => {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      {/* PAGE 1 - Hero */}
      <section className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden snap-start">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-background" />
            </span>
            Now Hiring
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            We Hire
            <br />
            <span className="relative inline-block">
              Video Editors
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
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

          {/* Big Salary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
              $500-1.5k
            </p>
            <p className="text-muted-foreground text-lg mt-2">per month</p>
          </motion.div>

          {/* Stats - Small */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 text-xs mt-8"
          >
            <div className="text-center">
              <p className="font-display text-lg font-bold">4</p>
              <p className="text-muted-foreground">Accounts</p>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="text-center">
              <p className="font-display text-lg font-bold">350K+</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Fixed at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs">More infos on next page</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* PAGE 2 - Details */}
      <section className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden snap-start">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        <div className="relative z-10 text-center max-w-lg mx-auto w-full">
          {/* Page 2 Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              What You Get
            </h2>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 font-medium mb-8"
          >
            <Gift className="w-4 h-4" />
            <span>€200 Referral Bonus</span>
          </motion.div>

          {/* Apply CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-muted/50 border border-border rounded-xl p-5"
          >
            <p className="font-semibold text-sm mb-1">Ready to apply?</p>
            <p className="text-xs text-muted-foreground">
              Complete your application right here – takes only 2 minutes!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InfoPage;
