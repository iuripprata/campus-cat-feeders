export type FeederStatus = 'ok' | 'warning' | 'error';

export interface Feeder {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  foodLevel: number;
  humidity: number;
  temperature: number;
  status: FeederStatus;
  lastUpdate: string;
  deviceId: string;
}

export const feeders: Feeder[] = [
  {
    id: '1',
    name: 'Feeder A',
    location: 'Central Building',
    coordinates: [-3.744591, -38.536715],
    foodLevel: 85,
    humidity: 45,
    temperature: 25,
    status: 'ok',
    lastUpdate: '2024-12-05T10:30:00Z',
    deviceId: 'ESP32-CAT-001',
  },
  {
    id: '2',
    name: 'Feeder B',
    location: 'Library Garden',
    coordinates: [-3.743853, -38.536317],
    foodLevel: 32,
    humidity: 52,
    temperature: 23,
    status: 'warning',
    lastUpdate: '2024-12-05T10:28:00Z',
    deviceId: 'ESP32-CAT-002',
  },
];

export const getFeederById = (id: string): Feeder | undefined => {
  return feeders.find(feeder => feeder.id === id);
};

export const getStatusColor = (status: FeederStatus): string => {
  switch (status) {
    case 'ok':
      return 'bg-status-ok';
    case 'warning':
      return 'bg-status-warning';
    case 'error':
      return 'bg-status-error';
    default:
      return 'bg-muted';
  }
};

export const getStatusLabel = (status: FeederStatus): string => {
  switch (status) {
    case 'ok':
      return 'Operating Normally';
    case 'warning':
      return 'Low Food Level';
    case 'error':
      return 'Needs Attention';
    default:
      return 'Unknown';
  }
};
