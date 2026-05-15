import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Search, Filter, Star, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

const destinations = [
  { id: 1, city: "Leh", country: "Ladakh, India", price: "45,000", rating: "4.9", image: "/images/adventure.png", category: "Adventure" },
  { id: 2, city: "Ubud", country: "Bali", price: "85,000", rating: "4.8", image: "/images/bali.png", category: "Relaxation" },
  { id: 3, city: "Udaipur", country: "Rajasthan, India", price: "75,000", rating: "5.0", image: "/images/luxury.png", category: "Luxury" },
  { id: 4, city: "Munnar", country: "Kerala, India", price: "35,000", rating: "4.8", image: "/images/hero_bg.png", category: "Romantic" },
  { id: 5, city: "Kyoto", country: "Japan", price: "1,75,000", rating: "4.7", image: "/images/japan.png", category: "Culture" },
  { id: 6, city: "Rishikesh", country: "Uttarakhand, India", price: "18,000", rating: "4.9", image: "/images/adventure.png", category: "Adventure" },
  { id: 7, city: "Hampi", country: "Karnataka, India", price: "22,000", rating: "4.8", image: "/images/bali.png", category: "Culture" },
  { id: 8, city: "Andaman", country: "India", price: "65,000", rating: "4.9", image: "/images/relaxation.png", category: "Relaxation" },
  { id: 9, city: "Positano", country: "Italy", price: "2,40,000", rating: "4.9", image: "/images/italy.png", category: "Romantic" },
  { id: 10, city: "Zermatt", country: "Switzerland", price: "2,05,000", rating: "4.9", image: "/images/switzerland.png", category: "Adventure" },
  { id: 11, city: "Pondicherry", country: "India", price: "25,000", rating: "4.7", image: "/images/luxury.png", category: "Culture" },
  { id: 12, city: "Gulmarg", country: "Kashmir, India", price: "55,000", rating: "5.0", image: "/images/iceland.png", category: "Adventure" },
];

export default function Destinations() {
  const [filter, setFilter] = useState("All");

  const filteredDestinations = filter === "All" 
    ? destinations 
    : destinations.filter(d => d.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-6xl font-display uppercase tracking-widest mb-6">Explore <span className="text-gradient-blue">Destinations</span></h1>
          <p className="text-white/40 max-w-2xl">Browse our curated selection of the world's most cinematic locations.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {["All", "Adventure", "Relaxation", "Luxury", "Romantic", "Culture"].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full border text-xs uppercase tracking-widest transition-all ${filter === f ? "bg-blue-500 border-blue-500 text-white" : "border-white/10 text-white/40 hover:border-white/30"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input type="text" placeholder="Search destination..." className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm outline-none focus:border-blue-400/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDestinations.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer"
            >
              <Link to={`/trip/${d.id}`}>
                <img src={d.image} alt={d.city} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute top-6 right-6 glass px-3 py-1 rounded-full flex items-center gap-2">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-bold">{d.rating}</span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8">
                  <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1">{d.country}</p>
                  <h3 className="text-3xl font-display mb-4">{d.city}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">₹{d.price}</span>
                    <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-500 transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
