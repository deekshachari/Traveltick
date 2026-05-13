import { motion, AnimatePresence } from "motion/react";
import { Globe, MapPin } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";

// --- Components ---

const RotatingGlobe = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    transition={{ duration: 2 }}
    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
  >
    <motion.svg
      viewBox="0 0 100 100"
      className="w-[120vh] h-[120vh] text-blue-400/30"
      animate={{ rotate: 360 }}
      transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1 3" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" opacity="0.5" />
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={`long-${i}`}
          cx="50" cy="50" rx={Math.abs(48 * Math.cos((i * Math.PI) / 6))} ry="48"
          fill="none" stroke="currentColor" strokeWidth="0.08"
          style={{ transformOrigin: 'center' }}
          opacity={0.3 + Math.abs(Math.cos((i * Math.PI) / 6)) * 0.4}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <circle
          key={`lat-${i}`}
          cx="50" cy="50" r={Math.abs(48 * Math.sin(((i + 1) * Math.PI) / 9))}
          fill="none" stroke="currentColor" strokeWidth="0.08"
          opacity={0.3 + Math.sin(((i + 1) * Math.PI) / 9) * 0.4}
        />
      ))}
    </motion.svg>
  </motion.div>
);

const DigitalParticle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotate: Math.random() * 360
    }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
    className="absolute w-1 h-1 bg-blue-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
  />
);

const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200
    }}
    transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 1 }}
    className="absolute w-1 h-1 bg-blue-400 rounded-full"
  />
);

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [isStarted, setIsStarted] = useState(false);
  const [isDigitalizing, setIsDigitalizing] = useState(false);
  const [isMuted] = useState(false);

  const playSound = (type: 'tick' | 'stamp' | 'takeoff' | 'chime') => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.4, now);
      masterGain.connect(audioCtx.destination);

      switch (type) {
        case 'tick': {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1200, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.02);
          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now);
          osc.stop(now + 0.03);
          break;
        }
        case 'stamp': {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
          gain.gain.setValueAtTime(0.5, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now);
          osc.stop(now + 0.5);
          break;
        }
        case 'chime': {
          const frequencies = [880, 1108.73, 1318.51, 1760];
          frequencies.forEach((f, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + i * 0.05);
            gain.gain.setValueAtTime(0, now + i * 0.05);
            gain.gain.linearRampToValueAtTime(0.08, now + i * 0.05 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start(now + i * 0.05);
            osc.stop(now + 3);
          });
          break;
        }
      }
    } catch (e) { }
  };

  useEffect(() => {
    if (isDigitalizing) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isDigitalizing, onComplete]);

  return (
    <div className="film-grain vignette fixed inset-0 z-[5000] bg-[#050505] flex items-center justify-center overflow-hidden font-sans text-white">
      <RotatingGlobe />
      
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(20px)" }}
            className="relative z-10 flex flex-col items-center gap-12"
          >
            <div className="text-center">
              <h1 className="classy-logo-hero text-8xl md:text-[10rem] leading-none mb-6">Travel Tick</h1>
              <p className="text-blue-300/40 text-xs uppercase tracking-[0.8em]">Your Journey · Verified · Elevated</p>
            </div>
            <button
              onClick={() => { setIsStarted(true); playSound('chime'); }}
              className="px-16 py-5 rounded-full border border-blue-400/25 bg-white/5 hover:scale-105 active:scale-95 transition-all text-xs font-bold uppercase tracking-[0.5em] text-blue-300/70 hover:text-white"
            >
              Begin Journey
            </button>
          </motion.div>
        )}

        {isStarted && (
          <motion.div
            key="passport"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(40px)" }}
            className="relative flex flex-col items-center"
          >
            <div className="w-[400px] h-[550px] passport-texture rounded-[40px] border border-white/10 p-12 flex flex-col items-center justify-between relative overflow-hidden">
              <div className="flex flex-col items-center gap-4 mt-8 opacity-40">
                <Globe size={64} strokeWidth={1} />
                <h2 className="text-2xl font-display uppercase tracking-[0.5em]">Passport</h2>
              </div>

              <motion.div
                initial={{ scale: 3, opacity: 0, y: -100 }}
                animate={{
                  scale: isDigitalizing ? 1.2 : 1,
                  opacity: isDigitalizing ? 0 : 1,
                  y: 0,
                  filter: isDigitalizing ? "blur(10px)" : "blur(0px)"
                }}
                transition={{ delay: 0.8, type: "spring", damping: 12 }}
                onAnimationComplete={() => {
                  if (!isDigitalizing) {
                    playSound('stamp');
                    setTimeout(() => setIsDigitalizing(true), 1000);
                  }
                }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full border-4 border-purple-500/50 flex items-center justify-center stamp-glow">
                  <div className="flex flex-col items-center text-purple-400">
                    <MapPin size={32} />
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Approved</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(12)].map((_, i) => <Particle key={i} delay={1 + i * 0.05} />)}
                </div>
              </motion.div>

              {isDigitalizing && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  {[...Array(40)].map((_, i) => <DigitalParticle key={i} delay={i * 0.02} />)}
                </div>
              )}

              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
