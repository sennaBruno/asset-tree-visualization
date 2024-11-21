import { TreeNode } from '../types';
import { FilterOptions } from '../components/TreeFilters';

export function filterTree(
  nodes: TreeNode[],
  searchText: string,
  filters: FilterOptions
): TreeNode[] {
  const searchLower = searchText.toLowerCase();

  function nodeMatches(node: TreeNode): boolean {
    const matchesText = !searchText || node.name.toLowerCase().includes(searchLower);
    const matchesEnergy = !filters.energySensors || node.sensorType === 'energy';
    const matchesCritical = !filters.criticalStatus || node.status === 'alert';

    return (
      matchesText &&
      (node.type === 'location' ||
        (node.type === 'component' && matchesEnergy && matchesCritical) ||
        (node.type === 'asset' && !filters.energySensors && !filters.criticalStatus))
    );
  }

  function filterNode(node: TreeNode): TreeNode | null {
    if (nodeMatches(node)) {
      return {
        ...node,
        children: node.children
          .map((child) => filterNode(child))
          .filter((child): child is TreeNode => child !== null),
      };
    }

    const filteredChildren = node.children
      .map((child) => filterNode(child))
      .filter((child): child is TreeNode => child !== null);

    if (filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
      };
    }

    return null;
  }

  return nodes.map((node) => filterNode(node)).filter((node): node is TreeNode => node !== null);
}
