import { Car } from "lucide-react";

interface TransportOptionsProps {
  options: Array<{
    type: string;
    estimatedCost: string;
    tip: string;
  }>;
}

export default function TransportOptions({ options }: TransportOptionsProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Logistics</h3>
      <div className="space-y-2">
        {options.map((t, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-2 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-2"><Car size={12} /> {t.type}</span>
              <span className="text-[10px] text-white/80 font-bold">{t.estimatedCost}</span>
            </div>
            <p className="text-[8px] text-blue-400/60 italic leading-tight">Tip: {t.tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
