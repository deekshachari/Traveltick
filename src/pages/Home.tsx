import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mountain,
  Palmtree,
  Building2,
  Compass,
  ArrowRight,
  Globe,
  Calendar,
  Star,
  Search,
  Users,
  Wallet,
  Check,
  ChevronRight,
  Quote
} from "lucide-react";
import { useState, useEffect, ReactNode, useRef } from "react";
import { generateTripPlan } from "../lib/groq";

// --- Components ---

const QuickSearch = () => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.8, duration: 1 }}
    className="w-full max-w-5xl mx-auto mt-12 glass p-1 rounded-3xl md:rounded-full"
  >
    <div className="flex flex-col md:flex-row items-center gap-2 p-2">
      <div className="flex-1 flex items-center gap-4 px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 w-full">
        <MapPin className="text-blue-400" size={20} />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Destination</span>
          <input type="text" placeholder="Where to?" className="bg-transparent border-none outline-none text-white placeholder:text-white/20 w-full" />
        </div>
      </div>
      <div className="flex-1 flex items-center gap-4 px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 w-full">
        <Calendar className="text-blue-400" size={20} />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Date</span>
          <input type="text" placeholder="Add dates" className="bg-transparent border-none outline-none text-white placeholder:text-white/20 w-full" />
        </div>
      </div>
      <div className="flex-1 flex items-center gap-4 px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 w-full">
        <Wallet className="text-blue-400" size={20} />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Budget</span>
          <input type="text" placeholder="Max budget" className="bg-transparent border-none outline-none text-white placeholder:text-white/20 w-full" />
        </div>
      </div>
      <button className="w-full md:w-auto px-10 py-4 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center gap-2 transition-all group">
        <Search size={20} />
        <span className="md:hidden">Search</span>
      </button>
    </div>
  </motion.div>
);

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="/images/hero_bg.png" alt="Hero" className="w-full h-full object-cover scale-105" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-black/20" />
    </div>

    <div className="container mx-auto px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="classy-logo-hero text-6xl md:text-8xl lg:text-9xl mb-6">
          Explore the World <br /> <span className="text-blue-400/80">Your Way</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/60 font-sans tracking-wide max-w-2xl mx-auto mb-12">
          Personalized trips based on your mood and interests. Cinematic experiences crafted just for you.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link to="/travel-planner" className="px-10 py-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            START YOUR JOURNEY
          </Link>
          <Link to="/custom-builder" className="px-10 py-4 rounded-full glass hover:bg-white/10 text-white font-bold tracking-widest transition-all">
            CUSTOMIZE TRIP
          </Link>
        </div>
      </motion.div>

      <QuickSearch />
    </div>
  </section>
);

