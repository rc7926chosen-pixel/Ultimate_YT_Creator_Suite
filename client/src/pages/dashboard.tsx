import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import OraclePanel from "@/components/dashboard/OraclePanel";
import ArchivePanel from "@/components/dashboard/ArchivePanel";
import CreativeRhythmPanel from "@/components/dashboard/CreativeRhythmPanel";
import BrandConnectPanel from "@/components/dashboard/BrandConnectPanel";
import AntiBurnoutPanel from "@/components/dashboard/AntiBurnoutPanel";
import IPManagementPanel from "@/components/dashboard/IPManagementPanel";
import AnalyticsPanel from "@/components/dashboard/AnalyticsPanel";
import InspirationModal from "@/components/dashboard/InspirationModal";

export default function Dashboard() {
  const [inspirationModalOpen, setInspirationModalOpen] = useState(false);
  
  // Mock creator ID - in a real app this would come from auth
  const creatorId = "creator-1";

  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ["/api/dashboard", creatorId],
    enabled: !!creatorId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-lg">Error loading dashboard data</div>
      </div>
    );
  }

  // Provide default values for safety
  const creator = dashboardData.creator || { channelName: "Creator" };
  const metrics = dashboardData.metrics || {
    totalRevenue: "0",
    archiveValue: "0",
    wellnessScore: 85,
    activeBrandDeals: 0,
    pendingBrandDeals: 0
  };
  const predictions = dashboardData.predictions || [];
  const recentContent = dashboardData.recentContent || [];
  const wellness = dashboardData.wellness || undefined;
  const brandDeals = dashboardData.brandDeals || [];
  const analytics = dashboardData.analytics || [];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <Header 
          user={{ 
            name: creator.channelName,
            role: "Creator"
          }}
          onInspireClick={() => setInspirationModalOpen(true)}
        />
        
        <div className="p-6 space-y-6">
          <MetricsGrid metrics={metrics} />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <OraclePanel predictions={predictions} />
              <ArchivePanel content={recentContent} />
            </div>
            
            <div className="space-y-6">
              <CreativeRhythmPanel wellness={wellness} />
              <BrandConnectPanel brandDeals={brandDeals} />
              <AntiBurnoutPanel wellness={wellness} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <IPManagementPanel creatorId={creatorId} />
            <AnalyticsPanel analytics={analytics} />
          </div>
        </div>
      </main>
      
      <InspirationModal 
        open={inspirationModalOpen}
        onClose={() => setInspirationModalOpen(false)}
      />
    </div>
  );
}
