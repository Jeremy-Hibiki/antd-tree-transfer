import type { FC } from 'react';

import { memo } from 'react';

import type { TreeTransferItem, TreeTransferProps } from './types';

import InnerTreeTransfer from './InnerTreeTransfer';

const TreeTransfer = memo(InnerTreeTransfer) as (<RecordType extends TreeTransferItem = TreeTransferItem>(
  props: TreeTransferProps<RecordType>,
) => ReturnType<typeof InnerTreeTransfer<RecordType>>) &
  Pick<FC, 'displayName'>;

if (import.meta.env.DEV) {
  TreeTransfer.displayName = 'TreeTransfer';
}

export default TreeTransfer;

export type { TreeTransferItem, TreeTransferProps };
