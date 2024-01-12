import { IIconDefaultProps } from '@types';

const Close = ({ color = '#fff', onClick }: IIconDefaultProps) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
    <path
      d="M6.91684 1.0835L1.0835 6.91684M1.0835 1.0835L6.91684 6.91684"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Close;
