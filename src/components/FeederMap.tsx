import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { feeders, FeederStatus } from '@/data/feeders';
import { StatusIndicator } from './StatusIndicator';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createCustomIcon = (status: FeederStatus) => {
  const colors = {
    ok: '#66BB6A',
    warning: '#FFB74D',
    error: '#EF5350',
  };

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${colors[status]};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg style="transform: rotate(45deg); width: 16px; height: 16px; color: white;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

function MapController() {
  const map = useMap();
  
  useEffect(() => {
    // Fit bounds to show all markers
    if (feeders.length > 0) {
      const bounds = L.latLngBounds(feeders.map(f => f.coordinates));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map]);

  return null;
}

export function FeederMap() {
  const center: [number, number] = [40.4168, -3.7038];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-sm border border-border">
      <MapContainer
        center={center}
        zoom={15}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController />
        {feeders.map((feeder) => (
          <Marker
            key={feeder.id}
            position={feeder.coordinates}
            icon={createCustomIcon(feeder.status)}
          >
            <Popup>
              <div className="p-3 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <StatusIndicator status={feeder.status} size="md" />
                  <h3 className="font-semibold text-foreground">{feeder.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{feeder.location}</p>
                <div className="space-y-1 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Food Level:</span>
                    <span className="font-medium">{feeder.foodLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature:</span>
                    <span className="font-medium">{feeder.temperature}°C</span>
                  </div>
                </div>
                <Link
                  to={`/feeder/${feeder.id}`}
                  className="block w-full text-center py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
