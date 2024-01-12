import { memo } from 'react';
import { Col, Row, Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import dayjs from 'dayjs';
import { IGroupedRouteItem, RouteItemType } from '@types';
import { getNearestDate, getTimeFormatString } from '@utils';
import { useAppSelector } from '@hooks';
import { selectAppTimeFormat } from '@selectors/configSelector';
import { PinIcon, ShopIcon } from '@components/icons';
import OrderList from './OrderList';
import { Wrapper, Label, DetailsWrapper, MetaWrapper } from './styled-components';

interface IProps {
  data: IGroupedRouteItem;
  className?: string;
}

const ICONS: Record<RouteItemType, () => JSX.Element> = {
  ['DROPOFF']: PinIcon,
  ['PICKUP']: ShopIcon,
};

const TODAY = dayjs();
const RouteCard = ({ data, className }: IProps) => {
  const timeFormat = useAppSelector(selectAppTimeFormat);

  const { type, orders } = data;
  const order = orders[0];

  const { name, address, nearestDate } = {
    name: type === 'PICKUP' ? order.pickup.name : order.dropOff?.name,
    address: type === 'PICKUP' ? order.pickup.address.address : order.dropOff?.address.address,
    nearestDate: type === 'PICKUP' ? getNearestDate(orders.map(order => order.timestamps.pickupBy as string), TODAY.toISOString())
      : getNearestDate(orders.map(order => order.timestamps.deliverBy as string), TODAY.toISOString()),
  };

  const formattedDate = dayjs(nearestDate.value).format(`MMM DD / ${getTimeFormatString(timeFormat)}`);

  return (
    <Wrapper justify="space-between" gutter={10} className={className}>
      <DetailsWrapper size="large" align="start">
        <Icon component={ICONS[type]} />
        <Col>
          <Row>
            <Label bold>{name}</Label>
          </Row>
          <Row>
            <Label>{address}</Label>
          </Row>
        </Col>
      </DetailsWrapper>
      <MetaWrapper>
        <Row>
          <Label bold>
            {TODAY.diff('date', 'days') === 0 ? 'Today' : formattedDate}
          </Label>
        </Row>
        <Row>
          <Label date>
            {orders.length > 1 ? (
              <Tooltip title={() => <OrderList orders={orders} />} placement="bottom">
                {orders.length} orders for {type === 'PICKUP' ? 'pick-up' : 'drop-off'}
              </Tooltip>
            ) : `Order #${order.number}`}
          </Label>
        </Row>
      </MetaWrapper>
    </Wrapper>
  );
};

export default memo(RouteCard);
