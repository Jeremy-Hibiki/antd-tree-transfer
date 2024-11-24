import type { TreeDataNode } from 'antd';

export enum TreeNodeKey {
  PARENT_1_WO_CHILDREN = 'parent-1-without-children',
  PARENT_2_WITH_ONE_CHILD = 'parent-2-with-one-child',
  PARENT_2_CHILD_1 = 'parent-2-child-1',
  PARENT_3_WITH_MULTIPLE_CHILDREN = 'parent-3-with-multiple-children',
  PARENT_3_CHILD_1 = 'parent-3-child-1',
  PARENT_3_CHILD_2 = 'parent-3-child-2',
  PARENT_3_CHILD_3 = 'parent-3-child-3',
}

export const TOTAL_NODES_COUNT = Object.keys(TreeNodeKey).length;

export const TREE_NODES = [
  {
    key: TreeNodeKey.PARENT_1_WO_CHILDREN,
    title: TreeNodeKey.PARENT_1_WO_CHILDREN,
  },
  {
    key: TreeNodeKey.PARENT_2_WITH_ONE_CHILD,
    title: TreeNodeKey.PARENT_2_WITH_ONE_CHILD,
    children: [
      {
        key: TreeNodeKey.PARENT_2_CHILD_1,
        title: TreeNodeKey.PARENT_2_CHILD_1,
      },
    ],
  },
  {
    key: TreeNodeKey.PARENT_3_WITH_MULTIPLE_CHILDREN,
    title: TreeNodeKey.PARENT_3_WITH_MULTIPLE_CHILDREN,
    children: [
      {
        key: TreeNodeKey.PARENT_3_CHILD_1,
        title: TreeNodeKey.PARENT_3_CHILD_1,
      },
      {
        key: TreeNodeKey.PARENT_3_CHILD_2,
        title: TreeNodeKey.PARENT_3_CHILD_2,
      },
      {
        key: TreeNodeKey.PARENT_3_CHILD_3,
        title: TreeNodeKey.PARENT_3_CHILD_3,
      },
    ],
  },
] as const satisfies TreeDataNode[];
