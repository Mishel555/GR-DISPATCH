import { Space } from 'antd';
import { ILatLng, IRoute, OrderApiStatusType } from '@types';
import { CountBadge, CustomMarker } from '@components/ui';
import DriverStatusBadge, { DRIVER_ORDER_API_STATUSES } from '@components/ui/Label';
import NextStop from './NextStop';
import { Wrapper, Label, ContentWrapper } from './styled-components';

interface IProps {
  name: string;
  routes?: IRoute;
  position: ILatLng;
  withName: boolean;
  orders: number;
  status?: OrderApiStatusType;
}

const STATUSES_TO_SHOW: OrderApiStatusType[] = ['AT_PICKUP', 'AT_DROPOFF', 'TRANSIT_TO_PICKUP', 'TRANSIT_TO_DROPOFF'];

const DriverDetails = ({ position, name, orders, routes, withName, status }: IProps) => {
  const routeOrder = (() => {
    const route = routes?.items[0];

    return route?.order;
  })();

  return (
    <CustomMarker position={position}>
      <Wrapper withName={withName}>
        <ContentWrapper>
          <Space>
            <CountBadge count={orders} />
            <Label bold>{name}</Label>
          </Space>
          <DriverStatusBadge status={DRIVER_ORDER_API_STATUSES['TRANSIT_TO_DROPOFF']} />
          {!!status && STATUSES_TO_SHOW.includes(status) &&
            <DriverStatusBadge status={DRIVER_ORDER_API_STATUSES[status]} />}
        </ContentWrapper>
        {routeOrder && <NextStop order={routeOrder} />}
      </Wrapper>
    </CustomMarker>
  );
};

export default DriverDetails;
