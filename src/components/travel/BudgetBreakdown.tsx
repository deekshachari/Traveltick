interface BudgetBreakdownProps {
  breakdown: {
    stay: string;
    food: string;
    transport: string;
    activities: string;
    miscellaneous: string;
    total: string;
  };
}

export default function BudgetBreakdown({ breakdown }: BudgetBreakdownProps) {
  return (
    <section className="p-8 rounded-[3rem] bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 space-y-8">
      <div className="text-center">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-400 mb-2">Budget Breakdown</h3>
        <div className="text-3xl font-display text-white font-bold">{breakdown.total}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-y-4 gap-x-12 text-[10px]">
        {Object.entries(breakdown).map(([key, val]) => (
          key !== 'total' && (
            <div key={key} className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase tracking-widest">{key}</span>
              <span className="text-white/80 font-bold">{val}</span>
            </div>
          )
        ))}
      </div>
    </section>
  );
}
