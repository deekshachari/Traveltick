import { Info } from "lucide-react";

interface TravelTipsProps {
  tips: string[];
}

export default function TravelTips({ tips }: TravelTipsProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Pro Tips</h3>
      <div className="grid gap-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex gap-4 text-xs text-white/60 bg-white/5 p-5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              <Info size={14} />
            </div>
            <p className="leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
