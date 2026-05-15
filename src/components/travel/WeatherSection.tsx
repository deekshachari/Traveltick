import { Thermometer, Sun, Shirt, Sparkles, AlertTriangle } from "lucide-react";
import { WeatherSummary, DailyWeather } from "../../types/plan";
import ForecastCard from "./ForecastCard";

interface WeatherSectionProps {
  summary: WeatherSummary;
  daily: DailyWeather[];
}

export default function WeatherSection({ summary, daily }: WeatherSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 flex items-center gap-2">
        <Thermometer size={14} /> Weather Forecast
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <Sun className="text-yellow-400" size={20} />
            <div>
              <span className="text-[8px] uppercase tracking-widest text-white/30 block">Conditions</span>
              <span className="text-sm font-bold text-white">{summary.overallCondition}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shirt className="text-blue-400" size={20} />
            <div>
              <span className="text-[8px] uppercase tracking-widest text-white/30 block">Clothing</span>
              <span className="text-xs text-white/70">{summary.clothingSuggestion}</span>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <Sparkles className="text-purple-400" size={20} />
            <div>
              <span className="text-[8px] uppercase tracking-widest text-white/30 block">Best Day to Explore</span>
              <span className="text-sm font-bold text-white">{summary.bestDayToExplore}</span>
            </div>
          </div>
          {summary.weatherWarning && (
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange-400" size={20} />
              <div>
                <span className="text-[8px] uppercase tracking-widest text-white/30 block">Warning</span>
                <span className="text-xs text-orange-400/80 font-bold">{summary.weatherWarning}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Daily Weather Cards */}
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {daily.map((day, idx) => (
          <ForecastCard key={idx} day={day} />
        ))}
      </div>
    </section>
  );
}
