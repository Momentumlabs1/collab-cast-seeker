import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, DollarSign, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: DollarSign,
      title: "€1,000/month",
      description: "Once your first video goes live. Real compensation for real talent.",
    },
    {
      icon: Users,
      title: "Multiple Accounts",
      description: "Tons of animation accounts need content. Endless creative opportunities.",
    },
    {
      icon: Sparkles,
      title: "Free Training",
      description: "Learn our style in the teaching phase. No upfront costs, ever.",
    },
    {
      icon: Zap,
      title: "We Pick The Best",
      description: "Multiple rounds ensure we find true talent. Show us what you've got.",
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
            Get paid <span className="text-foreground font-semibold">€1,000/month</span> to create 
            viral content for animation accounts.
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
              <p className="font-display text-3xl sm:text-4xl font-bold">50+</p>
              <p className="text-muted-foreground">Accounts</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="font-display text-3xl sm:text-4xl font-bold">1M+</p>
              <p className="text-muted-foreground">Total Followers</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="font-display text-3xl sm:text-4xl font-bold">€1k</p>
              <p className="text-muted-foreground">Monthly Pay</p>
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

      {/* Features Section */}
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
              { step: "04", title: "Get Paid", desc: "€1,000/month once your first video goes live" },
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