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
      <SearchInput value={searchText} onChange={setSearchText} placeholder="Buscar por nome..." />
      <TreeFilters filters={filters} onFilterChange={setFilters} />
      <div className="tree-view border rounded-lg overflow-auto">
        {filteredData.map((node) => (
          <TreeItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};
