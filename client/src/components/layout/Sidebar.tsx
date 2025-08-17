import { Video, BarChart3, Archive, Gem, Handshake, Shield, Heart } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { icon: BarChart3, label: "Dashboard", href: "/", active: true },
    { icon: Archive, label: "Living Archive", href: "/archive" },
    { icon: Gem, label: "Oracle Predictions", href: "/oracle" },
    { icon: Handshake, label: "Brand Connect", href: "/brands" },
    { icon: Shield, label: "IP Management", href: "/ip" },
    { icon: Heart, label: "Wellness Hub", href: "/wellness" },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-wellness-500 rounded-lg flex items-center justify-center">
            <Video className="text-white w-4 h-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Creator Studio</h1>
            <p className="text-xs text-slate-400">Business OS</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              item.active
                ? "bg-primary-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
            }`}
            data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      
      {/* Wellness Status Indicator */}
      <div className="p-4 border-t border-slate-700">
        <div className="glassmorphism rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">Creative Energy</span>
            <div className="w-3 h-3 bg-emerald-500 rounded-full pulse-wellness"></div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-wellness-500 h-2 rounded-full" 
              style={{ width: "78%" }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 mt-1">Optimal creative flow detected</p>
        </div>
      </div>
    </aside>
  );
}
