import { useState } from 'react';
import { LocationIcon, AssetIcon, ComponentIcon } from './icons';
import { TreeNode } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="tree-item"
    >
      <motion.div
        className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer"
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
        whileTap={{ scale: 0.98 }}
      >
        {node.children.length > 0 && (
          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="text-gray-500">
            ▼
          </motion.span>
        )}
        {getIcon()}
        <span className="text-sm">{node.name}</span>
        {node.sensorType && <span className="text-xs text-gray-500 ml-2">({node.sensorType})</span>}
      </motion.div>

      <AnimatePresence>
        {isExpanded && node.children.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="children"
          >
            {node.children.map((child: TreeNode) => (
              <TreeItem key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
