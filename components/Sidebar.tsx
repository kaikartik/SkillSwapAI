
import React from 'react';
import { View } from '../types';
import { LayoutDashboard, User, HelpCircle, Zap, LogOut, Sparkles } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  logout: () => void;
  activeSwapId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, logout, activeSwapId }) => {
  const navItems: { label: string; view: View; icon: React.ReactNode }[] = [
    { label: 'Dashboard', view: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'My Profile', view: 'Profile', icon: <User size={20} /> },
    { label: 'Get Help', view: 'GetHelp', icon: <HelpCircle size={20} /> },
    { label: 'Community Pulse', view: 'Pulse', icon: <Zap size={20} /> },
  ];

  return (
    <div className="w-20 lg:w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen sticky top-0 transition-all z-50">
      <div className="p-8 flex items-center space-x-4 overflow-hidden">
        <div className="w-12 h-12 bg-indigo-600/20 backdrop-blur-md rounded-2xl border border-indigo-500/30 flex-shrink-0 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="hidden lg:block text-2xl font-black tracking-tight text-white whitespace-nowrap">SkillSwap</h2>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
              currentView === item.view 
                ? 'bg-indigo-600/20 backdrop-blur-md text-indigo-400 border border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.15)]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className={`${currentView === item.view ? 'text-indigo-400' : 'group-hover:text-slate-200 group-hover:scale-110 transition-transform'}`}>
              {item.icon}
            </span>
            <span className="hidden lg:block font-semibold tracking-wide">{item.label}</span>
          </button>
        ))}

        {activeSwapId && (
          <button
            onClick={() => setView('ActiveSwap')}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all group mt-8 ${
              currentView === 'ActiveSwap' 
                ? 'bg-emerald-600/20 backdrop-blur-md text-emerald-400 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                : 'bg-emerald-600/10 backdrop-blur-sm text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
            }`}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="hidden lg:block font-bold">Active Session</span>
          </button>
        )}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={20} />
          <span className="hidden lg:block font-semibold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
