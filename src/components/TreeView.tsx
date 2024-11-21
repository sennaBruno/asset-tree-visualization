import { useState } from 'react';
import { TreeNode } from '../types';
import { TreeItem } from './TreeItem';
import { SearchInput } from './SearchInput';
import { filterTree } from '../utils/treeFilter';

interface TreeViewProps {
  data: TreeNode[];
  className?: string;
}

export const TreeView = ({ data, className = '' }: TreeViewProps) => {
  const [searchText, setSearchText] = useState('');
  const filteredData = filterTree(data, searchText);

  return (
    <div className={`flex flex-col ${className}`}>
      <SearchInput value={searchText} onChange={setSearchText} placeholder="Buscar por nome..." />
      <div className="tree-view border rounded-lg overflow-auto">
        {filteredData.map((node) => (
          <TreeItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};
