import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Calendar, Wallet, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { generateTripPlan } from "../lib/groq";
import { getWeather } from "../services/weather";
import { PlanData } from "../types/plan";

// Modular Components
import WeatherSection from "../components/travel/WeatherSection";
import HiddenGemsSection from "../components/travel/HiddenGemsSection";
import ItineraryTimeline from "../components/travel/ItineraryTimeline";
import StayRecommendations from "../components/travel/StayRecommendations";
import PersonalizedRecommendations from "../components/travel/PersonalizedRecommendations";
import FoodRecommendations from "../components/travel/FoodRecommendations";
import TransportOptions from "../components/travel/TransportOptions";
import BudgetBreakdown from "../components/travel/BudgetBreakdown";
import TravelTips from "../components/travel/TravelTips";
import LoadingSkeleton from "../components/travel/LoadingSkeleton";
import PlanHeader from "../components/travel/PlanHeader";
import ClimateCompatibility from "../components/travel/ClimateCompatibility";

export default function TravelPlanner() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [budget, setBudget] = useState(50000);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;

    setIsLoading(true);
    setPlan(null);
    setError("");
    
    try {
      const weatherData = await getWeather(destination);
      if (!weatherData) {
        throw new Error("Could not fetch weather data for this destination.");
      }

      const generated = await generateTripPlan(budget, destination, dates, weatherData);
      
      if (generated.startsWith("Minimum")) {
        setError(generated);
      } else {
        const jsonMatch = generated.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : generated;
        const parsed = JSON.parse(jsonStr);
        setPlan(parsed);
      }
    } catch (err: any) {
      console.error("Generation Error:", err);
      setError(err.message || "Failed to generate a premium plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Premium AI Planner</span>
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-8 leading-tight">
            Cinematic <br /> <span className="text-gradient-blue italic">Experience</span>
          </h1>
          <p className="text-white/60 mb-12 max-w-lg leading-relaxed">
            Personalized itineraries with hidden gems, local expertise, and aesthetic recommendations powered by real weather data.
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
                  placeholder="e.g. Goa, India"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:border-blue-400/50 transition-colors text-white"
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
                  placeholder="e.g. Dec 20-25"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:border-blue-400/50 transition-colors text-white"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Max Budget (INR)</label>
                <span className="text-blue-400 font-bold font-display text-xl">₹{budget.toLocaleString('en-IN')}</span>
              </div>
              <div className="relative flex items-center group">
                <div className="absolute -top-6 left-0 text-[10px] text-white/20 font-bold">₹500</div>
                <div className="absolute -top-6 right-0 text-[10px] text-white/20 font-bold">₹10,00,000</div>
                <input
                  type="range"
                  min="500"
                  max="1000000"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500 hover:bg-white/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 rounded-full bg-blue-500 text-white font-bold tracking-widest shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-all disabled:opacity-70 flex justify-center items-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                  ANALYZING WEATHER & CRAFTING...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                  GENERATE PREMIUM PLAN
                </>
              )}
            </button>
          </form>
          
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest text-center">
              {error}
            </div>
          )}
        </motion.div>

        <div className="relative min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-deep rounded-[3rem] border border-white/10 p-8 h-full overflow-y-auto custom-scrollbar ${!plan && 'flex items-center justify-center text-center'}`}
          >
            {isLoading ? (
              <LoadingSkeleton />
            ) : plan ? (
              <div className="space-y-12">
                <PlanHeader 
                  title={plan.destinationOverview.title}
                  vibe={plan.destinationOverview.vibe}
                  description={plan.destinationOverview.description}
                />

                <ClimateCompatibility data={plan.climateCompatibility} />

                <WeatherSection 
                  summary={plan.weatherSummary}
                  daily={plan.dailyWeather}
                />

                <HiddenGemsSection gems={plan.hiddenGems} />

                <ItineraryTimeline itinerary={plan.itinerary} />

                <StayRecommendations stays={plan.recommendedStays} />

                <PersonalizedRecommendations recommendations={plan.personalizedRecommendations} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FoodRecommendations foods={plan.localFoods} />
                  <TransportOptions options={plan.transportOptions} />
                </div>

                <BudgetBreakdown breakdown={plan.budgetBreakdown} />

                <TravelTips tips={plan.travelTips} />

                <div className="pt-8 flex flex-wrap gap-4">
                  <button className="flex-1 px-8 py-5 rounded-full bg-blue-500 text-white font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_15px_40px_rgba(59,130,246,0.4)]">
                    Save Itinerary
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-8 py-5 rounded-full glass text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all border border-white/10"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-xs">
                <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-8 relative">
                  <Sparkles size={40} className="text-blue-400/30" />
                  <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full" />
                </div>
                <h3 className="text-2xl font-display uppercase tracking-widest text-white/20">Your Cinematic <br /> Journey</h3>
                <p className="text-[10px] text-white/10 uppercase tracking-[0.2em] leading-relaxed">Fill in the details to generate a premium, personalized travel experience.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
