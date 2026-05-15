interface FoodRecommendationsProps {
  foods: Array<{
    name: string;
    description: string;
  }>;
}

export default function FoodRecommendations({ foods }: FoodRecommendationsProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Local Flavors</h3>
      <div className="space-y-3">
        {foods.map((food, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-orange-400/5 border border-orange-400/10 hover:bg-orange-400/10 transition-colors">
            <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block mb-1">{food.name}</span>
            <p className="text-[9px] text-white/50 leading-tight">{food.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
