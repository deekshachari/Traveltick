import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, Users, Star, ArrowLeft, Check, ShieldCheck, CreditCard } from "lucide-react";

export default function TripDetails() {
  const { id } = useParams();
  
  // Mock data for a trip
  const trip = {
    city: "Zermatt",
    country: "Switzerland",
    price: "2,450",
    rating: "4.9",
    image: "/images/switzerland.png",
    duration: "5 Days / 4 Nights",
    highlights: ["Scenic Train Ride", "Matterhorn View", "Luxury Spa", "Gourmet Dining"],
    itinerary: [
      { day: 1, title: "Arrival & City Tour", description: "Arrive in Zermatt and explore the car-free village with a local guide." },
      { day: 2, title: "Matterhorn Glacier Paradise", description: "Take the highest cable car in Europe to see breathtaking 360-degree views." },
      { day: 3, title: "Gornergrat Railway", description: "Ride the world's first fully electric cog railway up to 3,089 meters." },
    ]
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Banner */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img src={trip.image} alt={trip.city} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="absolute bottom-12 left-0 w-full px-6 md:px-24">
          <Link to="/destinations" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 mb-6 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Destinations
          </Link>
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div>
              <p className="text-blue-400 font-bold uppercase tracking-[0.4em] mb-2">{trip.country}</p>
              <h1 className="text-6xl md:text-8xl font-display uppercase tracking-widest">{trip.city}</h1>
            </div>
            <div className="glass p-6 rounded-3xl text-right">
              <span className="text-xs text-white/40 uppercase tracking-widest block">Package Price</span>
              <span className="text-4xl font-bold">${trip.price}</span>
              <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">Per Person</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-24 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h3 className="text-2xl font-display uppercase tracking-widest mb-8 text-gradient-blue">Overview</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                Experience the magic of {trip.city}, a car-free village at the foot of the Matterhorn. This exclusive 5-day journey combines luxury accommodation with breathtaking alpine adventures.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="glass p-6 rounded-3xl text-center">
                  <Calendar size={20} className="text-blue-400 mx-auto mb-3" />
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Duration</p>
                  <p className="text-sm font-bold mt-1 uppercase">5 Days</p>
                </div>
                <div className="glass p-6 rounded-3xl text-center">
                  <Star size={20} className="text-blue-400 mx-auto mb-3" />
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Rating</p>
                  <p className="text-sm font-bold mt-1 uppercase">4.9 / 5</p>
                </div>
                <div className="glass p-6 rounded-3xl text-center">
                  <Users size={20} className="text-blue-400 mx-auto mb-3" />
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Group Size</p>
                  <p className="text-sm font-bold mt-1 uppercase">Max 12</p>
                </div>
                <div className="glass p-6 rounded-3xl text-center">
                  <ShieldCheck size={20} className="text-blue-400 mx-auto mb-3" />
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Insurance</p>
                  <p className="text-sm font-bold mt-1 uppercase">Included</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-display uppercase tracking-widest mb-8 text-gradient-blue">Itinerary</h3>
              <div className="space-y-6">
                {trip.itinerary.map((day, i) => (
                  <div key={i} className="glass p-8 rounded-[2rem] border-white/5 flex gap-8">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold shrink-0">
                      {day.day}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-widest mb-2">{day.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Sidebar */}
          <aside className="space-y-8">
            <div className="glass-deep p-10 rounded-[3rem] border-white/10 sticky top-32">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-8">Book This Trip</h3>
              
              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Departure Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-400/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Travelers</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-400/50 appearance-none">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>Family (2+2)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Base Price</span>
                  <span>${trip.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Taxes & Fees</span>
                  <span>$150</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4">
                  <span>Total</span>
                  <span className="text-blue-400">$2,600</span>
                </div>
              </div>

              <button className="w-full py-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-widest transition-all mb-4">
                BOOK NOW
              </button>
              <button className="w-full py-5 rounded-full glass hover:bg-white/10 text-white font-bold tracking-widest transition-all flex items-center justify-center gap-2">
                <CreditCard size={16} /> RESERVE FOR $500
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
