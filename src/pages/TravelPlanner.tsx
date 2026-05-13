import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Calendar, Wallet, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { generateTripPlan } from "../lib/gemini";
import ReactMarkdown from "react-markdown";

export default function TravelPlanner() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [budget, setBudget] = useState(2000);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    
    setIsLoading(true);
    setPlan("");
    const generated = await generateTripPlan(budget, destination, dates);
    setPlan(generated);
    setIsLoading(false);
  };

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
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Travel Planner</span>
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-8 leading-tight">
            Plan Your <br /> <span className="text-gradient-blue italic">Next Journey</span>
          </h1>
          <p className="text-white/60 mb-12 max-w-lg leading-relaxed">
            Enter your basic details and let our AI craft a cinematic itinerary just for you.
          </p>

          <form onSubmit={handleGenerate} className="glass-deep p-8 md:p-10 rounded-[2.5rem] border border-white/10 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                <input 
                  required
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Kyoto, Japan"
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
                  placeholder="e.g. October 12-20"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">
                  <Wallet size={14} /> Maximum Budget (USD)
                </label>
                <span className="text-blue-400 font-bold text-xl font-display">${budget}</span>
              </div>
              <input 
                type="range" min="500" max="15000" step="100" value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full accent-blue-500 bg-white/10 h-1.5 rounded-full cursor-pointer hover:accent-blue-400 transition-all"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 rounded-full bg-blue-500 text-white font-bold tracking-widest shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-all disabled:opacity-70 flex justify-center items-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                  ARCHITECTING...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                  GENERATE PLAN
                </>
              )}
            </button>
          </form>
        </motion.div>

        <div className="relative min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-deep rounded-[3rem] border border-white/10 p-10 h-full overflow-y-auto custom-scrollbar ${!plan && 'flex items-center justify-center text-center'}`}
          >
            {isLoading ? (
              <div className="space-y-8 w-full">
                <div className="h-12 bg-white/5 rounded-2xl animate-pulse w-3/4" />
                <div className="space-y-4">
                  <div className="h-4 bg-white/5 rounded-full animate-pulse w-full" />
                  <div className="h-4 bg-white/5 rounded-full animate-pulse w-5/6" />
                  <div className="h-4 bg-white/5 rounded-full animate-pulse w-4/6" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-white/5 rounded-3xl animate-pulse" />
                  <div className="h-32 bg-white/5 rounded-3xl animate-pulse" />
                </div>
              </div>
            ) : plan ? (
              <div className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-blue-400 prose-p:text-white/70 prose-li:text-white/70">
                <ReactMarkdown>{plan}</ReactMarkdown>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                  <button className="px-6 py-3 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-400/30 transition-all">
                    Save to Dashboard
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="px-6 py-3 rounded-full glass text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-xs">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-8">
                  <Sparkles size={32} className="text-blue-400/50" />
                </div>
                <h3 className="text-xl font-display uppercase tracking-widest text-white/20">Your Plan will <br /> appear here</h3>
                <p className="text-xs text-white/10 uppercase tracking-widest leading-loose">Fill in the details and click generate to begin your journey.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
