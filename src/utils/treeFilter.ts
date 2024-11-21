import { TreeNode } from '../types';

export function filterTree(nodes: TreeNode[], searchText: string): TreeNode[] {
  if (!searchText) return nodes;

  const searchLower = searchText.toLowerCase();

  function nodeMatches(node: TreeNode): boolean {
    return node.name.toLowerCase().includes(searchLower);
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
