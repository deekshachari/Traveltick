import { AlertTriangle, CheckCircle2, CloudSun, MapPin } from "lucide-react";
import { ClimateCompatibility as ClimateCompatibilityType } from "../../types/plan";

interface ClimateCompatibilityProps {
  data: ClimateCompatibilityType;
}

export default function ClimateCompatibility({ data }: ClimateCompatibilityProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-orange-400";
    return "text-red-400";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Excellent Match") return <CheckCircle2 className="text-green-400" size={20} />;
    if (status === "Moderate Match") return <CloudSun className="text-orange-400" size={20} />;
    return <AlertTriangle className="text-red-400" size={20} />;
  };

  const getStatusBg = (status: string) => {
    if (status === "Excellent Match") return "bg-green-500/10 border-green-500/20";
    if (status === "Moderate Match") return "bg-orange-500/10 border-orange-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <section className="space-y-6">
      <div className={`p-6 rounded-[2.5rem] border ${getStatusBg(data.status)} space-y-4`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {getStatusIcon(data.status)}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{data.status}</h3>
              <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Climate Compatibility</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-3xl font-display font-bold ${getScoreColor(data.score)}`}>{data.score}%</span>
          </div>
        </div>

        <p className="text-sm text-white/80 leading-relaxed italic">
          {data.message}
        </p>

        {data.alternatives.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 block">Smart Alternatives</span>
            <div className="flex flex-wrap gap-2">
              {data.alternatives.map((alt, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70 hover:bg-white/10 transition-all cursor-default">
                  <MapPin size={10} className="text-blue-400" />
                  {alt}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
