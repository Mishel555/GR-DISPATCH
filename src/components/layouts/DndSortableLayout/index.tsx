import { ReactNode, memo } from 'react';
import { DndContext, DndContextProps, UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, SortingStrategy } from '@dnd-kit/sortable';

interface IProps {
  ids: unknown[];
  data: unknown[];
  contextConfig: DndContextProps;
  strategy: SortingStrategy;
  children: ReactNode | ReactNode[];
}

const DndSortableLayout = ({ ids, data, children, contextConfig, strategy }: IProps) => (
  <DndContext {...contextConfig}>
    <SortableContext items={data.map((_, index) => ids ? ids[index] as UniqueIdentifier : index)} strategy={strategy}>
      {children}
    </SortableContext>
  </DndContext>
);

export default memo(DndSortableLayout);
