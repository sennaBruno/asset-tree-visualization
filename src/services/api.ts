import axios, { AxiosError } from 'axios';
import { Asset, Company, Location, TreeNode } from '../types';
import { API_CONFIG } from '../config/api';
import { buildTreeStructure } from '../utils/treeBuilder';

const api = axios.create(API_CONFIG);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('Erro na requisição:', error.message);
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const companyService = {
  getCompanies: async (): Promise<ApiResponse<Company[]>> => {
    try {
      const response = await api.get<Company[]>('/companies');
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      return { data: [], error: 'Não foi possível carregar as empresas' };
    }
  },

  getLocations: async (companyId: string): Promise<ApiResponse<Location[]>> => {
    try {
      const response = await api.get<Location[]>(`/companies/${companyId}/locations`);
      const locations = Array.isArray(response.data) ? response.data : [];
      return { data: locations };
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
      return { data: [], error: 'Não foi possível carregar os locais' };
    }
  },

  getAssets: async (companyId: string): Promise<ApiResponse<Asset[]>> => {
    try {
      const response = await api.get<Asset[]>(`/companies/${companyId}/assets`);
      const assets = Array.isArray(response.data) ? response.data : [];
      return { data: assets };
    } catch (error) {
      console.error('Erro ao buscar ativos:', error);
      return { data: [], error: 'Não foi possível carregar os ativos' };
    }
  },

  getCompanyTree: async (companyId: string): Promise<ApiResponse<TreeNode[]>> => {
    try {
      const [locationsResponse, assetsResponse] = await Promise.all([
        companyService.getLocations(companyId),
        companyService.getAssets(companyId),
      ]);

      if (locationsResponse.error || assetsResponse.error) {
        return {
          data: [],
          error: locationsResponse.error || assetsResponse.error,
        };
      }

      if (!Array.isArray(locationsResponse.data) || !Array.isArray(assetsResponse.data)) {
        throw new Error('Dados inválidos recebidos da API');
      }

      const treeData = buildTreeStructure(locationsResponse.data, assetsResponse.data);
      return { data: treeData };
    } catch (error) {
      console.error('Erro ao construir árvore:', error);
      return { data: [], error: 'Não foi possível construir a estrutura de dados' };
    }
  },
};

export default api;
