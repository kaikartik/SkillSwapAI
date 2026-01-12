
import React from 'react';
import { User, ActiveSwap, PulseEvent, View } from '../types';
// Added Zap to the imports
import { Clock, Award, Target, ExternalLink, Activity, Rocket, Zap } from 'lucide-react';

interface DashboardProps {
  user: User;
  activeSwap: ActiveSwap | null;
  pulse: PulseEvent[];
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, activeSwap, pulse, setView }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white leading-tight tracking-tight">Welcome back, <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{user.displayName.split(' ')[0]}</span></h1>
          <p className="text-slate-400 mt-2 text-lg">Your expertise is in high demand today. Ready to help?</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setView('GetHelp')}
            className="px-8 py-4 bg-indigo-600/20 backdrop-blur-md hover:bg-indigo-600/30 text-indigo-100 font-bold rounded-2xl border border-indigo-500/40 transition-all shadow-xl shadow-indigo-500/10 flex items-center space-x-3 group"
          >
            <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            <span>Get Help Now</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: <Clock className="text-indigo-400" />, label: 'Knowledge Shared', value: '12.5 Hours', color: 'indigo' },
          { icon: <Award className="text-emerald-400" />, label: 'Karma Points', value: '450 XP', color: 'emerald' },
          { icon: <Target className="text-amber-400" />, label: 'Match Score', value: '98%', color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
            <div className={`w-14 h-14 bg-${stat.color}-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-${stat.color}-500/20`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-white mt-2 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center space-x-3">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>Live Session</span>
            </h2>
          </div>
          <div className="p-8">
            {activeSwap ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-5 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                  <img src={`https://picsum.photos/seed/${activeSwap.expert.uid}/100/100`} alt="" className="w-16 h-16 rounded-2xl border border-white/10 shadow-lg" />
                  <div>
                    <h4 className="text-lg font-bold text-white leading-tight">{activeSwap.expert.displayName}</h4>
                    <p className="text-slate-400 text-sm mt-1">Solving: {activeSwap.problem.substring(0, 30)}...</p>
                  </div>
                </div>
                <button 
                  onClick={() => setView('ActiveSwap')}
                  className="w-full py-4 bg-emerald-500/20 backdrop-blur-md hover:bg-emerald-500/30 text-emerald-100 font-bold rounded-2xl border border-emerald-500/40 transition-all flex items-center justify-center space-x-3"
                >
                  <ExternalLink size={20} />
                  <span>Resume Session</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-slate-800/50 backdrop-blur-md rounded-full flex items-center justify-center mx-auto border border-white/5">
                  <Activity className="w-8 h-8 text-slate-600" />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">No active swaps currently.</p>
                  <p className="text-slate-600 text-sm mt-1">Matches usually take less than 60 seconds.</p>
                </div>
                <button 
                  onClick={() => setView('GetHelp')}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-indigo-400 font-bold rounded-xl border border-indigo-500/20 transition-all text-sm"
                >
                  Find an Expert &rarr;
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center space-x-3">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span>Real-time Pulse</span>
            </h2>
            <button onClick={() => setView('Pulse')} className="text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors uppercase tracking-widest">See Feed</button>
          </div>
          <div className="divide-y divide-white/5">
            {pulse.map((event) => (
              <div key={event.id} className="p-8 flex items-start space-x-5 hover:bg-white/5 transition-colors group">
                <div className="w-2.5 h-2.5 mt-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform" />
                <div className="flex-1">
                  <p className="text-slate-200 text-sm font-medium leading-relaxed">{event.message}</p>
                  <span className="text-slate-500 text-xs mt-2 block font-bold">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
