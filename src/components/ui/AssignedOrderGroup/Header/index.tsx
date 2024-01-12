import { useMemo } from 'react';
import { Row, Space, Typography } from 'antd';
import styled from 'styled-components';
import { COLORS } from '@constants/theme';
import { IOrder, IOrderDriver, OrderApiStatusType } from '@types';
import { getDriverStatus } from '@utils';
import { DriverStatusBadge } from '@components/ui';
import Label, { DRIVER_ORDER_API_STATUSES } from '@components/ui/Label';

interface IProps {
  driver: IOrderDriver;
  orders: IOrder[];
}

const IN_TRANSIT_STATUSES: OrderApiStatusType[] = ['TRANSIT_TO_PICKUP', 'TRANSIT_TO_DROPOFF'];

const { Text } = Typography;

const Title = styled(Text)<{ danger?: boolean }>`
  font-size: ${props => props.danger ? 10 : 12}px;
  font-weight: ${props => props.danger ? 500 : 600};
  color: ${props => props.danger ? COLORS.RED_LIGHT : COLORS.GREY_MAIN};
`;

const Header = ({ orders, driver }: IProps) => {
  const status = useMemo<OrderApiStatusType | null>(() => {
    if (orders.some(order => IN_TRANSIT_STATUSES.includes(order.apiStatus))) {
      return 'TRANSIT_TO_PICKUP';
    }

    if (orders.some(order => order.apiStatus === 'AT_PICKUP')) {
      return 'AT_PICKUP';
    }

    if (orders.some(order => order.apiStatus === 'AT_DROPOFF')) {
      return 'AT_DROPOFF';
    }

    return null;
  }, [orders]);

  return (
    <Row justify="space-between" align="middle">
      <Space>
        <DriverStatusBadge status={getDriverStatus(driver.lastCoordinatesTime)} size={10} />
        <Title>{driver.name}</Title>
      </Space>
      {!!status && <Label status={DRIVER_ORDER_API_STATUSES[status]} />}
    </Row>
  );
};

export default Header;
