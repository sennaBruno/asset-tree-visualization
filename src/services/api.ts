import axios from 'axios';
import { Asset } from '../types';
import { Company } from '../types';

const api = axios.create({
  baseURL: 'https://fake-api.tractian.com',
});

export const getCompanies = () => api.get<Company[]>('/companies');
export const getLocations = (companyId: string) =>
  api.get<Location[]>(`/companies/${companyId}/locations`);
export const getAssets = (companyId: string) => api.get<Asset[]>(`/companies/${companyId}/assets`);

export default api;
