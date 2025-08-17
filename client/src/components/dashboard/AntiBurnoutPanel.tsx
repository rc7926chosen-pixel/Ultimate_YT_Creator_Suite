import { Leaf, CheckCircle, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WellnessData {
  id?: string;
  creativeEnergy: number;
  productivityScore: number;
  stressLevel: number;
  hoursWorked: string;
  breaksTaken: number;
  recommendedBreakTime?: string;
}

interface AntiBurnoutPanelProps {
  wellness?: WellnessData;
}

export default function AntiBurnoutPanel({ wellness }: AntiBurnoutPanelProps) {
  const getWellnessStatus = () => {
    if (!wellness) {
      return {
        status: "Optimal State",
        message: "Creative energy levels are healthy. Maintain current workflow pace.",
        color: "emerald",
        icon: CheckCircle
      };
    }

    if (wellness.stressLevel > 70) {
      return {
        status: "High Stress Detected",
        message: "Consider taking a break to maintain optimal performance.",
        color: "amber",
        icon: CheckCircle
      };
    }

    if (wellness.creativeEnergy < 30) {
      return {
        status: "Low Energy Alert",
        message: "Your creative energy is depleted. Rest is recommended.",
        color: "red",
        icon: CheckCircle
      };
    }

    return {
      status: "Optimal State",
      message: "Creative energy levels are healthy. Maintain current workflow pace.",
      color: "emerald",
      icon: CheckCircle
    };
  };

  const calculateBreakCountdown = () => {
    if (wellness?.recommendedBreakTime) {
      const breakTime = new Date(wellness.recommendedBreakTime);
      const now = new Date();
      const diff = breakTime.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      }
    }
    return "2h 34m"; // Default fallback
  };

  const statusInfo = getWellnessStatus();

  return (
    <div className="glassmorphism rounded-xl p-6" data-testid="anti-burnout-panel">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Wellness Guard</h3>
            <p className="text-sm text-slate-400">Burnout prevention</p>
          </div>
        </div>
        <div className="w-3 h-3 bg-emerald-500 rounded-full pulse-wellness"></div>
      </div>
      
      <div className="space-y-4">
        <div className={`bg-${statusInfo.color}-500/10 border border-${statusInfo.color}-500/20 rounded-lg p-4`}>
          <div className="flex items-center space-x-3 mb-2">
            <statusInfo.icon className={`w-4 h-4 text-${statusInfo.color}-400`} />
            <span className={`text-sm font-medium text-${statusInfo.color}-300`}>{statusInfo.status}</span>
          </div>
          <p className="text-xs text-slate-300">{statusInfo.message}</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-2">Hours until recommended break</p>
          <div className="text-2xl font-bold text-white">{calculateBreakCountdown()}</div>
        </div>
        
        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          data-testid="button-schedule-break"
        >
          <CalendarPlus className="w-4 h-4 mr-2" />
          Schedule Mindful Break
        </Button>
      </div>
    </div>
  );
}
