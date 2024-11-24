import type { Key } from 'react';

import { theme, Transfer, Tree } from 'antd';
import { useMemo } from 'react';

import type { TreeTransferItem, TreeTransferProps } from './types';

import { generateLeftTree, generateRightTree, searchTreeFilter } from './utils';

const InnerTreeTransfer = <RecordType extends TreeTransferItem = TreeTransferItem>({
  dataSource,
  loadingRenderer,
  targetKeys,
  treeProps,
  ...restProps
}: TreeTransferProps<RecordType>): ReturnType<typeof Transfer<RecordType>> => {
  const { token } = theme.useToken();

  const transferDataSource = useMemo(() => {
    const result: RecordType[] = [];
    function flatten(list: RecordType[] = []): void {
      list.forEach((item) => {
        item.isLeaf = !item.children || item.children.length === 0;
        result.push(item);
        flatten(item.children as RecordType[]);
      });
    }
    flatten(dataSource);
    return result;
  }, [dataSource]);

  const [leftTreeProps, rightTreeProps] = useMemo(() => {
    if (!treeProps) {
      return [{}, {}];
    }
    if ('leftTree' in treeProps || 'rightTree' in treeProps) {
      return [treeProps.leftTree ?? {}, treeProps.rightTree ?? {}];
    }
    return [treeProps, treeProps];
  }, [treeProps]);

  return (
    <Transfer<RecordType>
      {...restProps}
      className="tree-transfer"
      dataSource={transferDataSource}
      targetKeys={targetKeys}
      showSelectAll
    >
      {({ direction, filteredItems, onItemSelectAll, selectedKeys }) => {
        if (transferDataSource.length === 0) {
          return loadingRenderer;
        }

        const items = searchTreeFilter(dataSource, filteredItems);

        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...(targetKeys ?? [])];
          const treeData = generateLeftTree(items, targetKeys);
          return (
            <div style={{ padding: token.paddingXS }}>
              <Tree
                checkedKeys={checkedKeys}
                treeData={treeData}
                blockNode
                checkable
                showLine
                onCheck={(_, { checkedNodes }) => {
                  onItemSelectAll(
                    [...new Set([...(targetKeys ?? []), ...checkedNodes.map((node) => node.key)])],
                    'replace',
                  );
                }}
                {...leftTreeProps}
              />
            </div>
          );
        } else {
          const treeData = generateRightTree(items, targetKeys);
          return (
            <div style={{ padding: token.paddingXS }}>
              <Tree
                checkedKeys={selectedKeys}
                treeData={treeData}
                blockNode
                checkable
                defaultExpandAll
                showLine
                onCheck={(checked) => {
                  onItemSelectAll(checked as Key[], 'replace');
                }}
                {...rightTreeProps}
              />
            </div>
          );
        }
      }}
    </Transfer>
  );
};

export default InnerTreeTransfer;
