import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { TreeView } from './components/TreeView';
import { TreeNode } from './types';
import { companyService } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await companyService.getCompanyTree('company-1');
        if (data.error) {
          setError(data.error);
        } else {
          setTreeData(data.data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <span className="text-gray-500">Carregando...</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64 text-red-500"
          >
            {error}
          </motion.div>
        ) : (
          <motion.div
            key="tree"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TreeView data={treeData} />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
