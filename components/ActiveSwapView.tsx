
import React, { useState, useEffect, useRef } from 'react';
import { ActiveSwap } from '../types';
// Fix: Added User to the imports from lucide-react to resolve "Cannot find name 'User'" error.
import { Mic, MicOff, Video, VideoOff, MessageSquare, PhoneOff, FileText, Monitor, Cpu, User } from 'lucide-react';

interface ActiveSwapViewProps {
  swap: ActiveSwap;
  onComplete: () => void;
}

const ActiveSwapView: React.FC<ActiveSwapViewProps> = ({ swap, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(swap.duration);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isAiActive, setIsAiActive] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const participants = swap.participants || [swap.expert];

  useEffect(() => {
    async function setupMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }

    setupMedia();

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => (track.enabled = !isMicOn));
      setIsMicOn(!isMicOn);
    }
  };

  const toggleCam = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => (track.enabled = !isCamOn));
      setIsCamOn(!isCamOn);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (timeLeft / swap.duration) * 100;

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col space-y-8 animate-in fade-in duration-1000">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="px-6 py-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center space-x-4 shadow-2xl">
            <span className="relative flex h-3.5 w-3.5">
              <span className={`absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 ${timeLeft < 60 ? 'animate-ping' : ''}`}></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
            </span>
            <span className="text-white font-mono font-black text-2xl tracking-tighter">{formatTime(timeLeft)}</span>
          </div>
          <div className="hidden sm:block">
            <h2 className="text-2xl font-black text-white tracking-tight">
              {swap.isGroup ? 'Technical Group Broadcast' : `Swap Session: ${swap.expert.displayName.split(' ')[0]}`}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <Monitor size={12} /> Live P2P Connection
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsAiActive(!isAiActive)}
            className={`px-6 py-4 rounded-2xl border transition-all flex items-center space-x-3 font-black text-sm uppercase tracking-widest ${
              isAiActive 
                ? 'bg-indigo-500/40 text-indigo-100 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
            }`}
          >
            <Cpu size={18} className={isAiActive ? 'animate-spin' : ''} />
            <span>AI Moderator</span>
          </button>
          <button 
            onClick={onComplete}
            className="px-8 py-4 bg-red-500/20 backdrop-blur-md hover:bg-red-600/30 text-red-100 border border-red-500/40 font-black rounded-2xl transition-all shadow-xl shadow-red-500/10 flex items-center space-x-3 uppercase tracking-widest text-sm"
          >
            <PhoneOff size={18} />
            <span>End Call</span>
          </button>
        </div>
      </header>

      <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
        <div 
          className="absolute h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 relative bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] p-6 border border-white/10 shadow-2xl overflow-hidden flex flex-col">
          
          {/* Main Video Grid */}
          <div className={`flex-1 grid gap-4 ${
            participants.length > 2 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {/* Local Video Card */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-800 border border-white/5 group">
              <video 
                ref={localVideoRef} 
                autoPlay 
                muted 
                playsInline 
                className={`w-full h-full object-cover transform scale-x-[-1] ${!isCamOn ? 'opacity-0' : 'opacity-100'}`} 
              />
              {!isCamOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                  <User size={48} className="text-slate-700" />
                </div>
              )}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-xs font-bold border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                You (Host)
              </div>
            </div>

            {/* Remote Participant Cards (Simulated/Placeholders) */}
            {participants.map((p, idx) => (
              <div key={p.uid} className="relative rounded-3xl overflow-hidden bg-slate-800 border border-white/5 group shadow-2xl">
                <img 
                  src={`https://picsum.photos/seed/${p.uid}/800/600`} 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-[5000ms] group-hover:scale-105" 
                  alt={p.displayName} 
                />
                <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                   <div className="flex gap-1">
                      <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
                      <div className="w-1 h-2 bg-emerald-500/50 rounded-full mt-1"></div>
                      <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                   </div>
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-white text-xs font-bold border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  {p.displayName}
                </div>
              </div>
            ))}
          </div>

          {/* Persistent Floating Control Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-20">
            <button 
              onClick={toggleMic}
              className={`p-6 rounded-[1.5rem] backdrop-blur-xl transition-all duration-300 border shadow-2xl ${isMicOn ? 'bg-white/10 text-white hover:bg-white/20 border-white/20' : 'bg-red-500 text-white border-red-400/50'}`}
            >
              {isMicOn ? <Mic size={28} /> : <MicOff size={28} />}
            </button>
            <button 
              onClick={toggleCam}
              className={`p-6 rounded-[1.5rem] backdrop-blur-xl transition-all duration-300 border shadow-2xl ${isCamOn ? 'bg-white/10 text-white hover:bg-white/20 border-white/20' : 'bg-red-500 text-white border-red-400/50'}`}
            >
              {isCamOn ? <Video size={28} /> : <VideoOff size={28} />}
            </button>
            <button className="p-6 bg-indigo-600/20 backdrop-blur-xl text-white hover:bg-indigo-600/40 rounded-[1.5rem] border border-indigo-500/40 transition-all shadow-2xl">
              <MessageSquare size={28} />
            </button>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex flex-col shadow-2xl">
          <div className="p-8 border-b border-white/5">
            <h3 className="font-black text-white flex items-center space-x-4 uppercase tracking-widest text-sm">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>{isAiActive ? 'AI Live Transcription' : 'Session Notes'}</span>
            </h3>
          </div>
          <div className="flex-1 p-8 flex flex-col space-y-6 overflow-y-auto custom-scrollbar">
            {isAiActive ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 animate-in slide-in-from-right-4">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Cpu size={12} className="text-white" />
                  </div>
                  <p className="text-sm text-slate-300">"I'm analyzing the context of your {swap.problem.substring(0, 15)} discussions..."</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10 opacity-50">
                  <p className="text-sm text-slate-400 italic">Listening for expert insights...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2">Topic</p>
                  <p className="text-slate-300 text-sm italic leading-relaxed">"{swap.problem}"</p>
                </div>
                <textarea
                  placeholder="Collaborative notes go here..."
                  className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-700 focus:outline-none resize-none text-base leading-relaxed"
                />
              </>
            )}
          </div>
          <div className="p-6 bg-indigo-500/5 border-t border-white/5">
             <div className="flex justify-between items-center text-[10px] text-slate-500 font-black uppercase tracking-widest">
                <span>Signal: Excellent</span>
                <span>Latency: 42ms</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSwapView;
