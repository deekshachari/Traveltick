import { Utensils, Gem, Info } from "lucide-react";
import { ItineraryDay } from "../../types/plan";

interface ItineraryDayCardProps {
  day: ItineraryDay;
}

export function ItineraryDayCard({ day }: ItineraryDayCardProps) {
  return (
    <div className="relative pl-10 border-l border-white/10 space-y-5 pb-4">
      <div className="absolute -left-[5px] top-0 w-[11px] h-[11px] rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h4 className="text-xl font-display uppercase text-white/80">Day {day.day}</h4>
          <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400/60 italic">{day.theme}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border bg-blue-500/10 text-blue-400 border-blue-400/20">
            {day.weatherCondition}
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
          <div className="flex gap-4">
            <span className="text-blue-400 font-bold uppercase w-16 shrink-0 tracking-widest text-[9px]">Morning</span>
            <div>
              <p className="text-white font-bold mb-1">{day.morningActivity.title}</p>
              <p className="text-white/60 leading-relaxed">{day.morningActivity.description}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-blue-400 font-bold uppercase w-16 shrink-0 tracking-widest text-[9px]">Noon</span>
            <div>
              <p className="text-white font-bold mb-1">{day.afternoonActivity.title}</p>
              <p className="text-white/60 leading-relaxed">{day.afternoonActivity.description}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-blue-400 font-bold uppercase w-16 shrink-0 tracking-widest text-[9px]">Night</span>
            <div>
              <p className="text-white font-bold mb-1">{day.eveningActivity.title}</p>
              <p className="text-white/60 leading-relaxed">{day.eveningActivity.description}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-2xl bg-orange-400/5 border border-orange-400/10 flex items-center gap-3 text-[10px]">
            <Utensils size={14} className="text-orange-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-widest text-white/30">Food Spot</span>
              <span className="text-white/70 font-bold">{day.foodSpot.name} - <span className="text-orange-400/80">{day.foodSpot.speciality}</span></span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-purple-400/5 border border-purple-400/10 flex items-center gap-3 text-[10px]">
            <Gem size={14} className="text-purple-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-widest text-white/30">Hidden Gem</span>
              <span className="text-white/70 font-bold">{day.hiddenGem.name} - <span className="text-purple-400/80">{day.hiddenGem.whyVisit}</span></span>
            </div>
          </div>
        </div>

        {day.alternativeRainPlan && (
          <div className="p-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3 text-[10px]">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-[8px] flex items-center gap-2">
              <Info size={12} /> Weather Alternative:
            </span>
            <p className="text-white/60 mt-1">{day.alternativeRainPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Calendar } from "lucide-react";

interface ItineraryTimelineProps {
  itinerary: ItineraryDay[];
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  return (
    <section className="space-y-8">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400 border-b border-blue-400/20 pb-2 flex items-center gap-2">
        <Calendar size={14} /> Daily Itinerary
      </h3>
      <div className="space-y-8">
        {itinerary.map((day) => (
          <ItineraryDayCard key={day.day} day={day} />
        ))}
      </div>
    </section>
  );
}
