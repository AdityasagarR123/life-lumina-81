import React from 'react';

interface RiskMeterProps {
  level: 'Low' | 'Moderate' | 'High';
  className?: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ level, className = '' }) => {
  const getColor = (currentLevel: string) => {
    switch (currentLevel) {
      case 'Low':
        return 'hsl(var(--success))';
      case 'Moderate':
        return 'hsl(var(--warning))';
      case 'High':
        return 'hsl(var(--destructive))';
      default:
        return 'hsl(var(--muted))';
    }
  };

  const getValue = () => {
    switch (level) {
      case 'Low':
        return 25;
      case 'Moderate':
        return 60;
      case 'High':
        return 85;
      default:
        return 0;
    }
  };

  const radius = 45;
  const strokeWidth = 8;
  const circumference = radius * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (getValue() / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width="120" height="80" viewBox="0 0 120 80" className="overflow-visible">
        {/* Background arc */}
        <path
          d="M 10 70 A 50 50 0 0 1 110 70"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.3}
        />
        {/* Risk level arc */}
        <path
          d="M 10 70 A 50 50 0 0 1 110 70"
          stroke={getColor(level)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${getColor(level)})`,
          }}
        />
        {/* Center indicator */}
        <circle
          cx="60"
          cy="70"
          r="4"
          fill={getColor(level)}
        />
      </svg>
      
      <div className="absolute bottom-0 text-center">
        <div className="text-sm font-medium text-foreground">{level} Risk</div>
      </div>
    </div>
  );
};