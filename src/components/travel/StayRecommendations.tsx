import { Hotel } from "lucide-react";
import { StayOption } from "../../types/plan";

interface StayCardProps {
  level: string;
  details: StayOption;
}

export function StayCard({ level, details }: StayCardProps) {
  return (
    <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-400/10 group-hover:scale-105 transition-transform">
          <Hotel size={20} />
        </div>
        <div>
          <span className="text-[8px] uppercase tracking-widest text-white/30 block mb-1">{level}</span>
          <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{details.name}</span>
          <p className="text-[9px] text-white/40 mt-1">{details.whyRecommended}</p>
        </div>
      </div>
      <span className="text-xs font-display text-blue-400/80">{details.priceRange}</span>
    </div>
  );
}

interface StayRecommendationsProps {
  stays: {
    budget: StayOption;
    midRange: StayOption;
    premium: StayOption;
  };
}

export default function StayRecommendations({ stays }: StayRecommendationsProps) {
  return (
    <section className="space-y-6">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 border-b border-blue-400/20 pb-2">Curated Stays</h3>
      <div className="grid gap-4">
        {Object.entries(stays).map(([level, details]) => (
          <StayCard key={level} level={level} details={details} />
        ))}
      </div>
    </section>
  );
}
