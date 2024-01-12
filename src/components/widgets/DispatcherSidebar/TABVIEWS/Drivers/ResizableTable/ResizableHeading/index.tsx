import { HTMLAttributes, SyntheticEvent } from 'react';
import { ResizeCallbackData, Resizable } from 'react-resizable';

// eslint-disable-next-line
type PropsType = HTMLAttributes<any> & {
  width?: number;
  onResize: (e: SyntheticEvent<Element>, data: ResizeCallbackData) => void;
};

const ResizableHeading = ({ width, onResize, ...restProps }: PropsType) => {
  if (!width) return <th {...restProps} />;

  return (
    <Resizable
      height={0}
      width={width}
      handle={(
        <span onClick={(e) => e.stopPropagation()} className="react-resizable-handle" />
      )}
      draggableOpts={{ enableUserSelectHack: false }}
      onResize={onResize}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizableHeading;
