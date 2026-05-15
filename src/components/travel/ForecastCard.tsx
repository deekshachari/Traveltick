import { Wind, CloudRain } from "lucide-react";
import { DailyWeather } from "../../types/plan";

interface ForecastCardProps {
  day: DailyWeather;
}

export default function ForecastCard({ day }: ForecastCardProps) {
  return (
    <div className="min-w-[140px] p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 text-center group hover:bg-white/10 transition-all">
      <span className="text-[9px] font-bold text-white/40 uppercase">{day.date}</span>
      <div className="text-blue-400 group-hover:scale-110 transition-transform">
        <Wind size={18} />
      </div>
      <span className="text-xs font-bold text-white">{day.temperature}</span>
      <span className="text-[8px] uppercase tracking-widest text-white/30">{day.condition}</span>
      <div className="flex items-center gap-1 text-[8px] text-blue-300/60 mt-1">
        <CloudRain size={8} /> {day.rainChance}
      </div>
    </div>
  );
}
