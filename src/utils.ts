import type { TreeDataNode } from 'antd';
import type { Key } from 'react';

export const generateLeftTree = (treeNodes: TreeDataNode[] = [], targetKeys: Key[] = []): TreeDataNode[] => {
  return treeNodes.map((node) => {
    const newNode = { ...node };
    newNode.disabled = targetKeys.includes(node.key);
    if (newNode.children) {
      newNode.children = generateLeftTree(newNode.children, targetKeys);
      if (!newNode.disabled) {
        newNode.disabled = newNode.children.every((child) => child.disabled);
      }
    }
    return newNode;
  });
};

export const generateRightTree = (treeNodes: TreeDataNode[] = [], targetKeys: Key[] = []): TreeDataNode[] => {
  return treeNodes
    .map(({ children, ...props }) => {
      return {
        ...props,
        _keepNodeFlag: targetKeys.includes(props.key),
        children: generateRightTree(children, targetKeys),
      };
    })
    .filter(
      (node) =>
        node._keepNodeFlag ||
        (node.children.length && node.children.some((child) => (child as typeof node)._keepNodeFlag)),
    );
};

export const searchTreeFilter = (
  treeNodes: TreeDataNode[] = [],
  filteredItems: TreeDataNode[] = [],
): TreeDataNode[] => {
  const filteredKeys = filteredItems.map((item) => item.key);
  // filter out the nodes in the filteredItems and its ancestors
  // don't mutate the original treeNodes
  const result: TreeDataNode[] = [];
  treeNodes.forEach((node) => {
    const newNode = { ...node };
    if (newNode.children) {
      newNode.children = searchTreeFilter(newNode.children, filteredItems);
      if (newNode.children.length !== 0) {
        result.push(newNode);
      }
    } else if (filteredKeys.includes(newNode.key)) {
      result.push(newNode);
    }
  });
  return result;
};
