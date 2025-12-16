import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { feeders, FeederStatus } from '@/data/feeders';
import 'mapbox-gl/dist/mapbox-gl.css';

// TODO: Replace with your Mapbox public token from https://mapbox.com/
const MAPBOX_TOKEN = 'YOUR_MAPBOX_PUBLIC_TOKEN';

const getStatusColor = (status: FeederStatus): string => {
  const colors = {
    ok: '#66BB6A',
    warning: '#FFB74D',
    error: '#EF5350',
  };
  return colors[status];
};

export function FeederMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('mapbox_token');
    return saved || (MAPBOX_TOKEN !== 'YOUR_MAPBOX_PUBLIC_TOKEN' ? MAPBOX_TOKEN : '');
  });

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      localStorage.setItem('mapbox_token', tokenInput.trim());
      setToken(tokenInput.trim());
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !token) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-38.5361123, -3.7440688],
      zoom: 16,
      pitch: 45,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each feeder
    feeders.forEach((feeder) => {
      const el = document.createElement('div');
      el.className = 'feeder-marker';
      el.innerHTML = `
        <div style="
          background-color: ${getStatusColor(feeder.status)};
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <svg style="transform: rotate(45deg); width: 14px; height: 14px;" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="8"/>
          </svg>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 12px; min-width: 200px; font-family: Inter, sans-serif;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background: ${getStatusColor(feeder.status)};"></span>
            <strong style="font-size: 14px; color: #333;">${feeder.name}</strong>
          </div>
          <p style="font-size: 12px; color: #666; margin-bottom: 12px;">${feeder.location}</p>
          <div style="font-size: 12px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #666;">Food Level:</span>
              <span style="font-weight: 500;">${feeder.foodLevel}%</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666;">Temperature:</span>
              <span style="font-weight: 500;">${feeder.temperature}°C</span>
            </div>
          </div>
          <a href="/feeder/${feeder.id}" style="
            display: block;
            text-align: center;
            padding: 8px 16px;
            background: #66BB6A;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
          ">View Details</a>
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat([feeder.coordinates[1], feeder.coordinates[0]])
        .setPopup(popup)
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [token]);

  if (!token) {
    return (
      <div className="h-full w-full rounded-lg overflow-hidden shadow-sm border border-border bg-card flex items-center justify-center">
        <div className="p-6 max-w-md text-center space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Mapbox Token Required</h3>
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox public token to view the map. Get one free at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="pk.eyJ1..."
              className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground"
            />
            <button
              onClick={handleTokenSubmit}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-sm border border-border">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}
