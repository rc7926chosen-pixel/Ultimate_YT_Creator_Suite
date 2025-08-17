import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, Bookmark, RefreshCw, X } from "lucide-react";

interface InspirationModalProps {
  open: boolean;
  onClose: () => void;
}

export default function InspirationModal({ open, onClose }: InspirationModalProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { data: inspiration, isLoading, refetch } = useQuery({
    queryKey: ["/api/inspiration/random", refreshTrigger],
    enabled: open,
  });

  const handleGetNew = () => {
    setRefreshTrigger(prev => prev + 1);
    refetch();
  };

  const defaultInspiration = {
    title: "The Fibonacci Sequence in Architecture",
    description: "Explore how mathematical principles create visual harmony in modern building design. This concept could inspire video structure, thumbnail composition, or even content pacing rhythms.",
    imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["Mathematics", "Design", "Philosophy"],
    category: "Architecture"
  };

  const currentInspiration = inspiration || defaultInspiration;
  const tags = currentInspiration.tags || [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-2xl glassmorphism border-slate-700 text-white" 
        data-testid="inspiration-modal"
      >
        <DialogHeader className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-wellness-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Random Inspiration</h2>
          <p className="text-slate-400">Breaking the algorithm bubble</p>
        </DialogHeader>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-slate-400">Generating inspiration...</p>
          </div>
        ) : (
          <>
            <div className="bg-slate-700/50 rounded-xl p-6 mb-6">
              <img 
                src={currentInspiration.imageUrl} 
                alt="Inspiration" 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              <h3 className="text-lg font-bold text-white mb-2">{currentInspiration.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{currentInspiration.description}</p>
              <div className="flex items-center space-x-2">
                {tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${
                      index === 0 ? "bg-purple-500/20 text-purple-400" :
                      index === 1 ? "bg-blue-500/20 text-blue-400" :
                      "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-wellness-600 hover:bg-wellness-700 text-white"
                data-testid="button-save-inspiration"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save for Later
              </Button>
              <Button 
                onClick={handleGetNew}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white"
                data-testid="button-get-new-inspiration"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Get Another
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                className="px-6 border-slate-600 text-slate-300 hover:bg-slate-700"
                data-testid="button-close-inspiration"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
