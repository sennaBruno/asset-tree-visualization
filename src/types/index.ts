export interface Location {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Asset {
  id: string;
  name: string;
  parentId?: string | null;
  locationId?: string | null;
  sensorId?: string;
  sensorType?: 'energy' | 'vibration';
  status?: 'operating' | 'alert';
  gatewayId?: string;
}

export interface Company {
  id: string;
  name: string;
}
