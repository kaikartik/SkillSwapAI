
import React, { useState, useEffect, useCallback } from 'react';
import { User, Profile, View, ActiveSwap, PulseEvent } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProfileView from './components/ProfileView';
import GetHelpView from './components/GetHelpView';
import ActiveSwapView from './components/ActiveSwapView';
import PulseView from './components/PulseView';
import { Sparkles } from 'lucide-react';

const MOCK_EXPERTS: Profile[] = [
  { uid: 'exp1', displayName: 'Dr. Jane Smith', expertise: 'Advanced React, Node.js, System Architecture', status: 'Online', rating: 4.9 },
  { uid: 'exp2', displayName: 'Marcus Chen', expertise: 'UI/UX Design, Figma, Tailwind CSS expert', status: 'Online', rating: 4.7 },
  { uid: 'exp3', displayName: 'Sarah Johnson', expertise: 'Python, Data Science, Machine Learning models', status: 'Online', rating: 4.8 },
  { uid: 'exp4', displayName: 'Alex Rivera', expertise: 'Firebase, Cloud Functions, Security rules', status: 'Online', rating: 4.5 },
  { uid: 'exp5', displayName: 'Emily Wong', expertise: 'Next.js, Server Components, SEO optimization', status: 'Offline', rating: 5.0 },
];

const INITIAL_PULSE: PulseEvent[] = [
  { id: 'p1', message: 'Sarah Johnson helped Jane with a Python debug session!', timestamp: Date.now() - 1000 * 60 * 30 },
  { id: 'p2', message: 'Marcus Chen mentored David on Figma prototyping.', timestamp: Date.now() - 1000 * 60 * 120 },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('Dashboard');
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [activeSwap, setActiveSwap] = useState<ActiveSwap | null>(null);
  const [pulseEvents, setPulseEvents] = useState<PulseEvent[]>(INITIAL_PULSE);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      const mockUser: User = {
        uid: 'user123',
        displayName: 'Dev Enthusiast',
        email: 'dev@example.com',
        photoURL: 'https://picsum.photos/seed/user123/100/100'
      };
      setCurrentUser(mockUser);
      setUserProfile({
        uid: mockUser.uid,
        displayName: mockUser.displayName,
        expertise: 'React, TypeScript, CSS',
        status: 'Online',
        rating: 4.2
      });
      setIsAuthenticating(false);
    }, 1000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('Dashboard');
  };

  const startSwap = (expert: Profile, problem: string, isGroup: boolean = false) => {
    if (!currentUser) return;
    
    const participants = isGroup 
      ? [expert, ...MOCK_EXPERTS.filter(e => e.uid !== expert.uid && e.status === 'Online').slice(0, 2)]
      : [expert];

    const newSwap: ActiveSwap = {
      id: `swap_${Date.now()}`,
      expert,
      requester: currentUser,
      problem,
      startTime: Date.now(),
      duration: 900,
      isGroup,
      participants
    };
    setActiveSwap(newSwap);
    setCurrentView('ActiveSwap');
    
    const newPulse: PulseEvent = {
      id: `pulse_${Date.now()}`,
      message: `${isGroup ? 'Group Session started' : expert.displayName + ' is helping'} with: ${problem.substring(0, 30)}...`,
      timestamp: Date.now()
    };
    setPulseEvents(prev => [newPulse, ...prev]);
  };

  const completeSwap = () => {
    if (activeSwap) {
      const completionPulse: PulseEvent = {
        id: `comp_${Date.now()}`,
        message: `Success! ${activeSwap.isGroup ? 'The Group' : activeSwap.expert.displayName} finished helping ${activeSwap.requester.displayName}.`,
        timestamp: Date.now()
      };
      setPulseEvents(prev => [completionPulse, ...prev]);
    }
    setActiveSwap(null);
    setCurrentView('Dashboard');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-10 text-center space-y-8 z-10">
          <div className="w-20 h-20 bg-indigo-600/30 backdrop-blur-md rounded-2xl border border-indigo-400/30 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">SkillSwap <span className="text-indigo-500">AI</span></h1>
            <p className="text-slate-400 mt-4 leading-relaxed">The next-generation peer-to-peer expertise exchange platform powered by Gemini AI.</p>
          </div>
          <button
            onClick={handleLogin}
            disabled={isAuthenticating}
            className="w-full py-4 px-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 group"
          >
            {isAuthenticating ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            <span className="text-lg">{isAuthenticating ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 selection:bg-indigo-500/30">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        logout={handleLogout} 
        activeSwapId={activeSwap?.id}
      />
      
      <main className="flex-1 overflow-y-auto p-4 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {currentView === 'Dashboard' && (
            <Dashboard 
              user={currentUser} 
              activeSwap={activeSwap} 
              pulse={pulseEvents.slice(0, 3)}
              setView={setCurrentView}
            />
          )}
          
          {currentView === 'Profile' && userProfile && (
            <ProfileView 
              profile={userProfile} 
              setProfile={setUserProfile} 
            />
          )}
          
          {currentView === 'GetHelp' && (
            <GetHelpView 
              experts={MOCK_EXPERTS} 
              onMatchAccepted={(expert, problem, isGroup) => startSwap(expert, problem, isGroup)}
            />
          )}
          
          {currentView === 'ActiveSwap' && activeSwap && (
            <ActiveSwapView 
              swap={activeSwap} 
              onComplete={completeSwap} 
            />
          )}
          
          {currentView === 'Pulse' && (
            <PulseView events={pulseEvents} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
