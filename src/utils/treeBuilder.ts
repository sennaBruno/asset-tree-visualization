import { Asset, Location, TreeNode } from '../types';

export function buildTreeStructure(locations: Location[], assets: Asset[]): TreeNode[] {
  // Validação inicial dos parâmetros
  if (!Array.isArray(locations) || !Array.isArray(assets)) {
    console.error('Dados inválidos:', { locations, assets });
    return [];
  }

  const treeNodes: TreeNode[] = [];
  const nodesMap = new Map<string, TreeNode>();

  try {
    // Converter locations para TreeNodes
    locations.forEach((location) => {
      const node: TreeNode = {
        id: location.id,
        name: location.name,
        type: 'location',
        children: [],
        parentId: location.parentId,
      };
      nodesMap.set(location.id, node);
    });

    // Converter assets para TreeNodes
    assets.forEach((asset) => {
      const isComponent = !!asset.sensorType;
      const node: TreeNode = {
        id: asset.id,
        name: asset.name,
        type: isComponent ? 'component' : 'asset',
        children: [],
        parentId: asset.parentId,
        locationId: asset.locationId,
        sensorType: asset.sensorType,
        status: asset.status,
      };
      nodesMap.set(asset.id, node);
    });

    // Construir hierarquia
    nodesMap.forEach((node) => {
      if (node.parentId && nodesMap.has(node.parentId)) {
        const parentNode = nodesMap.get(node.parentId);
        parentNode?.children.push(node);
      } else if (node.locationId && nodesMap.has(node.locationId)) {
        const locationNode = nodesMap.get(node.locationId);
        locationNode?.children.push(node);
      } else if (!node.parentId && !node.locationId) {
        treeNodes.push(node);
      }
    });

    return treeNodes;
  } catch (error) {
    console.error('Erro ao construir árvore:', error);
    return [];
  }
}
