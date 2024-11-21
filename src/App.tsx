import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { TreeView } from './components/TreeView';
import { TreeNode } from './types';
import { companyService } from './services/api';

function App() {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await companyService.getCompanyTree('company-1');
        setTreeData(data.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-gray-500">Carregando...</span>
        </div>
      ) : (
        <TreeView data={treeData} />
      )}
    </Layout>
  );
}

export default App;
