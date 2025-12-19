import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, DollarSign, Zap, TrendingUp, UserPlus, Instagram, Bot, Star, Trophy, Rocket, ExternalLink, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Account {
  name: string;
  handle: string;
  link: string;
  description: string;
  tag: string;
  pay: string;
  platforms: string[];
  highlight: boolean;
  fullDescription: string;
  requirements: string[];
  careerPath: string;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const features = [
    {
      icon: DollarSign,
      title: "$500-$1,500/month",
      description: "Depending on account level. Real compensation for real talent.",
    },
    {
      icon: TrendingUp,
      title: "Profit Sharing",
      description: "Earn a share of channel revenue and other projects. Grow with us.",
    },
    {
      icon: UserPlus,
      title: "Build Your Team",
      description: "Great work? Lead your own team. We have big plans ahead.",
    },
    {
      icon: Sparkles,
      title: "Free Training",
      description: "Learn our style in the teaching phase. No upfront costs, ever.",
    },
  ];

  const accounts: Account[] = [
    {
      name: "AGENT_STICK",
      handle: "@agent.stickk",
      link: "https://www.instagram.com/agent.stickk",
      description: "English version of Strichabi. Your starting point!",
      tag: "Start Here",
      pay: "$1,000/month",
      platforms: ["Instagram", "TikTok"],
      highlight: true,
      fullDescription: "This is where you start your journey. Agent Stick is the English version of our main German account Strichabi. You will learn our animation style by translating existing Strichabi videos to English. All scripts are provided by us – you just need to bring your animation skills.",
      requirements: [
        "Translate older Strichabi videos to English",
        "Learn our unique animation style",
        "Scripts provided – focus on animation quality",
        "Existing content to learn from",
      ],
      careerPath: "Start here → Prove yourself → Move to Strichabi ($1,500/month) → Become a partner",
    },
    {
      name: "ATOMIC BUCK",
      handle: "@atomic_buck_",
      link: "https://www.instagram.com/atomic_buck_",
      description: "Rebranding to new character style. Heavy animation work.",
      tag: "Rebrand",
      pay: "$1,000/month",
      platforms: ["Instagram"],
      highlight: false,
      fullDescription: "This account is going through a complete rebrand. We are transforming it into a new character style similar to @yeti_dyor on TikTok. This requires heavy animation work and creative input. Perfect for editors who want to shape something new from the ground up.",
      requirements: [
        "Create new character animations",
        "Heavy animation workload",
        "Creative input welcome",
        "Reference style: @yeti_dyor on TikTok",
      ],
      careerPath: "Build the new style → Show consistent quality → Profit sharing opportunities",
    },
    {
      name: "POVYOURAI",
      handle: "@povyourai",
      link: "https://www.instagram.com/povyourai",
      description: "Currently dormant – open for fresh ideas.",
      tag: "Entry Level",
      pay: "$500/month",
      platforms: ["Instagram"],
      highlight: false,
      fullDescription: "This account is currently dormant and waiting for the right person to bring it back to life. We are completely open for fresh ideas and new directions. Simpler videos are okay here – the main goal is to get some views and test new concepts. Perfect entry point for beginners.",
      requirements: [
        "Bring your own creative ideas",
        "Simpler videos accepted",
        "Low pressure environment",
        "Freedom to experiment",
      ],
      careerPath: "Start simple → Build views → Prove yourself → Move to bigger accounts",
    },
    {
      name: "STRICHABI",
      handle: "@strichabi",
      link: "https://www.instagram.com/strichabi",
      description: "Our flagship German account. Top performers only.",
      tag: "Elite Level",
      pay: "$1,500/month",
      platforms: ["Instagram", "TikTok"],
      highlight: false,
      fullDescription: "This is our main German account and the source of most of our revenue. We produce this content ourselves. Only top performers who have proven themselves on Agent Stick or other accounts get to work here. This is the goal you are working towards.",
      requirements: [
        "Must prove yourself first on Agent Stick",
        "Match my quality level with my scripts",
        "Highest animation standards",
        "Long-term commitment",
      ],
      careerPath: "Reserved for proven editors → $1,500/month → Profit sharing → Partnership potential",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-10 w-72 h-72 bg-foreground/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-background" />
            </span>
            Now Hiring Editors
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            We're Looking For
            <br />
            <span className="relative inline-block">
              Creative Editors
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 400 20"
                fill="none"
              >
                <motion.path
                  d="M2 15 Q 200 -5, 398 15"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Join our team of talented video editors. 
            Get paid <span className="text-foreground font-semibold">$500-$1,500/month</span> plus 
            profit sharing. Build your own team with great work.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/apply")}
              className="group"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              See Examples
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-8 sm:gap-16 text-sm"
          >
            <div>
              <p className="font-display text-3xl sm:text-4xl font-bold">4</p>
              <p className="text-muted-foreground">Accounts</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="font-display text-3xl sm:text-4xl font-bold">350K+</p>
              <p className="text-muted-foreground">Total Followers</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="font-display text-3xl sm:text-4xl font-bold">$1.5k</p>
              <p className="text-muted-foreground">Max Monthly Pay</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-foreground rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Accounts Section - Moved UP */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground text-background rounded-full text-sm font-medium mb-4">
              <Bot className="w-4 h-4" />
              Also working in AI
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              The Accounts You'll Work On
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start with Agent Stick, prove yourself, grow to Strichabi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((account, index) => (
              <motion.button
                key={account.name}
                onClick={() => setSelectedAccount(account)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-background p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl text-left ${
                  account.highlight 
                    ? "border-foreground ring-2 ring-foreground/20" 
                    : "border-border hover:border-foreground/50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      account.highlight 
                        ? "bg-foreground text-background" 
                        : "bg-muted text-foreground"
                    }`}>
                      <Instagram className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl group-hover:underline flex items-center gap-2">
                        {account.name}
                        {account.highlight && <Star className="w-4 h-4 fill-current" />}
                      </h3>
                      <p className="text-muted-foreground text-sm">{account.handle}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    account.highlight 
                      ? "bg-foreground text-background" 
                      : "bg-muted"
                  }`}>
                    {account.tag}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{account.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-semibold">{account.pay}</span>
                    {account.platforms.length > 1 && (
                      <span className="text-xs text-muted-foreground">
                        • {account.platforms.join(" + ")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Account Detail Modal */}
          <Dialog open={!!selectedAccount} onOpenChange={() => setSelectedAccount(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              {selectedAccount && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        selectedAccount.highlight 
                          ? "bg-foreground text-background" 
                          : "bg-muted text-foreground"
                      }`}>
                        <Instagram className="w-7 h-7" />
                      </div>
                      <div>
                        <DialogTitle className="font-display text-2xl flex items-center gap-2">
                          {selectedAccount.name}
                          {selectedAccount.highlight && <Star className="w-5 h-5 fill-current text-foreground" />}
                        </DialogTitle>
                        <p className="text-muted-foreground">{selectedAccount.handle}</p>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Tags & Pay */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        selectedAccount.highlight 
                          ? "bg-foreground text-background" 
                          : "bg-muted"
                      }`}>
                        {selectedAccount.tag}
                      </span>
                      <span className="px-3 py-1 text-sm font-semibold rounded-full bg-primary/10 text-primary">
                        {selectedAccount.pay}
                      </span>
                      {selectedAccount.platforms.map((platform) => (
                        <span key={platform} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                          {platform}
                        </span>
                      ))}
                    </div>

                    {/* Full Description */}
                    <div>
                      <h4 className="font-display font-bold text-lg mb-2">About This Account</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedAccount.fullDescription}</p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-display font-bold text-lg mb-3">What You Will Do</h4>
                      <ul className="space-y-2">
                        {selectedAccount.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-foreground text-background rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Career Path */}
                    <div className="bg-muted/50 p-4 rounded-xl border border-border">
                      <h4 className="font-display font-bold text-sm mb-2 flex items-center gap-2">
                        <Rocket className="w-4 h-4" />
                        Career Path
                      </h4>
                      <p className="text-sm text-muted-foreground">{selectedAccount.careerPath}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        variant="hero"
                        className="flex-1"
                        onClick={() => {
                          setSelectedAccount(null);
                          navigate("/apply");
                        }}
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(selectedAccount.link, "_blank")}
                      >
                        <Instagram className="w-4 h-4 mr-2" />
                        View on Instagram
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-8 text-sm"
          >
            Reference: Character style for Atomic Buck inspired by{" "}
            <a 
              href="https://www.tiktok.com/@yeti_dyor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground underline hover:no-underline"
            >
              @yeti_dyor on TikTok
            </a>
          </motion.p>
        </div>
      </section>

      {/* Career Path Section - NEW */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Your Career Path
            </h2>
            <p className="text-muted-foreground text-lg">
              From beginner to partner. Here's how you grow.
            </p>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground text-background p-6 rounded-2xl mb-12"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-background/20 rounded-lg flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1">How Selection Works</h3>
                <p className="text-background/80 text-sm">
                  Payment starts only when you can deliver finished videos. We select a few candidates for free training. 
                  Best performers advance to the next round. <span className="font-semibold text-background">First person to create a video at my level with my script gets the job directly.</span>
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {[
                { 
                  icon: Rocket, 
                  title: "Apply & Get Selected", 
                  desc: "Submit your portfolio. We pick a few promising candidates for the training phase.",
                  pay: "Free Training"
                },
                { 
                  icon: Trophy, 
                  title: "Learn & Compete", 
                  desc: "I teach you our style. Best performers advance. First to match my level with my script wins the job.",
                  pay: "Prove Yourself"
                },
                { 
                  icon: Star, 
                  title: "Get the Job", 
                  desc: "Winner gets: All programs & access you need. Fixed starting income. Long-term work.",
                  pay: "$1,000/month"
                },
                { 
                  icon: Users, 
                  title: "Grow With Us", 
                  desc: "Work on bigger accounts, earn more, get profit sharing, build your own team.",
                  pay: "Up to $1,500+ / Partner"
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 p-6 bg-muted/50 rounded-2xl border border-border relative"
                >
                  <div className="w-14 h-14 bg-foreground text-background rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-display font-bold text-xl">{item.title}</h3>
                      <span className="text-sm font-semibold text-foreground/70">{item.pay}</span>
                    </div>
                    <p className="text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section - Moved DOWN */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Why Join Us?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're building a team of elite editors. Here's what you get.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-6 rounded-2xl border-2 border-border hover:border-foreground/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              From application to getting paid. Simple.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: "01", title: "Apply", desc: "Submit your portfolio and tell us about yourself" },
              { step: "02", title: "Training", desc: "Free teaching phase to learn our style" },
              { step: "03", title: "Selection", desc: "Multiple rounds – we pick the best talent" },
              { step: "04", title: "Get Paid", desc: "$500-$1,500/month once your first video goes live" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-6 p-6 bg-muted/50 rounded-2xl border border-border"
              >
                <span className="font-display text-4xl sm:text-5xl font-bold text-foreground/20">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Ready to Join?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-background/70 text-lg mb-10 max-w-2xl mx-auto"
          >
            We're actively looking for talented editors. Apply now and start your journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="outline"
              size="xl"
              onClick={() => navigate("/apply")}
              className="bg-background text-foreground hover:bg-background/90 border-background"
            >
              Start Your Application
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Editor Recruitment. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
