import { IOrder } from '@types';
import { Wrapper, Item } from './styled-components';

type PropsType = {
  orders: IOrder[];
}

const OrderList = ({ orders }: PropsType) => (
  <Wrapper>
    {orders.map(({ number }) => (
      <Item key={number}># {number}</Item>
    ))}
  </Wrapper>
);

export default OrderList;
