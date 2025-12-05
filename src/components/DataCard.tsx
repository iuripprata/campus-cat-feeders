import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function DataCard({ title, value, unit, icon: Icon, iconColor, className }: DataCardProps) {
  return (
    <div className={cn(
      'bg-card rounded-xl p-6 shadow-sm border border-border',
      'transition-all duration-200 hover:shadow-md',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={cn(
          'p-2 rounded-lg',
          iconColor || 'bg-accent'
        )}>
          <Icon className="w-5 h-5 text-accent-foreground" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}
