import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { Typography } from 'antd';

interface IProps {
  children: string;
  color?: string;
  className?: string;
}

const Wrapper = styled.div<{ color: string }>`
  width: fit-content;
  border-radius: 100px;
  padding: 2px 7px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.color};
`;

const Label = styled(Typography.Text)`
  font-size: 10px;
  text-align: center;
  color: ${COLORS.WHITE};
`;

const TextBadge = ({ color = COLORS.CYAN, children, className }: IProps) => (
  <Wrapper color={color} className={className}>
    <Label>{children}</Label>
  </Wrapper>
);

export default TextBadge;
