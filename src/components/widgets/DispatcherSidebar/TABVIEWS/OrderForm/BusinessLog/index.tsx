import { IOrderBusinessLog } from '@types';
import BusinessResizableTable from './BusinessResizableTable';
import { Title, Wrapper } from './styled-components';

interface IProps {
  data: IOrderBusinessLog[];
}

const BusinessLog = ({ data }: IProps) => (
  <Wrapper>
    <Title>Business Log</Title>
    <BusinessResizableTable data={data} />
  </Wrapper>
);

export default BusinessLog;
