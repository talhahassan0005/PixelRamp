export interface User {
  _id?: string;
  email: string;
  name?: string;
  supabaseId: string;
  tier?: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  tier: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  budget?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  _id?: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  tier: 'low' | 'medium' | 'high';
  requirements: string;
  qualified: boolean;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  createdAt: Date;
}

export interface ChatMessage {
  _id?: string;
  userId?: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
