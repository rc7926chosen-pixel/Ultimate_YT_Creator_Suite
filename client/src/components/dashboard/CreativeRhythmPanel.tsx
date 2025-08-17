import { Brain, Lightbulb } from "lucide-react";

interface WellnessData {
  id?: string;
  creativeEnergy: number;
  productivityScore: number;
  stressLevel: number;
  hoursWorked: string;
  breaksTaken: number;
}

interface CreativeRhythmPanelProps {
  wellness?: WellnessData;
}

export default function CreativeRhythmPanel({ wellness }: CreativeRhythmPanelProps) {
  // Mock data for weekly creative energy when no wellness data is available
  const weekDays = [
    { label: "M", energy: 0.8 },
    { label: "T", energy: 0.6 },
    { label: "W", energy: 0.9 },
    { label: "T", energy: 0.7 },
    { label: "F", energy: 0.5 },
    { label: "S", energy: 0.3 },
    { label: "S", energy: 0.3 },
  ];

  const getEnergyColor = (energy: number) => {
    if (energy >= 0.8) return "bg-emerald-500/80";
    if (energy >= 0.6) return "bg-emerald-500/60";
    if (energy >= 0.4) return "bg-amber-500/70";
    return "bg-slate-600";
  };

  const getEnergyHeight = (energy: number) => ({
    height: `${energy * 32}px` // max height of 32px (h-8)
  });

  return (
    <div className="glassmorphism rounded-xl p-6" data-testid="creative-rhythm-panel">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-wellness-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Creative Rhythm</h3>
            <p className="text-sm text-slate-400">Peak performance analysis</p>
          </div>
        </div>
      </div>
      
      {/* Productivity Heatmap */}
      <div className="mb-4">
        <p className="text-sm text-slate-400 mb-3">This Week's Creative Energy</p>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-slate-400 mb-1">{day.label}</div>
              <div 
                className={`rounded ${getEnergyColor(day.energy)}`}
                style={getEnergyHeight(day.energy)}
                data-testid={`energy-bar-${day.label}`}
              ></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* AI Recommendations */}
      <div className="bg-wellness-500/10 border border-wellness-500/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-wellness-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lightbulb className="w-3 h-3 text-wellness-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-wellness-300 mb-1">AI Insight</p>
            <p className="text-xs text-slate-300">
              {wellness ? 
                `Your current energy level is ${wellness.creativeEnergy}/100. Consider scheduling complex edits during peak hours.` :
                "Your peak creativity is Tuesday-Wednesday mornings. Consider scheduling complex edits during these windows."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