const MoodCard = ({ icon: Icon, label, image, delay }: { icon: any, label: string, image: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer hover-lift"
  >
    <img src={image} alt={label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-black/40 transition-all duration-500" />

    <Link to={`/mood/${label.toLowerCase()}`} className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
      <div className="w-16 h-16 rounded-2xl glass-deep flex items-center justify-center mb-4 group-hover:neon-glow-blue transition-all duration-500">
        <Icon size={32} className="text-blue-400" />
      </div>
      <h3 className="text-2xl font-display uppercase tracking-widest mb-4">{label}</h3>
      <button className="opacity-0 group-hover:opacity-100 transition-all duration-500 px-6 py-2 rounded-full glass text-xs uppercase tracking-widest">
        Explore Trips
      </button>
    </Link>
  </motion.div>
);

const MoodSection = () => {
  const moods = [
    { icon: Mountain, label: "Adventure", image: "/images/adventure.png" },
    { icon: Palmtree, label: "Relaxation", image: "/images/relaxation.png" },
    { icon: Compass, label: "Romantic", image: "/images/hero_bg.png" },
    { icon: Building2, label: "Luxury", image: "/images/luxury.png" },
  ];

  return (
    <section id="moods" className="section-padding relative">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Tailored for You</span>
          <h2 className="text-5xl md:text-6xl font-display uppercase tracking-widest">Find Your <span className="text-gradient-blue">Mood</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {moods.map((mood, i) => (
            <MoodCard key={mood.label} {...mood} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DestinationCard = ({ city, country, price, rating, image, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="group relative h-[500px] rounded-[3rem] overflow-hidden cursor-pointer"
  >
    <Link to="/trip/1">
      <img src={image} alt={city} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

      <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full flex items-center gap-2">
        <Star size={14} className="text-yellow-400 fill-yellow-400" />
        <span className="text-xs font-bold">{rating}</span>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-10">
        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">{country}</p>
        <h3 className="text-4xl font-display mb-4">{city}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/40 text-[10px] uppercase tracking-widest block">Starting from</span>
            <span className="text-2xl font-bold text-white">${price}</span>
          </div>
          <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-blue-500 transition-colors group/btn">
            <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Link>
  </motion.div>
);

const DestinationsSection = () => (
  <section id="destinations" className="section-padding bg-black/40">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">World Explorer</span>
          <h2 className="text-5xl md:text-6xl font-display uppercase tracking-widest">Popular <span className="text-gradient-blue">Places</span></h2>
          <p className="text-white/40 mt-6 font-sans">Handpicked destinations that will leave you speechless. From the peaks of Switzerland to the beaches of Bali.</p>
        </div>
        <button className="px-8 py-3 rounded-full glass hover:bg-white/5 flex items-center gap-4 group transition-all">
          <span className="text-xs uppercase tracking-widest font-bold">View All</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <DestinationCard city="Zermatt" country="Switzerland" price="2,450" rating="4.9" image="/images/switzerland.png" delay={0.1} />
        <DestinationCard city="Ubud" country="Bali" price="1,200" rating="4.8" image="/images/bali.png" delay={0.2} />
        <DestinationCard city="Maafushi" country="Maldives" price="3,800" rating="5.0" image="/images/relaxation.png" delay={0.3} />
      </div>
    </div>
  </section>
);

const CustomizationSection = () => {
  const [budget, setBudget] = useState(5000);
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleGenerate = async () => {
    setIsLoading(true);
    setPlan("");
    const generated = await generateTripPlan(budget, location, dates);
    setPlan(generated);
    setIsLoading(false);
  };

  return (
    <section id="customize" className="section-padding relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">AI Planner</span>
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter mb-8 leading-tight">
              Build Your <br /> <span className="text-gradient-blue italic">Dream Trip</span>
            </h2>
            <p className="text-white/60 mb-12 max-w-lg leading-relaxed">
              Tell us your preferences and our AI engine will craft a perfect itinerary for you. Your journey, exactly how you imagined it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-deep p-12 rounded-[3rem] border border-white/10 flex flex-col max-h-[800px]"
          >
            {/* Form content */}
            <div className="space-y-6 mb-8 overflow-y-auto custom-scrollbar flex-1 pr-4">
              {!plan ? (
                <>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Destination (Optional)</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Tokyo, Japan"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Dates (Optional)</label>
                    <input
                      type="text"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      placeholder="e.g. Next Summer, Dec 20-30"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Budget (USD)</label>
                      <span className="text-blue-400 font-bold">${budget}</span>
                    </div>
                    <input
                      type="range" min="500" max="10000" step="100" value={budget}
                      onChange={(e) => setBudget(parseInt(e.target.value))}
                      className="w-full accent-blue-500 bg-white/10 h-1 rounded-full cursor-pointer"
                    />
                  </div>
                </>
              ) : (
                <div className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed pb-4">
                  {plan}
                </div>
              )}
            </div>

            {!plan ? (
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-5 rounded-full bg-blue-500 text-white font-bold tracking-widest shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:bg-blue-600 transition-colors disabled:opacity-70 flex justify-center items-center gap-2 mt-auto"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    GENERATING...
                  </>
                ) : "GENERATE MY TRIP PLAN"}
              </button>
            ) : (
              <button
                onClick={() => setPlan("")}
                className="w-full py-4 rounded-full glass hover:bg-white/10 text-white font-bold tracking-widest transition-all mt-auto"
              >
                PLAN ANOTHER TRIP
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ExperienceHighlights = () => {
  const highlights = [
    { label: "Trekking", image: "/images/adventure.png" },
    { label: "Beach Resorts", image: "/images/relaxation.png" },
    { label: "Nightlife", image: "/images/luxury.png" },
    { label: "Cultural Tours", image: "/images/bali.png" },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-5xl font-display uppercase tracking-widest">Experience <span className="text-gradient-blue">Highlights</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {highlights.map((h, i) => (
          <div key={h.label} className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
            <img src={h.image} alt={h.label} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="text-xl font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{h.label}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="section-padding bg-white/5">
    <div className="container mx-auto">
      <div className="text-center mb-20">
        <Quote className="text-blue-400 mx-auto mb-6 opacity-30" size={60} />
        <h2 className="text-5xl font-display uppercase tracking-widest">Traveler <span className="text-gradient-blue">Stories</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { name: "Alex Johnson", role: "Solo Explorer", text: "TravelTick changed how I see the world." },
          { name: "Sarah Miller", role: "Adventure Couple", text: "The AI customization is insane." },
          { name: "Marco Rossi", role: "Luxury Traveler", text: "Highly professional service." },
        ].map((t, i) => (
          <div key={t.name} className="glass p-12 rounded-[2rem]">
            <p className="text-white/70 italic mb-8">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center font-bold text-blue-400">{t.name[0]}</div>
              <div><h4 className="font-bold uppercase text-xs tracking-widest">{t.name}</h4><p className="text-[10px] text-white/30 uppercase tracking-widest">{t.role}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <MoodSection />
      <DestinationsSection />
      <CustomizationSection />
      <ExperienceHighlights />
      <Testimonials />

      <section className="section-padding relative overflow-hidden h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/images/hero_bg.png" alt="Final CTA" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative z-10 text-center max-w-4xl px-6">
          <h2 className="text-6xl md:text-8xl font-display uppercase tracking-widest mb-10">Ready to <br /> <span className="text-gradient-blue">Fly Away?</span></h2>
          <button className="px-16 py-6 rounded-full bg-blue-500 text-white font-bold tracking-[0.5em] hover:scale-110 transition-all shadow-[0_0_50px_rgba(59,130,246,0.5)]">PLAN MY TRIP</button>
        </motion.div>
      </section>
    </>
  );
}
