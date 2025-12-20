import { motion } from "framer-motion";
import { DollarSign, Users, Video, Zap, ArrowRight, Star, Gift } from "lucide-react";

const InfoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
      {/* Main Hero Section - Optimized for Story Screenshot */}
      <div className="relative px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Background Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px]" />
        
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="text-lg font-medium tracking-[0.3em] text-zinc-400 uppercase">
            Wir suchen
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-center mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
        >
          VIDEO EDITOREN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-400 text-center mb-12"
        >
          für unsere Creator-Accounts
        </motion.p>

        {/* Earnings Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-600/20 via-purple-500/30 to-purple-600/20 border border-purple-500/40 rounded-2xl p-8 mb-10 text-center backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="w-8 h-8 text-green-400" />
            <span className="text-4xl md:text-5xl font-black text-green-400">
              500-2000€
            </span>
          </div>
          <p className="text-lg text-zinc-300">pro Monat verdienen</p>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-4 w-full max-w-sm mb-10"
        >
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="w-12 h-12 bg-purple-600/30 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="font-bold text-white">Reels & Shorts</p>
              <p className="text-sm text-zinc-400">Schneiden & Gestalten</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-white">Remote & Flexibel</p>
              <p className="text-sm text-zinc-400">Arbeite von überall</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="w-12 h-12 bg-green-600/30 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="font-bold text-white">Langfristig</p>
              <p className="text-sm text-zinc-400">Feste Zusammenarbeit</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-white text-black font-bold text-lg px-8 py-4 rounded-full inline-flex items-center gap-2">
            JETZT BEWERBEN
            <ArrowRight className="w-5 h-5" />
          </div>
          <p className="mt-4 text-zinc-500 text-sm">Link in Bio</p>
        </motion.div>

        {/* Referral Bonus Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-full px-6 py-3 flex items-center gap-2"
        >
          <Gift className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-300 font-bold">€200 Bonus für Empfehlungen!</span>
        </motion.div>
      </div>

      {/* Second Section - More Details (can be scrolled to for another screenshot) */}
      <div className="relative px-6 py-16 flex flex-col items-center min-h-screen bg-gradient-to-b from-zinc-900 to-black">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-black text-center mb-12"
        >
          WAS WIR SUCHEN
        </motion.h2>

        <div className="grid gap-6 w-full max-w-md">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-purple-300">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {["CapCut", "Premiere Pro", "After Effects", "DaVinci"].map((tool) => (
                <span key={tool} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-300">Du solltest</h3>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Trends verstehen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Schnell & zuverlässig sein
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Kreativ denken
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-green-300">Accounts</h3>
            <div className="space-y-2 text-zinc-300">
              <p>• ATOMIC BUCK (Geld & Mindset)</p>
              <p>• WOOSH BUCK (Daily Motivation)</p>
              <p>• THE BUCK (Unterhaltung)</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-bold text-white mb-2">Bereit?</p>
          <p className="text-zinc-400">Swipe up oder Link in Bio!</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
