import { useState } from 'react';
import { LocationIcon, AssetIcon, ComponentIcon } from './icons';
import { TreeNode } from '../types';

interface TreeItemProps {
  node: TreeNode;
  level?: number;
}

export const TreeItem = ({ node, level = 0 }: TreeItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getIcon = () => {
    switch (node.type) {
      case 'location':
        return <LocationIcon className="text-blue-500" />;
      case 'asset':
        return <AssetIcon className="text-green-500" />;
      case 'component':
        return (
          <ComponentIcon className={`text-${node.status === 'alert' ? 'red' : 'yellow'}-500`} />
        );
    }
  };

  return (
    <div className="tree-item">
      <div
        className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer"
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {node.children.length > 0 && (
          <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
        )}
        {getIcon()}
        <span className="text-sm">{node.name}</span>
        {node.sensorType && <span className="text-xs text-gray-500 ml-2">({node.sensorType})</span>}
      </div>

      {isExpanded && node.children.length > 0 && (
        <div className="children">
          {node.children.map((child: TreeNode) => (
            <TreeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
