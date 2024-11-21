import { useState, useEffect } from 'react';
import { TreeNode } from '../types';
import { companyService } from '../services/api';

interface UseCompanyDataReturn {
  treeData: TreeNode[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export function useCompanyData(companyId: string): UseCompanyDataReturn {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
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
    fetchData();
  }, [companyId]);

  return {
    treeData,
    loading,
    error,
    refreshData: fetchData,
  };
}
