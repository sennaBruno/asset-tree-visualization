import axios from 'axios';
import { Asset, Company, Location } from '../types';
import { buildTreeStructure } from '../utils/treeBuilder';

const api = axios.create({
  baseURL: 'https://fake-api.tractian.com',
});

export const getCompanies = () => api.get<Company[]>('/companies');

export const getLocations = (companyId: string) =>
  api.get<Location[]>(`/companies/${companyId}/locations`);

export const getAssets = (companyId: string) => api.get<Asset[]>(`/companies/${companyId}/assets`);

export const getCompanyTree = async (companyId: string) => {
  const [locationsResponse, assetsResponse] = await Promise.all([
    getLocations(companyId),
    getAssets(companyId),
  ]);

  return buildTreeStructure(locationsResponse.data, assetsResponse.data);
};

export default api;
