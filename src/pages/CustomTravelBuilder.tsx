import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Calendar, Wallet, Sparkles, ArrowLeft, Heart, Zap, Smile, Gem, Briefcase, Users as FamilyIcon, Snowflake, Sun, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { generatePersonalizedPlan } from "../lib/gemini";
import ReactMarkdown from "react-markdown";

export default function CustomTravelBuilder() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [budget, setBudget] = useState(5000);
  const [mood, setMood] = useState("Adventure");
  const [purpose, setPurpose] = useState("Vacation");
  const [climate, setClimate] = useState("Moderate");
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPlan("");
    const generated = await generatePersonalizedPlan(budget, destination, dates, mood, purpose, climate);
    setPlan(generated);
    setIsLoading(false);
  };

  const moods = [
    { id: "Adventure", icon: Zap, label: "Adventure" },
    { id: "Relaxation", icon: Smile, label: "Relaxation" },
    { id: "Romantic", icon: Heart, label: "Romantic" },
    { id: "Luxury", icon: Gem, label: "Luxury" },
  ];

  const purposes = ["Vacation", "Honeymoon", "Solo", "Family"];
  const climates = [
    { id: "Cold", icon: Snowflake },
    { id: "Moderate", icon: Cloud },
    { id: "Tropical", icon: Sun },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-blue-400 transition-colors mb-12 uppercase text-[10px] font-bold tracking-[0.3em]">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">AI Travel Architect</span>
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-8 leading-tight">
            Custom <br /> <span className="text-gradient-blue italic">Builder</span>
          </h1>
          
          <form onSubmit={handleGenerate} className="glass-deep p-8 md:p-10 rounded-[2.5rem] border border-white/10 space-y-8 max-h-[1200px] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                  <input 
                    type="text" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Iceland"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:border-blue-400/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Travel Dates</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                  <input 
                    type="text" 
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="e.g. Any time 2026"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:border-blue-400/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Travel Mood</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id)}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${mood === m.id ? 'bg-blue-500 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                    <m.icon size={20} className={mood === m.id ? 'text-white' : 'text-blue-400 group-hover:scale-110 transition-transform'} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Purpose of Travel</label>
              <div className="grid grid-cols-2 gap-4">
                {purposes.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p)}
                    className={`py-3 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest ${purpose === p ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Preferred Climate</label>
              <div className="flex gap-4">
                {climates.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setClimate(c.id)}
                    className={`flex-1 p-4 rounded-2xl border transition-all flex items-center justify-center gap-3 ${climate === c.id ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10'}`}
                  >
                    <c.icon size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{c.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Budget (USD)</label>
                <span className="text-blue-400 font-bold text-xl font-display">${budget}</span>
              </div>
              <input 
                type="range" min="1000" max="30000" step="500" value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full accent-blue-500 bg-white/10 h-1.5 rounded-full cursor-pointer"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 rounded-full bg-blue-500 text-white font-bold tracking-widest shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-all disabled:opacity-70 flex justify-center items-center gap-3"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                  PERSONALIZING...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  BUILD MY JOURNEY
                </>
              )}
            </button>
          </form>
        </motion.div>

        <div className="relative min-h-[800px] sticky top-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-deep rounded-[3rem] border border-white/10 p-10 h-full overflow-y-auto custom-scrollbar ${!plan && 'flex items-center justify-center text-center'}`}
          >
            {isLoading ? (
              <div className="space-y-8 w-full">
                <div className="h-16 bg-white/5 rounded-3xl animate-pulse" />
                <div className="space-y-4">
                  <div className="h-4 bg-white/5 rounded-full animate-pulse w-full" />
                  <div className="h-4 bg-white/5 rounded-full animate-pulse w-5/6" />
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="h-64 bg-white/5 rounded-[2rem] animate-pulse" />
                </div>
              </div>
            ) : plan ? (
              <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-blue-400">
                <ReactMarkdown>{plan}</ReactMarkdown>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                  <button className="px-8 py-4 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
                    Confirm & Save Plan
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="px-8 py-4 rounded-full glass text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Export Itinerary
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-xs">
                <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-8 relative">
                  <Sparkles size={40} className="text-blue-400/30" />
                  <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full" />
                </div>
                <h3 className="text-2xl font-display uppercase tracking-widest text-white/20">Custom <br /> Architect</h3>
                <p className="text-[10px] text-white/10 uppercase tracking-[0.2em] leading-relaxed">Select your preferences to generate a deeply personalized travel experience.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
