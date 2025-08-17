import { Shield, TriangleAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface IPManagementPanelProps {
  creatorId: string;
}

export default function IPManagementPanel({ creatorId }: IPManagementPanelProps) {
  const { data: violations, isLoading } = useQuery({
    queryKey: ["/api/ip-violations", creatorId],
    enabled: !!creatorId,
  });

  const activeViolations = violations?.filter((v: any) => v.status === "detected") || [];
  const resolvedViolations = violations?.filter((v: any) => v.status === "resolved") || [];
  
  const totalRecoveryRevenue = resolvedViolations.reduce((sum: number, v: any) => 
    sum + parseFloat(v.potentialRevenue || "0"), 0
  );
  
  const violationsArray = violations || [];

  return (
    <div className="glassmorphism rounded-xl p-6" data-testid="ip-management-panel">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">IP Protection</h3>
            <p className="text-sm text-slate-400">Content fingerprinting & rights management</p>
          </div>
        </div>
        {activeViolations.length > 0 && (
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
            {activeViolations.length} Violations
          </span>
        )}
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-slate-400">
            <p>Loading IP protection data...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-xs text-slate-400">Videos Monitored</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">{violationsArray.length}</div>
                <div className="text-xs text-slate-400">Active Claims</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">${totalRecoveryRevenue.toFixed(1)}K</div>
                <div className="text-xs text-slate-400">Recovery Revenue</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {activeViolations.length === 0 ? (
                <div className="text-center py-4 text-slate-400">
                  <p>No active violations detected. Your content is protected.</p>
                </div>
              ) : (
                activeViolations.slice(0, 2).map((violation: any) => (
                  <div 
                    key={violation.id} 
                    className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    data-testid={`violation-${violation.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <TriangleAlert className="w-4 h-4 text-red-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Unauthorized Reupload Detected</p>
                        <p className="text-xs text-slate-400">
                          {violation.originalContentId || "Tech Review #45"} - Channel: {violation.violatorChannel}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 h-auto"
                      data-testid={`button-claim-${violation.id}`}
                    >
                      Claim
                    </Button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
