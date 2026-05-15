import { PersonalizedRecommendation } from "../../types/plan";

interface PersonalizedRecommendationsProps {
  recommendations: PersonalizedRecommendation[];
}

export default function PersonalizedRecommendations({ recommendations }: PersonalizedRecommendationsProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Expert Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="p-5 rounded-[2rem] bg-white/5 border border-white/10 space-y-3 hover:bg-white/10 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">{rec.category}</span>
            </div>
            <h4 className="text-xs font-bold text-white">{rec.place}</h4>
            <p className="text-[10px] text-white/40 leading-relaxed">{rec.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
