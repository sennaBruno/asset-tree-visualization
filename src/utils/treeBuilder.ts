import { Asset, Location, TreeNode } from '../types';

export function buildTreeStructure(locations: Location[], assets: Asset[]): TreeNode[] {
  const treeNodes: TreeNode[] = [];
  const nodesMap = new Map<string, TreeNode>();

  // Primeiro, converter todas as locations para TreeNodes
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

  // Converter todos os assets e components para TreeNodes
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

  // Construir as relações hierárquicas
  nodesMap.forEach((node) => {
    if (node.parentId && nodesMap.has(node.parentId)) {
      // Adicionar aos nós pai (location ou asset)
      const parentNode = nodesMap.get(node.parentId);
      parentNode?.children.push(node);
    } else if (node.locationId && nodesMap.has(node.locationId)) {
      // Adicionar aos nós de localização
      const locationNode = nodesMap.get(node.locationId);
      locationNode?.children.push(node);
    } else if (!node.parentId && !node.locationId) {
      // Nós raiz
      treeNodes.push(node);
    }
  });

  return treeNodes;
}
