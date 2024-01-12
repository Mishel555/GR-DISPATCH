import { Fragment } from 'react';
import { IOrder } from '@types';
import { DriverDropIcon, DriverStoreIcon } from '@components/icons';
import { ContentWrapper, Label } from './styled-components';

interface IProps {
  order: IOrder;
}

const NextStop = ({ order }: IProps) => (
  <Fragment>
    <Label>Next Stop</Label>
    <ContentWrapper align="start">
      {order.status === 'PICKED_UP' ? <DriverDropIcon /> : <DriverStoreIcon />}
      <Label>
        <Label bold>
          {order.status === 'PICKED_UP' ? order.dropOff?.name : order.pickup.name}
        </Label>
        &nbsp;
        {order.status === 'PICKED_UP' ? order.dropOff?.address.address : order.pickup.address.address}
      </Label>
    </ContentWrapper>
  </Fragment>
);

export default NextStop;
