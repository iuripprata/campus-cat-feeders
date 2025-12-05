import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Droplets, Thermometer, Clock, Cpu } from 'lucide-react';
import { FeederSidebar } from '@/components/FeederSidebar';
import { FoodLevelGauge } from '@/components/FoodLevelGauge';
import { DataCard } from '@/components/DataCard';
import { ConfirmFeedModal } from '@/components/ConfirmFeedModal';
import { StatusIndicator } from '@/components/StatusIndicator';
import { Button } from '@/components/ui/button';
import { getFeederById, getStatusLabel } from '@/data/feeders';
import { format } from 'date-fns';

const FeederDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const feeder = getFeederById(id || '');

  if (!feeder) {
    return (
      <div className="flex h-screen bg-surface">
        <FeederSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Feeder Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested feeder doesn't exist.</p>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Map
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const lastUpdateDate = new Date(feeder.lastUpdate);

  return (
    <div className="flex h-screen bg-surface">
      <FeederSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">
                    {feeder.name} - {feeder.location}
                  </h1>
                  <StatusIndicator status={feeder.status} size="lg" pulse />
                </div>
                <p className="text-muted-foreground">{getStatusLabel(feeder.status)}</p>
              </div>
            </div>
          </div>

          {/* Data Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Food Level Card - Larger */}
            <div className="md:col-span-1 bg-card rounded-xl p-6 shadow-sm border border-border flex flex-col items-center justify-center">
              <FoodLevelGauge value={feeder.foodLevel} />
            </div>

            {/* Other Sensors */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DataCard
                title="Humidity"
                value={feeder.humidity}
                unit="%"
                icon={Droplets}
                iconColor="bg-blue-100"
              />
              <DataCard
                title="Temperature"
                value={feeder.temperature}
                unit="°C"
                icon={Thermometer}
                iconColor="bg-orange-100"
              />
            </div>
          </div>

          {/* Manual Control Card */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Manual Control</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground">
                  Release food manually. Use this option if automatic feeding is insufficient.
                </p>
              </div>
              <Button 
                onClick={() => setShowConfirmModal(true)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-lg font-semibold rounded-xl shadow-md transition-all hover:shadow-lg"
              >
                LIBERAR ALIMENTO
              </Button>
            </div>
          </div>

          {/* Device Info */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Device Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Update</p>
                  <p className="text-sm font-medium text-foreground">
                    {format(lastUpdateDate, 'MMM d, yyyy HH:mm')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                <Cpu className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Device ID</p>
                  <p className="text-sm font-medium text-foreground font-mono">
                    {feeder.deviceId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ConfirmFeedModal
          open={showConfirmModal}
          onOpenChange={setShowConfirmModal}
          feederName={`${feeder.name} - ${feeder.location}`}
        />
      </main>
    </div>
  );
};

export default FeederDetails;
