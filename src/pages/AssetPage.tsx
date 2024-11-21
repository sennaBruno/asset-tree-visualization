import { useCompanyData } from '../hooks/useCompanyData';
import { TreeView } from '../components/TreeView';
import { motion, AnimatePresence } from 'framer-motion';

export const AssetPage = () => {
  const { companies, selectedCompany, treeData, loading, error, setSelectedCompany, refreshData } =
    useCompanyData();

  const renderCompanyButtons = () => (
    <div className="flex gap-2 mb-6">
      {companies.map((company) => (
        <button
          key={company.id}
          onClick={() => setSelectedCompany(company)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedCompany?.id === company.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {company.name} Unit
        </button>
      ))}
    </div>
  );

  if (loading && !selectedCompany) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500">
          Carregando empresas...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderCompanyButtons()}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <span className="text-gray-500">Carregando dados...</span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-64 gap-4"
          >
            <p className="text-red-500">{error}</p>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Tentar novamente
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="tree"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TreeView data={treeData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
