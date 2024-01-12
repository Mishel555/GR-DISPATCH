import { CountBadge } from '@components/ui';
import { CardWrapper, CardGroup, Title, Status, Distance } from './styled-components';
import { IDriver } from '@types';
import { getDriverStatus } from '@utils';

interface IProps {
  driver: IDriver;
}

const DriverCard = ({ driver }: IProps) => {
  const { name, lastCoordinatesTime } = driver;
  const status = getDriverStatus(lastCoordinatesTime);
  const isOnline = status === 'online';

  return (
    <CardWrapper justify="space-between">
      <CardGroup>
        <CountBadge count={1} />
        <Title>{name}</Title>
      </CardGroup>
      <CardGroup>
        {isOnline && <Distance>19 miles</Distance>}
        <Status status={status}>{status}</Status>
      </CardGroup>
    </CardWrapper>
  );
};

export default DriverCard;
