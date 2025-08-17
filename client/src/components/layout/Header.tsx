import { Bell, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: {
    name: string;
    role: string;
  };
  onInspireClick: () => void;
}

export default function Header({ user, onInspireClick }: HeaderProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Creator Business OS</h2>
          <p className="text-sm text-slate-400">
            Welcome back, <span className="text-white">{user.name}</span> • Today's Performance: <span className="text-emerald-500">+12.3%</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Inspire Me Button */}
          <Button
            onClick={onInspireClick}
            className="inspire-glow bg-gradient-to-r from-wellness-500 to-purple-600 hover:from-wellness-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105"
            data-testid="button-inspire-me"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Inspire Me
          </Button>
          
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-slate-400 hover:text-white transition-colors"
              data-testid="button-notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-xs rounded-full flex items-center justify-center text-white">
                3
              </span>
            </Button>
          </div>
          
          {/* Profile */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
              alt="User profile" 
              className="w-10 h-10 rounded-full border-2 border-slate-600" 
            />
            <div className="text-sm">
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-slate-400">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
