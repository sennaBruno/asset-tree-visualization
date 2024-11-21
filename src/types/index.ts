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

export interface TreeNode {
  id: string;
  name: string;
  type: 'location' | 'asset' | 'component';
  children: TreeNode[];
  parentId?: string | null;
  locationId?: string | null;
  sensorType?: 'energy' | 'vibration';
  status?: 'operating' | 'alert';
}
