import React from 'react';

type Props = {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
};

export default function Sparkline({ data, width = 120, height = 28, stroke = '#60a5fa', fill = 'rgba(96,165,250,0.12)' }: Props) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `M0,${height} L${points} L${width},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="inline-block align-middle">
      <path d={areaPath} fill={fill} />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
