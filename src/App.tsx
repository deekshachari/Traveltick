import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Globe,
  Menu,
  X,
  MessageSquare,
  Send,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Star
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Dashboard from "./pages/Dashboard";
import TripDetails from "./pages/TripDetails";
import TravelPlanner from "./pages/TravelPlanner";
import CustomTravelBuilder from "./pages/CustomTravelBuilder";
import MoodPlans from "./pages/MoodPlans";
import Intro from "./components/Intro";
import { generateTravelResponse, Message } from "./lib/groq";

// --- Shared Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${isScrolled ? "py-4 glass border-b border-white/5" : "py-8"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Globe className="text-blue-400 group-hover:rotate-12 transition-transform" size={24} />
          <span className="classy-logo text-3xl tracking-tighter">TravelTick</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
          <Link to="/" className={`hover:text-blue-400 transition-colors ${location.pathname === '/' ? 'text-blue-400' : ''}`}>Home</Link>
          <Link to="/destinations" className={`hover:text-blue-400 transition-colors ${location.pathname === '/destinations' ? 'text-blue-400' : ''}`}>Destinations</Link>
          <Link to="/dashboard" className={`hover:text-blue-400 transition-colors ${location.pathname === '/dashboard' ? 'text-blue-400' : ''}`}>Dashboard</Link>
          <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          <button className="px-6 py-2 rounded-full border border-blue-400/30 bg-blue-400/10 hover:bg-blue-400/20 transition-all text-blue-400">
            Sign In
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="pt-24 pb-12 bg-black border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Globe className="text-blue-400" size={24} />
            <span className="classy-logo text-3xl tracking-tighter">TravelTick</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            Elevating your journey with cinematic experiences and AI-driven personalization.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold mb-8">Links</h4>
          <ul className="space-y-4 text-xs text-white/40 uppercase tracking-widest">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-widest">© 2026 TravelTick. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I am your TravelTick AI. How can I help you plan your dream journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await generateTravelResponse(newMessages);

    setMessages([...newMessages, { role: 'ai', text: aiResponseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[2000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 glass-deep rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="bg-blue-500/20 p-6 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Globe size={16} className="text-blue-400" />
                AI Travel Assistant
              </h3>
            </div>
            <div className="h-96 p-6 overflow-y-auto space-y-4 flex flex-col custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${m.role === 'ai' ? 'bg-white/5 text-white/90 self-start border border-white/5' : 'bg-blue-500 text-white self-end shadow-lg'}`}>
                  {m.text}
                </div>
              ))}
              {isLoading && (
                <div className="max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed bg-white/5 text-white/50 self-start border border-white/5 flex gap-1">
                  <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-white/10 bg-black/40 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLoading ? "AI is thinking..." : "Ask anything..."}
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs outline-none focus:border-blue-400/50 disabled:opacity-50"
              />
              <button onClick={handleSend} className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-110 transition-all group"
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

// --- App Entry ---

export default function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {!showApp ? (
          <Intro key="intro" onComplete={() => setShowApp(true)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="film-grain vignette relative w-full min-h-screen bg-[#050505] font-sans text-white scroll-smooth selection:bg-blue-500/30"
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trip/:id" element={<TripDetails />} />
              <Route path="/travel-planner" element={<TravelPlanner />} />
              <Route path="/custom-builder" element={<CustomTravelBuilder />} />
              <Route path="/mood/:type" element={<MoodPlans />} />
            </Routes>
            <AIAssistant />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}
