import { Compass, Clock, Gem } from "lucide-react";
import { HiddenGem } from "../../types/plan";

interface HiddenGemCardProps {
  gem: HiddenGem;
}

export function HiddenGemCard({ gem }: HiddenGemCardProps) {
  return (
    <div className="p-5 rounded-[2rem] bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-white/10 group hover:border-blue-400/30 transition-all">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Compass size={14} className="text-blue-400 group-hover:rotate-45 transition-transform" /> {gem.name}
        </h4>
        <span className="text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-400/10">{gem.category}</span>
      </div>
      <p className="text-[11px] text-white/50 leading-relaxed italic mb-3">"{gem.whySpecial}"</p>
      <div className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-white/30">
        <Clock size={10} /> Best time: {gem.bestTimeToVisit}
      </div>
    </div>
  );
}

interface HiddenGemsSectionProps {
  gems: HiddenGem[];
}

export default function HiddenGemsSection({ gems }: HiddenGemsSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 flex items-center gap-2">
        <Gem size={14} /> Local Hidden Gems
      </h3>
      <div className="grid gap-4">
        {gems.map((gem, idx) => (
          <HiddenGemCard key={idx} gem={gem} />
        ))}
      </div>
    </section>
  );
}
