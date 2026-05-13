import { motion } from "motion/react";
import { User, Map, Heart, Settings, Luggage, Clock, Award, Calendar } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Trips Booked", value: "12", icon: Luggage, color: "text-blue-400" },
    { label: "Destinations", value: "8", icon: Map, color: "text-purple-400" },
    { label: "Travel Points", value: "2,450", icon: Award, color: "text-yellow-400" },
  ];

  const upcomingTrips = [
    { id: 1, city: "Zermatt", date: "Dec 12, 2026", status: "Confirmed", image: "/images/switzerland.png" },
    { id: 2, city: "Ubud", date: "Mar 05, 2027", status: "Pending", image: "/images/bali.png" },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-8">
            <div className="glass p-8 rounded-[2rem] text-center">
              <div className="w-24 h-24 rounded-full bg-blue-500/20 mx-auto mb-6 flex items-center justify-center border-2 border-blue-400/30">
                <User size={48} className="text-blue-400" />
              </div>
              <h2 className="text-xl font-bold tracking-widest uppercase">Alex Johnson</h2>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2">Explorer Level 4</p>
            </div>

            <nav className="glass p-4 rounded-[2rem] space-y-2">
              {[
                { label: "My Profile", icon: User },
                { label: "My Trips", icon: Luggage, active: true },
                { label: "Favorites", icon: Heart },
                { label: "Settings", icon: Settings },
              ].map(item => (
                <button key={item.label} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] uppercase tracking-widest font-bold transition-all ${item.active ? "bg-blue-500 text-white" : "text-white/40 hover:bg-white/5"}`}>
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-8 rounded-[2rem] border-white/5"
                >
                  <s.icon className={s.color} size={24} />
                  <p className="text-3xl font-bold mt-4">{s.value}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-display uppercase tracking-widest">Upcoming <span className="text-gradient-blue">Journeys</span></h3>
              <div className="space-y-4">
                {upcomingTrips.map((trip, i) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-6 rounded-[2rem] flex items-center gap-6 group hover:bg-white/5 transition-all"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                      <img src={trip.image} alt={trip.city} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold uppercase tracking-widest">{trip.city}</h4>
                      <div className="flex items-center gap-4 mt-2 text-[10px] text-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Calendar size={12} /> {trip.date}</span>
                        <span className="flex items-center gap-2"><Clock size={12} /> 5 Days</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-4 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold ${trip.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                        {trip.status}
                      </span>
                      <button className="block mt-4 text-[10px] text-blue-400 uppercase tracking-widest font-bold hover:underline">Manage Trip</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
