import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BrandDeal {
  id: string;
  brandName: string;
  dealValue: string;
  description: string;
  status: string;
  matchScore: number;
}

interface BrandConnectPanelProps {
  brandDeals: BrandDeal[];
}

export default function BrandConnectPanel({ brandDeals }: BrandConnectPanelProps) {
  const pendingDeals = brandDeals.filter(deal => deal.status === "pending");
  const newDealsCount = pendingDeals.length;

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-emerald-400 bg-emerald-500/20";
    if (score >= 70) return "text-amber-400 bg-amber-500/20";
    return "text-slate-400 bg-slate-500/20";
  };

  const getBorderColor = (score: number) => {
    if (score >= 90) return "border-emerald-500";
    if (score >= 70) return "border-amber-500";
    return "border-slate-500";
  };

  return (
    <div className="glassmorphism rounded-xl p-6" data-testid="brand-connect-panel">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Handshake className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Brand Connect</h3>
            <p className="text-sm text-slate-400">Secure collaboration portal</p>
          </div>
        </div>
        {newDealsCount > 0 && (
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
            {newDealsCount} New
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {pendingDeals.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <p>No pending brand deals. Your AI agent is actively seeking opportunities.</p>
          </div>
        ) : (
          pendingDeals.slice(0, 2).map((deal) => (
            <div 
              key={deal.id} 
              className={`p-4 bg-slate-700/30 rounded-lg border-l-4 ${getBorderColor(deal.matchScore)}`}
              data-testid={`brand-deal-${deal.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white text-sm">{deal.brandName}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getMatchColor(deal.matchScore)}`}>
                  {deal.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                ${deal.dealValue} • {deal.description}
              </p>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 h-auto"
                  data-testid={`button-accept-${deal.id}`}
                >
                  Accept
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="text-xs bg-slate-600 hover:bg-slate-700 text-slate-300 px-3 py-1 h-auto"
                  data-testid={`button-negotiate-${deal.id}`}
                >
                  Negotiate
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
