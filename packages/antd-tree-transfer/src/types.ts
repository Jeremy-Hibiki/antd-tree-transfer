import type { TransferProps, TreeDataNode, TreeProps } from 'antd';
import type { ReactNode } from 'react';

type Simplify<T> = { [P in keyof T]: T[P] } & {};

export type TreeTransferItem = Simplify<
  {
    children?: TreeTransferItem[];
    title: string;
  } & Omit<TreeDataNode, 'children' | 'title'>
>;

export type TreeTransferProps<RecordType extends TreeTransferItem = TreeTransferItem> = Simplify<
  {
    dataSource: RecordType[];
    treeProps?:
      | {
          leftTree?: TreeProps;
          rightTree?: TreeProps;
        }
      | TreeProps;
    loadingRenderer?: ReactNode;
  } & TransferProps<RecordType>
>;
