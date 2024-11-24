import type { TreeDataNode } from 'antd';
import type { Key } from 'react';

import { generateLeftTree, generateRightTree, searchTreeFilter } from '../../src/utils';
import { TOTAL_NODES_COUNT, TREE_NODES, TreeNodeKey } from './fixtures/data';

function getNodeByKey(tree: TreeDataNode[], key: Key): TreeDataNode | undefined {
  if (tree.length === 0) {
    return undefined;
  }

  for (const node of tree) {
    if (node.key === key) {
      return node;
    }

    if (node.children) {
      const result = getNodeByKey(node.children, key);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
}

function getNodesByStatus(tree: TreeDataNode[]) {
  return tree.reduce<Record<'disabled' | 'enabled', TreeDataNode[]>>(
    (acc, node) => {
      acc[node.disabled ? 'disabled' : 'enabled'].push(node);
      if (node.children) {
        const childNodes = getNodesByStatus(node.children);
        acc.disabled.push(...childNodes.disabled);
        acc.enabled.push(...childNodes.enabled);
      }
      return acc;
    },
    { disabled: [], enabled: [] },
  );
}

function notNil<T>(value: T | undefined): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

describe('generate tree', () => {
  it('works', () => {
    const leftTree = generateLeftTree(TREE_NODES, []);
    expect(leftTree).toHaveLength(3);
    const rightTree = generateRightTree(TREE_NODES, []);
    expect(rightTree).toHaveLength(0);
  });

  describe('select none nodes', () => {
    it('left tree', () => {
      const tree = generateLeftTree(TREE_NODES, []);
      expect(tree).toMatchSnapshot();
    });

    it('right tree', () => {
      const tree = generateRightTree(TREE_NODES, []);
      expect(tree).toHaveLength(0);
    });
  });

  describe('select one of leaf nodes', () => {
    const selectedKeys = [TreeNodeKey.PARENT_3_CHILD_2];
    const leftTree = generateLeftTree(TREE_NODES, selectedKeys);
    const rightTree = generateRightTree(TREE_NODES, selectedKeys);

    it('left tree', () => {
      expect(leftTree).toMatchSnapshot();

      selectedKeys.forEach((key) => {
        const selectedNode = getNodeByKey(leftTree, key);
        expect(selectedNode?.disabled).toBeTruthy();
      });

      const parentNode = getNodeByKey(leftTree, TreeNodeKey.PARENT_3_WITH_MULTIPLE_CHILDREN);
      expect(parentNode?.disabled).toBeFalsy();

      const { disabled, enabled } = getNodesByStatus(leftTree);
      expect(disabled.length).toBe(1);
      expect(enabled.length).toBe(TOTAL_NODES_COUNT - 1);
    });

    it('right tree', () => {
      expect(rightTree).toHaveLength(1);
      expect(rightTree[0].children).toHaveLength(1);
      expect(rightTree).toMatchSnapshot();
    });
  });

  describe('select all of leaf nodes - 1', () => {
    const selectedKeys = [TreeNodeKey.PARENT_2_CHILD_1];
    const leftTree = generateLeftTree(TREE_NODES, selectedKeys);
    const rightTree = generateRightTree(TREE_NODES, selectedKeys);

    it('left tree', () => {
      expect(leftTree).toMatchSnapshot();

      selectedKeys.forEach((key) => {
        const selectedNode = getNodeByKey(leftTree, key);
        expect(selectedNode?.disabled).toBeTruthy();
      });

      const parentNode = getNodeByKey(leftTree, TreeNodeKey.PARENT_2_WITH_ONE_CHILD);
      expect(parentNode?.disabled).toBeTruthy();

      const { disabled, enabled } = getNodesByStatus(leftTree);
      expect(disabled.length).toBe(2);
      expect(enabled.length).toBe(TOTAL_NODES_COUNT - 2);
    });

    it('right tree', () => {
      expect(rightTree).toHaveLength(1);
      expect(rightTree[0].children).toHaveLength(1);
      expect(rightTree).toMatchSnapshot();
    });
  });

  describe('select all of leaf nodes - 2', () => {
    const selectedKeys = [TreeNodeKey.PARENT_3_CHILD_1, TreeNodeKey.PARENT_3_CHILD_2, TreeNodeKey.PARENT_3_CHILD_3];
    const leftTree = generateLeftTree(TREE_NODES, selectedKeys);
    const rightTree = generateRightTree(TREE_NODES, selectedKeys);

    it('left tree', () => {
      expect(leftTree).toMatchSnapshot();

      selectedKeys.forEach((key) => {
        const selectedNode = getNodeByKey(leftTree, key);
        expect(selectedNode?.disabled).toBeTruthy();
      });

      const parentNode = getNodeByKey(leftTree, TreeNodeKey.PARENT_3_WITH_MULTIPLE_CHILDREN);
      expect(parentNode?.disabled).toBeTruthy();

      const { disabled, enabled } = getNodesByStatus(leftTree);
      expect(disabled.length).toBe(4);
      expect(enabled.length).toBe(TOTAL_NODES_COUNT - 4);
    });

    it('right tree', () => {
      expect(rightTree).toHaveLength(1);
      expect(rightTree[0].children).toHaveLength(3);
      expect(rightTree).toMatchSnapshot();
    });
  });
});

describe('filter tree', () => {
  it('works', () => {
    const filteredItems = [getNodeByKey(TREE_NODES, TreeNodeKey.PARENT_3_CHILD_1)].filter(notNil);
    const filteredTree = searchTreeFilter(TREE_NODES, filteredItems);
    expect(filteredTree).toMatchSnapshot();
    expect(filteredTree).toHaveLength(1);
    expect(filteredTree[0].children).toHaveLength(1);
  });
});
