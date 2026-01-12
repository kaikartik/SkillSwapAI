
export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export interface Profile {
  uid: string;
  displayName: string;
  expertise: string;
  status: 'Online' | 'Offline';
  rating: number;
}

export interface SwapRequest {
  id: string;
  requesterUid: string;
  requesterName: string;
  problemDescription: string;
  timestamp: number;
}

export interface ActiveSwap {
  id: string;
  expert: Profile;
  requester: User;
  problem: string;
  startTime: number;
  duration: number; // in seconds
  isGroup?: boolean;
  participants?: Profile[];
}

export interface PulseEvent {
  id: string;
  message: string;
  timestamp: number;
}

export type View = 'Dashboard' | 'Profile' | 'GetHelp' | 'ActiveSwap' | 'Pulse';
