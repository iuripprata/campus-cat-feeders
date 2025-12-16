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
    coordinates: [-3.7440688, -38.5361123],
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
    coordinates: [-3.7455, -38.5375],
    foodLevel: 32,
    humidity: 52,
    temperature: 23,
    status: 'warning',
    lastUpdate: '2024-12-05T10:28:00Z',
    deviceId: 'ESP32-CAT-002',
  },
  {
    id: '3',
    name: 'Feeder C',
    location: 'Engineering Block',
    coordinates: [-3.7425, -38.5345],
    foodLevel: 95,
    humidity: 38,
    temperature: 26,
    status: 'ok',
    lastUpdate: '2024-12-05T10:32:00Z',
    deviceId: 'ESP32-CAT-003',
  },
  {
    id: '4',
    name: 'Feeder D',
    location: 'Sports Complex',
    coordinates: [-3.7468, -38.5390],
    foodLevel: 12,
    humidity: 65,
    temperature: 22,
    status: 'error',
    lastUpdate: '2024-12-05T09:45:00Z',
    deviceId: 'ESP32-CAT-004',
  },
  {
    id: '5',
    name: 'Feeder E',
    location: 'Student Center',
    coordinates: [-3.7432, -38.5380],
    foodLevel: 68,
    humidity: 48,
    temperature: 24,
    status: 'ok',
    lastUpdate: '2024-12-05T10:29:00Z',
    deviceId: 'ESP32-CAT-005',
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
