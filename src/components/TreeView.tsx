import { useState } from 'react';
import { TreeNode } from '../types';
import { TreeItem } from './TreeItem';
import { SearchInput } from './SearchInput';
import { TreeFilters, FilterOptions } from './TreeFilters';
import { filterTree } from '../utils/treeFilter';

interface TreeViewProps {
  data: TreeNode[];
  className?: string;
}

export const TreeView = ({ data, className = '' }: TreeViewProps) => {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    energySensors: false,
    criticalStatus: false,
  });

  const filteredData = filterTree(data, searchText, filters);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Ativos</h1>
        <div className="flex gap-2">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            placeholder="Buscar Ativo ou Local"
          />
          <TreeFilters filters={filters} onFilterChange={setFilters} />
        </div>
      </div>
      <div className="tree-view border border-gray-200 rounded-lg overflow-auto bg-white">
        {filteredData.map((node) => (
          <TreeItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};
