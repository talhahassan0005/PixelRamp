'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PROJECT_TIERS } from '@/lib/tiers';
import { ProjectTier } from '@/types';

interface TierSelectorProps {
  selectedTier: ProjectTier | null;
  onSelect: (tier: ProjectTier) => void;
}

export default function TierSelector({ selectedTier, onSelect }: TierSelectorProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Object.entries(PROJECT_TIERS).map(([key, tier], i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(key as ProjectTier)}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            selectedTier === key
              ? 'border-blue-600 bg-blue-600/10'
              : 'border-slate-700 bg-slate-800 hover:border-blue-600/50'
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{tier.name}</h3>
            {selectedTier === key && <Check className="text-blue-600" size={24} />}
          </div>
          <p className="text-slate-400 mb-2">{tier.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">{tier.priceRange}</p>
          <ul className="space-y-2">
            {tier.features.map((feature, j) => (
              <li key={j} className="text-sm text-slate-400 flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
