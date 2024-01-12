import { ReactNode } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { hexToRgbString } from '@utils';

interface IProps {
  id: string | number;
  children: ReactNode | ReactNode[];
  handle?: boolean;
  className?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 10px;
`;

const DragIcon = styled(HolderOutlined)`
  color: ${COLORS.GREY_ULTRA};
`;

const SortableLayoutItem = ({
  id,
  children,
  className,
  handle,
}: IProps) => {
  const {
    isDragging,
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({
    id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    boxShadow: isDragging ? `0 5px 15px rgba(${hexToRgbString(COLORS.BLACK)}, 0.1)` : 'none',
  };

  return (
    <Wrapper
      ref={setNodeRef}
      style={style}
      className={className}
      {...(!handle && ({ ...attributes, ...listeners }))}
    >
      {children}
      {handle && (
        <DragIcon {...attributes} {...listeners} />
      )}
    </Wrapper>
  );
};

export default SortableLayoutItem;
