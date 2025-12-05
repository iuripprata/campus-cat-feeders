import { cn } from '@/lib/utils';
import { FeederStatus, getStatusColor } from '@/data/feeders';

interface StatusIndicatorProps {
  status: FeederStatus;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export function StatusIndicator({ status, size = 'md', pulse = false }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full',
        sizeClasses[size],
        getStatusColor(status),
        pulse && status === 'error' && 'animate-pulse-gentle'
      )}
    />
  );
}
