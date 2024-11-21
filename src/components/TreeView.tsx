import { TreeNode } from '../types';
import { TreeItem } from './TreeItem';

interface TreeViewProps {
  data: TreeNode[];
  className?: string;
}

export const TreeView = ({ data, className = '' }: TreeViewProps) => {
  return (
    <div className={`tree-view border rounded-lg overflow-auto ${className}`}>
      {data.map((node) => (
        <TreeItem key={node.id} node={node} />
      ))}
    </div>
  );
};
