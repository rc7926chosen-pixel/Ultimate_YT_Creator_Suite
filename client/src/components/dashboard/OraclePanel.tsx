import { ExternalLink, Eye, DollarSign, TrendingUp, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OraclePrediction {
  id: string;
  predictionType: string;
  title: string;
  description: string;
  confidence: number;
  projectedViews?: number;
  projectedRevenue?: string;
  growthPercentage?: number;
  isUrgent: boolean;
}

interface OraclePanelProps {
  predictions: OraclePrediction[];
}

export default function OraclePanel({ predictions }: OraclePanelProps) {
  const formatNumber = (num?: number) => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-emerald-400 bg-emerald-500/20";
    if (confidence >= 70) return "text-amber-400 bg-amber-500/20";
    return "text-slate-400 bg-slate-500/20";
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 90) return "High Confidence";
    if (confidence >= 70) return "Medium Confidence";
    return "Low Confidence";
  };

  const getBorderColor = (isUrgent: boolean, confidence: number) => {
    if (isUrgent) return "border-amber-500";
    if (confidence >= 90) return "border-emerald-500";
    return "border-primary-500";
  };

  return (
    <div className="glassmorphism rounded-xl p-6" data-testid="oracle-panel">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 text-white">🔮</div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Oracle Predictions</h3>
            <p className="text-sm text-slate-400">AI-powered market insights</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {predictions.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <p>No predictions available. AI is analyzing market trends...</p>
          </div>
        ) : (
          predictions.slice(0, 2).map((prediction) => (
            <div 
              key={prediction.id} 
              className={`bg-slate-700/50 rounded-lg p-4 border-l-4 ${getBorderColor(prediction.isUrgent, prediction.confidence)}`}
              data-testid={`prediction-${prediction.id}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">
                    {prediction.predictionType === "blue_ocean" ? "Blue Ocean Opportunity" : "Trend Alert"}
                  </h4>
                  <p className="text-sm text-slate-300 mb-2">{prediction.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    {prediction.projectedViews && (
                      <span>
                        <Eye className="w-3 h-3 mr-1 inline" />
                        Projected: {formatNumber(prediction.projectedViews)} views
                      </span>
                    )}
                    {prediction.projectedRevenue && (
                      <span>
                        <DollarSign className="w-3 h-3 mr-1 inline" />
                        Revenue: ${prediction.projectedRevenue}K
                      </span>
                    )}
                    {prediction.growthPercentage && (
                      <span>
                        <TrendingUp className="w-3 h-3 mr-1 inline" />
                        Growth: +{prediction.growthPercentage}%
                      </span>
                    )}
                    {prediction.isUrgent && (
                      <span>
                        <Clock className="w-3 h-3 mr-1 inline" />
                        Act within 48h
                      </span>
                    )}
                    {prediction.predictionType === "trend_alert" && (
                      <span>
                        <Flame className="w-3 h-3 mr-1 inline" />
                        Trending: +180%
                      </span>
                    )}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(prediction.confidence)}`}>
                  {getConfidenceText(prediction.confidence)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
