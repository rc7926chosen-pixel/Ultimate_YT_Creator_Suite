import { Settings, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentItem {
  id: string;
  title: string;
  views: number;
  publishedAt: string;
  isAiEnhanced: boolean;
  isTrending: boolean;
  thumbnailUrl?: string;
}

interface ArchivePanelProps {
  content: ContentItem[];
}

export default function ArchivePanel({ content }: ArchivePanelProps) {
  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <div className="glassmorphism rounded-xl p-6" data-testid="archive-panel">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 text-white">📁</div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Living Archive</h3>
            <p className="text-sm text-slate-400">AI-enhanced content management</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {content.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <p>No content found. Start uploading your videos to begin archive management.</p>
          </div>
        ) : (
          <>
            {content.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                data-testid={`content-item-${item.id}`}
              >
                <img 
                  src={item.thumbnailUrl || "https://pixabay.com/get/ga846ef0fc3de4aebabdeaac62c3575df788fe385006340d1fdcf303dc4c41e255e101be8c00fcb1307a92e404bd0c536a9b60bc7e11587d239a4b21175794116_1280.jpg"} 
                  alt="Video thumbnail" 
                  className="w-16 h-10 rounded object-cover" 
                />
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-400">
                    {formatViews(item.views)} views • {formatDate(item.publishedAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {item.isAiEnhanced && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                      AI Enhanced
                    </span>
                  )}
                  {item.isTrending && (
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                      Trending
                    </span>
                  )}
                  {!item.isAiEnhanced && (
                    <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full">
                      Ready to Remaster
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-1">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full py-3 border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
              data-testid="button-scan-opportunities"
            >
              <Plus className="w-4 h-4 mr-2" />
              Scan for More Opportunities
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
