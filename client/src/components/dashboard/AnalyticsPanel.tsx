import { TrendingUp } from "lucide-react";

interface AnalyticsData {
  id: string;
  platform: string;
  views: number;
  shares: number;
  websiteClicks: number;
  conversionRate: string;
}

interface AnalyticsPanelProps {
  analytics: AnalyticsData[];
}

export default function AnalyticsPanel({ analytics }: AnalyticsPanelProps) {
  // Aggregate analytics data
  const totalYouTubeViews = analytics
    .filter(a => a.platform === "youtube")
    .reduce((sum, a) => sum + (a.views || 0), 0);

  const totalShortsViews = analytics
    .filter(a => a.platform === "youtube_shorts")
    .reduce((sum, a) => sum + (a.views || 0), 0);

  const totalSocialShares = analytics
    .reduce((sum, a) => sum + (a.shares || 0), 0);

  const totalWebsiteVisits = analytics
    .reduce((sum, a) => sum + (a.websiteClicks || 0), 0);

  const avgConversionRate = analytics.length > 0 
    ? analytics.reduce((sum, a) => sum + parseFloat(a.conversionRate || "0"), 0) / analytics.length
    : 5.2;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const funnelData = [
    {
      label: "YouTube Views",
      value: formatNumber(totalYouTubeViews || 2400000),
      width: "100%",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      label: "Shorts Views", 
      value: formatNumber(totalShortsViews || 890000),
      width: "75%",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      label: "Social Shares",
      value: formatNumber(totalSocialShares || 45000),
      width: "45%",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      label: "Website Visits",
      value: formatNumber(totalWebsiteVisits || 12300),
      width: "20%",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="glassmorphism rounded-xl p-6" data-testid="analytics-panel">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Performance Funnel</h3>
            <p className="text-sm text-slate-400">Cross-platform analytics</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Funnel Visualization */}
        <div className="space-y-3">
          {funnelData.map((item, index) => (
            <div key={index} data-testid={`funnel-${item.label.toLowerCase().replace(' ', '-')}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{item.label}</span>
                <span className="text-sm font-medium text-white">{item.value}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                <div 
                  className={`bg-gradient-to-r ${item.gradient} h-2 rounded-full transition-all duration-500`}
                  style={{ width: item.width }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-slate-700">
          <div className="text-center">
            <p className="text-sm text-slate-400">Conversion Rate</p>
            <p className="text-2xl font-bold text-emerald-400">{avgConversionRate.toFixed(1)}%</p>
            <p className="text-xs text-emerald-400">+0.8% from last period</p>
          </div>
        </div>
      </div>
    </div>
  );
}
