import styled from 'styled-components';
import { IIconDefaultProps } from '@types';

type DirectionType = 'top' | 'bottom' | 'left' | 'right';

interface IProps extends IIconDefaultProps{
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

const CaretArrow = ({ direction = 'bottom' }: IProps) => (
  <Wrapper width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg" directionXS={direction}>
    <path
      d="M1.6792 4.91561L5.35913 1.08496L9.03906 4.91561"
      stroke="#747182"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Wrapper>
);

export default CaretArrow;
