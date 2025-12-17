import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FeederSidebar } from '@/components/FeederSidebar';
import { FeederMap } from '@/components/FeederMap';
import { feeders } from '@/data/feeders';
import { StatusIndicator } from '@/components/StatusIndicator';
import { MapPin, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  return (
    <div className="flex h-screen bg-surface">
      <FeederSidebar />
      
      {/* Desktop Layout */}
      <main className="hidden md:flex flex-1 p-4 md:p-6">
        <div className="h-full flex flex-col w-full">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Mapa dos Alimentadores</h2>
            <p className="text-muted-foreground">Monitore os alimentadores</p>
          </div>
          <div className="flex-1">
            <FeederMap />
          </div>
        </div>
      </main>

      {/* Mobile Layout */}
      <main className="flex md:hidden flex-col flex-1 overflow-hidden">
        {/* Fullscreen Map Overlay */}
        {isMapFullscreen && (
          <div className="fixed inset-0 z-50 bg-background">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-[60] bg-background"
              onClick={() => setIsMapFullscreen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="h-full w-full">
              <FeederMap />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-4 pb-2">
          <h2 className="text-xl font-semibold text-foreground">Mapa dos Alimentadores</h2>
          <p className="text-sm text-muted-foreground">Monitore os alimentadores</p>
        </div>

        {/* Map Section */}
        <div className="px-4 pb-2">
          <div className="relative h-48 rounded-lg overflow-hidden border border-border">
            <FeederMap />
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-2 right-2 gap-1"
              onClick={() => setIsMapFullscreen(true)}
            >
              <Maximize2 className="h-4 w-4" />
              Expandir
            </Button>
          </div>
        </div>

        {/* Feeders List */}
        <div className="flex-1 overflow-auto px-4 pb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Todos os Alimentadores ({feeders.length})
          </h3>
          <div className="space-y-2">
            {feeders.map((feeder) => (
              <Link
                key={feeder.id}
                to={`/feeder/${feeder.id}`}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors',
                  'bg-card border border-border hover:bg-accent'
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
