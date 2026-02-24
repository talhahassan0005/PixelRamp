import { TierDetails } from '@/types';

export const PROJECT_TIERS: Record<string, TierDetails> = {
  low: {
    name: 'Lower Tier',
    description: 'MVP / Basic Solutions',
    priceRange: '$500 - $2,000',
    features: ['Starter packages', 'Essential features', 'Basic support', 'Budget friendly'],
  },
  medium: {
    name: 'Medium Tier',
    description: 'Growth / Professional',
    priceRange: '$2,000 - $8,000',
    features: ['Business packages', 'Advanced features', 'Professional support', 'Market standard'],
  },
  high: {
    name: 'High Tier',
    description: 'Scaling / Premium',
    priceRange: '$8,000+',
    features: ['Enterprise packages', 'Custom solutions', 'Dedicated team', 'Premium pricing'],
  },
};
