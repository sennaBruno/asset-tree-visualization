import { useState, useEffect } from 'react';
import { TreeNode, Company } from '../types';
import { companyService } from '../services/api';

interface UseCompanyDataReturn {
  companies: Company[];
  selectedCompany: Company | null;
  treeData: TreeNode[];
  initialLoading: boolean;
  loading: boolean;
  error: string | null;
  setSelectedCompany: (company: Company) => void;
  refreshData: () => Promise<void>;
}

export function useCompanyData(): UseCompanyDataReturn {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = async () => {
    try {
      setInitialLoading(true);
      const response = await companyService.getCompanies();

      if (response.error) {
        setError(response.error);
        return;
      }

      setCompanies(response.data);

      if (response.data.length > 0) {
        setSelectedCompany(response.data[0]);
      }
    } catch (error) {
      setError('Erro ao carregar empresas');
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchTreeData = async (companyId: string) => {
    setLoading(true);
    setError(null);

    const response = await companyService.getCompanyTree(companyId);
    if (response.error) {
      setError(response.error);
    } else {
      setTreeData(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      fetchTreeData(selectedCompany.id);
    }
  }, [selectedCompany]);

  return {
    companies,
    selectedCompany,
    treeData,
    initialLoading,
    loading,
    error,
    setSelectedCompany,
    refreshData: () => (selectedCompany ? fetchTreeData(selectedCompany.id) : Promise.resolve()),
  };
}
