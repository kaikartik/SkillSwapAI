
import React, { useState } from 'react';
import { Profile } from '../types';
// Added Activity to the imports
import { Save, User as UserIcon, CheckCircle, Globe, Shield, Activity } from 'lucide-react';

interface ProfileViewProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, setProfile }) => {
  const [expertise, setExpertise] = useState(profile.expertise);
  const [status, setStatus] = useState(profile.status);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setProfile({
        ...profile,
        expertise,
        status
      });
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 lg:p-14 space-y-12 shadow-2xl relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={`https://picsum.photos/seed/${profile.uid}/200/200`} 
              className="relative w-32 h-32 rounded-[2rem] border-4 border-slate-900 shadow-2xl object-cover"
              alt="Profile"
            />
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-4 border-slate-900 flex items-center justify-center shadow-xl ${status === 'Online' ? 'bg-emerald-500' : 'bg-slate-600'}`}>
              <div className="w-3 h-3 rounded-full bg-white/40 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-4xl font-black text-white tracking-tight">{profile.displayName}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1.5 bg-indigo-500/20 backdrop-blur-md text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-black uppercase tracking-widest flex items-center space-x-2">
                <Shield size={12} />
                <span>Expert Verified</span>
              </span>
              <span className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-black uppercase tracking-widest flex items-center space-x-2">
                <CheckCircle size={12} />
                <span>4.9 Avg Rating</span>
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-10 relative z-10">
          <div className="space-y-4">
            <label className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center space-x-3">
              <Globe size={16} className="text-indigo-400" />
              <span>Domain Knowledge</span>
            </label>
            <textarea
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              placeholder="What are your core competencies?"
              className="w-full h-36 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 transition-all resize-none shadow-inner text-lg leading-relaxed"
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center space-x-3">
              <Activity size={16} className="text-emerald-400" />
              <span>Availability Pulse</span>
            </label>
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => setStatus('Online')}
                className={`flex items-center justify-center space-x-4 py-5 px-8 rounded-3xl border-2 transition-all duration-300 group ${
                  status === 'Online' 
                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-100 font-black shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                    : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${status === 'Online' ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-lg">Online</span>
              </button>
              <button
                onClick={() => setStatus('Offline')}
                className={`flex items-center justify-center space-x-4 py-5 px-8 rounded-3xl border-2 transition-all duration-300 group ${
                  status === 'Offline' 
                    ? 'border-slate-500/50 bg-slate-800/80 text-slate-200 font-black shadow-xl' 
                    : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <span className="text-lg">Offline</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-5 bg-indigo-600/20 backdrop-blur-md hover:bg-indigo-600/30 text-white font-black rounded-3xl border border-indigo-500/40 shadow-2xl shadow-indigo-600/20 transition-all flex items-center justify-center space-x-4 group"
          >
            {isSaving ? (
              <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-xl">Update Identity</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
