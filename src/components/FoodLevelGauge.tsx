import { cn } from '@/lib/utils';

interface FoodLevelGaugeProps {
  value: number;
  size?: number;
}

export function FoodLevelGauge({ value, size = 160 }: FoodLevelGaugeProps) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const dashOffset = circumference - progress;

  const getColor = (val: number) => {
    if (val >= 50) return 'hsl(var(--status-ok))';
    if (val >= 25) return 'hsl(var(--status-warning))';
    return 'hsl(var(--status-error))';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{value}%</span>
        <span className="text-sm text-muted-foreground">Food Level</span>
      </div>
    </div>
  );
}
