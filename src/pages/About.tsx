import { motion } from "motion/react";
import { Globe, CloudSun, Compass, MapPin, Cpu, Database, Layout, ShieldCheck, Search } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="glass-deep p-10 rounded-[3rem] border border-white/10 hover:border-blue-400/30 transition-all group"
  >
    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:bg-blue-500/20 transition-all">
      <Icon size={32} className="text-blue-400" />
    </div>
    <h3 className="text-xl font-display uppercase tracking-widest mb-4 text-white">{title}</h3>
    <p className="text-sm text-white/40 leading-relaxed font-sans">{description}</p>
  </motion.div>
);

const TechCard = ({ icon: Icon, label, delay }: { icon: any, label: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col items-center gap-4 px-8 py-6 rounded-3xl glass border border-white/5 hover:border-white/10 transition-all cursor-default"
  >
    <Icon size={24} className="text-blue-400/60" />
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{label}</span>
  </motion.div>
);

export default function About() {
  return (
    <div className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] mb-6 block">Our Story</span>
          <h1 className="text-6xl md:text-8xl font-display uppercase tracking-widest mb-10 leading-tight">
            Redefining the <br /> <span className="text-gradient-blue">Way People Travel</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-sans tracking-wide leading-relaxed mb-12">
            TravelTick is an AI-powered intelligent travel planning platform that combines weather intelligence, climate compatibility analysis, personalized recommendations, and local discovery systems to create immersive travel experiences.
          </p>
          <div className="glass inline-block px-10 py-6 rounded-3xl border border-white/10 italic text-white/80 font-sans tracking-wide">
            "Travel is not just about reaching destinations — it is about experiencing moments that stay with us forever."
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FeatureCard 
            icon={CloudSun}
            title="Weather-Aware Planning"
            description="Real-time weather integration offering rain-safe alternatives, clothing recommendations, and optimized exploration timings based on climate conditions."
            delay={0.1}
          />
          <FeatureCard 
            icon={Compass}
            title="AI Personalization"
            description="Traveler preference analysis that generates interest-based itineraries and adaptive recommendations for a truly contextual travel experience."
            delay={0.2}
          />
          <FeatureCard 
            icon={Search}
            title="Hidden Gems Discovery"
            description="Uncover lesser-known destinations and authentic local experiences, from scenic viewpoints to curated food spots vetted by local intelligence."
            delay={0.3}
          />
          <FeatureCard 
            icon={Globe}
            title="Climate Compatibility"
            description="Smart climate preference matching with scored suitability analysis and intelligent destination alternatives for every season."
            delay={0.4}
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-32 overflow-hidden mb-40">
        <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-widest mb-10 text-white/90 italic leading-relaxed">
              "The future of travel is intelligent, adaptive, and deeply personal."
            </h2>
            <div className="w-20 h-px bg-blue-400/30 mx-auto mb-10" />
            <p className="text-lg text-white/50 leading-relaxed font-sans">
              TravelTick aims to combine artificial intelligence with human-centered travel experiences to make travel planning smarter, more practical, and more meaningful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-6 text-center">
        <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold mb-12 block">Built with Modern Intelligence</span>
        <div className="flex flex-wrap justify-center gap-6">
          <TechCard icon={Layout} label="React" delay={0.1} />
          <TechCard icon={ShieldCheck} label="TypeScript" delay={0.2} />
          <TechCard icon={Layout} label="Tailwind CSS" delay={0.3} />
          <TechCard icon={Cpu} label="Groq AI" delay={0.4} />
          <TechCard icon={Database} label="Weather API" delay={0.5} />
        </div>
      </section>
    </div>
  );
}
