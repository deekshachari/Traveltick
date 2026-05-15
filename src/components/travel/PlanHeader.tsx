interface PlanHeaderProps {
  title: string;
  vibe: string;
  description: string;
}

export default function PlanHeader({ title, vibe, description }: PlanHeaderProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-display uppercase tracking-tighter text-blue-400">{title}</h2>
        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-[8px] font-bold uppercase tracking-widest text-blue-400">
          {vibe}
        </span>
      </div>
      <p className="text-white/60 leading-relaxed text-sm">{description}</p>
    </section>
  );
}
