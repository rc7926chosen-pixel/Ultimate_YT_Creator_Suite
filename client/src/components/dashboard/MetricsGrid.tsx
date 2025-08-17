import { DollarSign, Archive, Heart, Handshake } from "lucide-react";

interface MetricsGridProps {
  metrics: {
    totalRevenue: string;
    archiveValue: string;
    wellnessScore: number;
    activeBrandDeals: number;
    pendingBrandDeals?: number;
  };
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  const metricCards = [
    {
      title: "Total Revenue",
      value: `$${metrics.totalRevenue}`,
      change: "+18.2% from last month",
      changeColor: "text-emerald-500",
      icon: DollarSign,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-500"
    },
    {
      title: "Archive Value", 
      value: `$${metrics.archiveValue}K`,
      change: "AI enhanced 23 videos",
      changeColor: "text-primary-400",
      icon: Archive,
      iconBg: "bg-primary-500/20",
      iconColor: "text-primary-500"
    },
    {
      title: "Wellness Score",
      value: `${metrics.wellnessScore}/100`,
      change: "Optimal creative flow",
      changeColor: "text-wellness-400",
      icon: Heart,
      iconBg: "bg-wellness-500/20 pulse-wellness",
      iconColor: "text-wellness-500"
    },
    {
      title: "Brand Deals",
      value: `${metrics.activeBrandDeals} Active`,
      change: `${metrics.pendingBrandDeals || 0} pending approval`,
      changeColor: "text-amber-400",
      icon: Handshake,
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metricCards.map((metric, index) => (
        <div key={index} className="glassmorphism rounded-xl p-6" data-testid={`metric-${metric.title.toLowerCase().replace(' ', '-')}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">{metric.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
              <p className={`text-sm mt-1 ${metric.changeColor}`}>{metric.change}</p>
            </div>
            <div className={`w-12 h-12 ${metric.iconBg} rounded-lg flex items-center justify-center`}>
              <metric.icon className={`${metric.iconColor} w-6 h-6`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
