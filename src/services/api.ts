import axios, { AxiosError } from 'axios';
import { Asset, Company, Location, TreeNode } from '../types';
import { API_CONFIG } from '../config/api';
import { buildTreeStructure } from '../utils/treeBuilder';

const api = axios.create(API_CONFIG);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Tratar erro de autenticação
      console.error('Erro de autenticação');
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const companyService = {
  getAll: async (): Promise<ApiResponse<Company[]>> => {
    try {
      const response = await api.get<Company[]>('/companies');
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      return { data: [], error: 'Erro ao carregar empresas' };
    }
  },

  getLocations: async (companyId: string): Promise<ApiResponse<Location[]>> => {
    try {
      const response = await api.get<Location[]>(`/companies/${companyId}/locations`);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
      return { data: [], error: 'Erro ao carregar locais' };
    }
  },

  getAssets: async (companyId: string): Promise<ApiResponse<Asset[]>> => {
    try {
      const response = await api.get<Asset[]>(`/companies/${companyId}/assets`);
      return { data: response.data };
    } catch (error) {
      console.error('Erro ao buscar ativos:', error);
      return { data: [], error: 'Erro ao carregar ativos' };
    }
  },

  getCompanyTree: async (companyId: string): Promise<ApiResponse<TreeNode[]>> => {
    try {
      const [locationsResponse, assetsResponse] = await Promise.all([
        companyService.getLocations(companyId),
        companyService.getAssets(companyId),
      ]);

      if (locationsResponse.error || assetsResponse.error) {
        throw new Error('Erro ao carregar dados da empresa');
      }

      const treeData = buildTreeStructure(locationsResponse.data, assetsResponse.data);
      return { data: treeData };
    } catch (error) {
      console.error('Erro ao construir árvore:', error);
      return { data: [], error: 'Erro ao carregar estrutura da empresa' };
    }
  },
};

export default api;
