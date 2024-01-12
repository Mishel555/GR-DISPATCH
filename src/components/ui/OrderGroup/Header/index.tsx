import { Row, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';

interface IProps {
  title: string;
  count: number;
}

const { Text } = Typography;

const Title = styled(Text)<{ light?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.light ? COLORS.GREY_LIGHT : COLORS.WHITE};
`;

const Header = ({ title, count }: IProps) => (
  <Row justify="space-between" align="middle">
    <Title>{title}</Title>
    <Space>
      <Title light>Total</Title>
      <Title>{count}</Title>
    </Space>
  </Row>
);

export default Header;
