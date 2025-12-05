import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { feeders, FeederStatus } from '@/data/feeders';
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
        <svg style="transform: rotate(45deg); width: 14px; height: 14px;" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="12" r="8"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export function FeederMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [40.4168, -3.7038],
      zoom: 15,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add markers for each feeder
    feeders.forEach((feeder) => {
      const marker = L.marker(feeder.coordinates, {
        icon: createCustomIcon(feeder.status),
      }).addTo(map);

      const statusColors = {
        ok: '#66BB6A',
        warning: '#FFB74D',
        error: '#EF5350',
      };

      marker.bindPopup(`
        <div style="padding: 12px; min-width: 200px; font-family: Inter, sans-serif;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background: ${statusColors[feeder.status]};"></span>
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
    });

    // Fit bounds to show all markers
    if (feeders.length > 0) {
      const bounds = L.latLngBounds(feeders.map(f => f.coordinates));
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    mapRef.current = map;
    setMounted(true);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-sm border border-border">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}
