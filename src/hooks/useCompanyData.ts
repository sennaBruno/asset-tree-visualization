import { useState, useEffect } from 'react';
import { TreeNode, Company } from '../types';
import { companyService } from '../services/api';

interface UseCompanyDataReturn {
  companies: Company[];
  selectedCompany: Company | null;
  treeData: TreeNode[];
  loading: boolean;
  error: string | null;
  setSelectedCompany: (company: Company) => void;
  refreshData: () => Promise<void>;
}

export function useCompanyData(): UseCompanyDataReturn {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    setLoading(true);
    const response = await companyService.getCompanies();
    console.log(response);
    if (response.error) {
      setError(response.error);
    } else {
      setCompanies(response.data);
      // Seleciona a Apex como empresa padrão
      const defaultCompany = response.data.find((c) => c.name === 'Apex');
      if (defaultCompany) {
        setSelectedCompany(defaultCompany);
      }
    }
    setLoading(false);
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
    fetchCompanies();
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
    loading,
    error,
    setSelectedCompany,
    refreshData: () => (selectedCompany ? fetchTreeData(selectedCompany.id) : Promise.resolve()),
  };
}
