import React from 'react';
import { motion } from 'framer-motion';

type Tier = {
  name: string;
  price?: string;
  short?: string;
  features: string[];
  cta?: string;
  recommended?: boolean;
};

interface Props {
  tier: Tier;
}

export default function PricingCard({ tier }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(2,6,23,0.45)' }}
      transition={{ type: 'spring', stiffness: 160, damping: 18 }}
      className="p-6 bg-slate-800 rounded-lg border border-slate-700 flex flex-col"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-blue-600">{tier.name}</h3>
          {tier.recommended && (
            <span className="inline-block text-xs bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full font-semibold">Recommended</span>
          )}
        </div>
        {tier.price && <div className="text-2xl font-extrabold text-white">{tier.price}</div>}
      </div>

      {tier.short && <p className="text-slate-400 mt-3">{tier.short}</p>}

      <ul className="mt-4 space-y-3 flex-1">
        {tier.features.map((f, i) => (
          <li key={i} className="text-slate-400 flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded text-sm">
          {tier.cta ?? 'Get a Quote'}
        </motion.button>
        {tier.price && <span className="text-slate-400 text-sm">Starting at {tier.price.replace('From ', '')}</span>}
      </div>
    </motion.div>
  );
}
