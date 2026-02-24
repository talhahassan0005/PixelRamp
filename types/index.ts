export type ProjectTier = 'low' | 'medium' | 'high';

export interface TierDetails {
  name: string;
  description: string;
  priceRange: string;
  features: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  selectedTier?: ProjectTier;
  createdAt: Date;
}
