import { Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

const { Text } = Typography;

interface IProps {
  count: number;
  color?: string;
}

const Wrapper = styled.div<IProps>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${props => {
  if (props.color) return props.color;

  if (props.count) return COLORS.CYAN;

  return COLORS.GREY_LIGHT;
}};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled(Text)`
  font-size: 10px;
  font-weight: 600;
  color: ${COLORS.WHITE};
`;

const CountBadge = ({ count, color }: IProps) => (
  <Wrapper count={count} color={color}>
    <Label>{count ?? 0}</Label>
  </Wrapper>
);

export default CountBadge;
