
import React from 'react';
import { PulseEvent } from '../types';
import { Zap, Clock, TrendingUp, Heart } from 'lucide-react';

interface PulseViewProps {
  events: PulseEvent[];
}

const PulseView: React.FC<PulseViewProps> = ({ events }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-indigo-500/10 backdrop-blur-md rounded-3xl border border-indigo-500/20 mb-4">
          <TrendingUp className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-5xl font-black text-white tracking-tight">Community Pulse</h2>
        <p className="text-slate-400 text-lg font-medium">Monitoring knowledge velocity across the global network.</p>
      </div>

      <div className="space-y-6">
        {events.map((event, idx) => (
          <div 
            key={event.id} 
            className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] transition-all duration-500 hover:border-indigo-500/40 hover:bg-white/10 shadow-xl overflow-hidden"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {/* Background glow for cards */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
            
            <div className="flex items-start space-x-8 relative z-10">
              <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all border border-white/5">
                <Heart className="w-8 h-8 text-indigo-400 group-hover:fill-indigo-400 transition-all" />
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-slate-200 text-xl font-medium leading-relaxed tracking-tight">{event.message}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-slate-500 font-black uppercase tracking-widest text-[10px]">
                    <Clock size={12} />
                    <span>{new Date(event.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                  <span className="text-emerald-400 text-[10px] font-black px-3 py-1 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20 uppercase tracking-widest">Successful Swap</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-12">
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-full text-slate-500 text-xs font-black uppercase tracking-widest border border-white/5 shadow-2xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>Syncing with edge network...</span>
        </div>
      </div>
    </div>
  );
};

export default PulseView;
