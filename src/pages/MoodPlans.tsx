import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin, Wallet, Sparkles, Mountain, Palmtree, Compass, Gem } from "lucide-react";

const curatedPlans: Record<string, any[]> = {
  adventure: [
    {
      title: "Everest Base Camp Trek",
      location: "Nepal",
      duration: "14 Days",
      price: "2,500",
      rating: "5.0",
      image: "/images/adventure.png",
      activities: ["High-altitude trekking", "Teahouse stays", "Kathmandu city tour"],
      description: "A legendary journey to the foot of the world's highest peak."
    },
    {
      title: "White Water Rafting",
      location: "Rishikesh, India",
      duration: "4 Days",
      price: "450",
      rating: "4.8",
      image: "/images/bali.png",
      activities: ["Ganges rafting", "Cliff jumping", "Riverside camping"],
      description: "Adrenaline-pumping rapids in the yoga capital of the world."
    }
  ],
  relaxation: [
    {
      title: "Overwater Villa Escape",
      location: "Maldives",
      duration: "7 Days",
      price: "4,800",
      rating: "5.0",
      image: "/images/relaxation.png",
      activities: ["Spa treatments", "Snorkeling", "Private dining"],
      description: "Ultimate serenity in your own private villa above turquoise waters."
    },
    {
      title: "Zen Retreat",
      location: "Bali, Indonesia",
      duration: "10 Days",
      price: "1,800",
      rating: "4.9",
      image: "/images/bali.png",
      activities: ["Yoga sessions", "Rice terrace walks", "Sound healing"],
      description: "Reconnect with yourself in the spiritual heart of Bali."
    }
  ],
  romantic: [
    {
      title: "Parisian Romance",
      location: "Paris, France",
      duration: "5 Days",
      price: "3,200",
      rating: "4.9",
      image: "/images/hero_bg.png",
      activities: ["Seine cruise", "Eiffel Tower dining", "Montmartre walk"],
      description: "Celebrate love in the world's most romantic city."
    },
    {
      title: "Santorini Sunset",
      location: "Greece",
      duration: "6 Days",
      price: "2,900",
      rating: "5.0",
      image: "/images/switzerland.png",
      activities: ["Sunset sailing", "Wine tasting", "Oia exploration"],
      description: "Whitewashed walls and blue domes against a deep blue sea."
    }
  ],
  luxury: [
    {
      title: "Royal Dubai Experience",
      location: "Dubai, UAE",
      duration: "5 Days",
      price: "6,500",
      rating: "5.0",
      image: "/images/luxury.png",
      activities: ["Burj Al Arab stay", "Private desert safari", "Luxury yacht"],
      description: "Unparalleled opulence in the city of gold."
    },
    {
      title: "Swiss Alps Palace",
      location: "St. Moritz, Switzerland",
      duration: "7 Days",
      price: "8,900",
      rating: "4.9",
      image: "/images/switzerland.png",
      activities: ["Private skiing", "Thermal baths", "Gourmet dining"],
      description: "Exclusive winter luxury in the heart of the Alps."
    }
  ]
};

const moodIcons: Record<string, any> = {
  adventure: Mountain,
  relaxation: Palmtree,
  romantic: Compass,
  luxury: Gem
};

export default function MoodPlans() {
  const { type } = useParams();
  const plans = curatedPlans[type || "adventure"] || [];
  const Icon = moodIcons[type || "adventure"] || Sparkles;

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-blue-400 transition-colors mb-12 uppercase text-[10px] font-bold tracking-[0.3em]">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="mb-20">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <Icon size={32} className="text-blue-400" />
          </div>
          <div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] block mb-2">Curated Collection</span>
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter capitalize">
              {type} <span className="text-gradient-blue italic">Plans</span>
            </h1>
          </div>
        </div>
        <p className="text-white/40 max-w-2xl text-lg font-sans">
          Handpicked experiences designed specifically for your {type} mood. These plans are verified for quality and cinematic value.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group glass-deep rounded-[3rem] overflow-hidden border border-white/5 hover:border-blue-400/30 transition-all duration-500 flex flex-col md:flex-row"
          >
            <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
              <img src={plan.image} alt={plan.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
            </div>
            
            <div className="md:w-3/5 p-10 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                    <MapPin size={12} /> {plan.location}
                  </div>
                  <h3 className="text-2xl font-display uppercase tracking-wider">{plan.title}</h3>
                </div>
                <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 border-white/5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-bold">{plan.rating}</span>
                </div>
              </div>

              <p className="text-white/50 text-sm mb-8 line-clamp-2 leading-relaxed font-sans">
                {plan.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-white/20" />
                  <span className="text-[10px] uppercase tracking-widest text-white/60">{plan.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet size={14} className="text-white/20" />
                  <span className="text-[10px] uppercase tracking-widest text-white/60">${plan.price}</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-white/5">
                <Link to="/travel-planner" className="flex-1 py-3 rounded-full bg-blue-500 text-white text-center text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 transition-colors">
                  Customize This
                </Link>
                <button className="flex-1 py-3 rounded-full glass text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 glass-deep p-12 rounded-[3rem] border border-white/5 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <h2 className="text-3xl font-display uppercase tracking-[0.2em] mb-6">Didn't find what you're <br /> <span className="text-gradient-blue italic">looking for?</span></h2>
        <p className="text-white/40 mb-10 max-w-xl mx-auto uppercase text-[10px] tracking-widest leading-loose">
          Our AI architect can build a custom plan for you based on your exact mood and requirements.
        </p>
        <Link to="/custom-builder" className="px-12 py-5 rounded-full bg-blue-500 text-white font-bold tracking-[0.4em] inline-flex items-center gap-4 hover:scale-110 transition-all shadow-2xl">
          <Sparkles size={20} />
          CUSTOM BUILDER
        </Link>
      </div>
    </div>
  );
}
