import { Link, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { feeders } from '@/data/feeders';
import { StatusIndicator } from './StatusIndicator';
import { Cat, MapPin } from 'lucide-react';

function SidebarContent() {
  const { id } = useParams();

  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Cat className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Cat Feeder Monitor</h1>
            <p className="text-xs text-muted-foreground">Campus Network</p>
          </div>
        </Link>
      </div>

      {/* Feeder List */}
      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
          Todos os Alimentadores ({feeders.length})
        </h2>
        <nav className="space-y-1">
          {feeders.map((feeder) => (
            <Link
              key={feeder.id}
              to={`/feeder/${feeder.id}`}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors',
                'hover:bg-accent',
                id === feeder.id ? 'bg-accent' : ''
              )}
            >
              <StatusIndicator status={feeder.status} pulse />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {feeder.name}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{feeder.location}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {feeder.foodLevel}%
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-semibold text-status-ok">
              {feeders.filter(f => f.status === 'ok').length}
            </p>
            <p className="text-xs text-muted-foreground">OK</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-status-warning">
              {feeders.filter(f => f.status === 'warning').length}
            </p>
            <p className="text-xs text-muted-foreground">Low</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-status-error">
              {feeders.filter(f => f.status === 'error').length}
            </p>
            <p className="text-xs text-muted-foreground">Alert</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function FeederSidebar() {
  return (
    // Desktop only: Fixed sidebar
    <aside className="hidden md:flex w-80 bg-card border-r border-border flex-col h-full">
      <SidebarContent />
    </aside>
  );
}
