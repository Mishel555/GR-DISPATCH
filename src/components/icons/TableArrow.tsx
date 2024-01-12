import { IIconDefaultProps } from '@types';
import styled from 'styled-components';

type DirectionType = 'top' | 'bottom' | 'left' | 'right';

interface IProps extends IIconDefaultProps {
  direction?: DirectionType;
}

const Wrapper = styled.svg<{ directionXS?: DirectionType }>`
  transform: rotate(${props => {
  switch (props.directionXS) {
    case 'top':
      return 180;
    case 'left':
      return -90;
    case 'right':
      return 90;
    default:
      return 0;
  }
}}deg);
`;

const TableArrow = ({ direction, color = '#747182' }: IProps) => (
  <Wrapper
    width="7"
    height="8"
    viewBox="0 0 7 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    directionXS={direction}
  >
    <svg>
      <path
        d="M6.12012 4.51031L3.56012 7.07031L1.00012 4.51031"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.56055 1L3.56055 7"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    ;
  </Wrapper>
);

export default TableArrow;
