
import React, { useState } from 'react';
import { Profile } from '../types';
import { findBestMatch } from '../services/geminiService';
import { Search, BrainCircuit, X, Check, Star, AlertCircle, Users } from 'lucide-react';

interface GetHelpViewProps {
  experts: Profile[];
  onMatchAccepted: (expert: Profile, problem: string, isGroup: boolean) => void;
}

const GetHelpView: React.FC<GetHelpViewProps> = ({ experts, onMatchAccepted }) => {
  const [problem, setProblem] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [matchedExpert, setMatchedExpert] = useState<Profile | null>(null);
  const [noMatchFound, setNoMatchFound] = useState(false);

  const handleSearch = async () => {
    if (!problem.trim()) return;
    
    setIsSearching(true);
    setMatchedExpert(null);
    setNoMatchFound(false);

    const onlineExperts = experts.filter(e => e.status === 'Online');
    const bestUid = await findBestMatch(problem, onlineExperts);
    
    setIsSearching(false);
    
    if (bestUid) {
      const expert = experts.find(e => e.uid === bestUid);
      if (expert) {
        setMatchedExpert(expert);
      } else {
        setNoMatchFound(true);
      }
    } else {
      setNoMatchFound(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black text-white tracking-tight">AI Matching Engine</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">Deeply technical problems require precise expertise. Gemini AI will find your perfect collaborator.</p>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 lg:p-14 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-br-full blur-2xl"></div>
        
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center space-x-3">
            <BrainCircuit size={16} className="text-indigo-400" />
            <span>Problem Definition</span>
          </label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="I'm facing a complex memory leak in a Node.js worker thread application..."
            className="w-full h-48 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-slate-100 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all resize-none text-xl leading-relaxed shadow-inner"
          />
        </div>

        <div className="flex justify-end space-x-4">
           <button
            onClick={handleSearch}
            disabled={isSearching || !problem.trim()}
            className="px-10 py-5 bg-indigo-600/20 backdrop-blur-md hover:bg-indigo-600/30 disabled:opacity-30 text-white font-black rounded-3xl border border-indigo-500/40 transition-all shadow-2xl flex items-center space-x-4 group"
          >
            {isSearching ? (
              <>
                <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                <span className="text-xl">Matching...</span>
              </>
            ) : (
              <>
                <Search size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-xl">Find the Specialist</span>
              </>
            )}
          </button>
        </div>
      </div>

      {matchedExpert && (
        <div className="bg-emerald-500/5 backdrop-blur-3xl border border-emerald-500/30 rounded-[2.5rem] p-12 lg:p-16 space-y-10 animate-in zoom-in-95 duration-500 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500 to-indigo-500 rounded-[2.5rem] blur opacity-40 animate-pulse"></div>
              <img 
                src={`https://picsum.photos/seed/${matchedExpert.uid}/200/200`} 
                className="relative w-40 h-40 rounded-[2.5rem] border-4 border-slate-900 shadow-2xl object-cover"
                alt=""
              />
            </div>
            <div className="text-center md:text-left space-y-4">
              <span className="inline-block bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-500/40">AI-Ranked Specialist</span>
              <h3 className="text-5xl font-black text-white tracking-tight">{matchedExpert.displayName}</h3>
              <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">Expert in: <span className="text-slate-200">{matchedExpert.expertise}</span></p>
              
              <div className="flex items-center justify-center md:justify-start space-x-2 text-amber-400">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill={s <= 4 ? "currentColor" : "none"} />)}
                <span className="ml-2 font-black text-xl">{matchedExpert.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 relative z-10">
            <button 
              onClick={() => onMatchAccepted(matchedExpert, problem, false)}
              className="flex-1 py-6 bg-emerald-500/20 backdrop-blur-md hover:bg-emerald-500/30 text-emerald-50 font-black rounded-3xl border border-emerald-500/50 shadow-2xl transition-all text-2xl flex items-center justify-center space-x-4 group"
            >
              <Check size={28} className="group-hover:scale-125 transition-transform" />
              <span>1:1 Session</span>
            </button>
            <button 
              onClick={() => onMatchAccepted(matchedExpert, problem, true)}
              className="flex-1 py-6 bg-indigo-500/20 backdrop-blur-md hover:bg-indigo-500/30 text-indigo-50 font-black rounded-3xl border border-indigo-500/50 shadow-2xl transition-all text-2xl flex items-center justify-center space-x-4 group"
            >
              <Users size={28} className="group-hover:scale-125 transition-transform" />
              <span>Group Broadcast</span>
            </button>
            <button 
              onClick={() => setMatchedExpert(null)}
              className="px-10 py-6 bg-white/5 backdrop-blur-md hover:bg-white/10 text-slate-400 font-black rounded-3xl border border-white/10 transition-all text-xl"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {noMatchFound && (
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-16 text-center animate-in zoom-in-95 duration-500 shadow-2xl">
          <div className="w-24 h-24 bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
            <AlertCircle size={48} className="text-slate-500" />
          </div>
          <h3 className="text-3xl font-black text-white mb-4">No Direct Expert Match</h3>
          <p className="text-slate-400 max-w-md mx-auto text-lg leading-relaxed">Try adjusting your keywords or start a broadcast to see who picks up.</p>
        </div>
      )}
    </div>
  );
};

export default GetHelpView;
