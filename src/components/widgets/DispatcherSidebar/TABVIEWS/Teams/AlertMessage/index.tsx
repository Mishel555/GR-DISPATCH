import { InfoCircleOutlined } from '@ant-design/icons';
import { Wrapper, Label } from './styled-components';

interface IProps {
  count: number;
}

const AlertMessage = ({ count }: IProps) => (
  <Wrapper>
    <InfoCircleOutlined style={{ color: '#fff' }} />
    <Label>You have exceeded the number of allowed selection {count}/{count}</Label>
  </Wrapper>
);

export default AlertMessage;
