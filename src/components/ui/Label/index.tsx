import styled from 'styled-components';
import { OrderApiStatusType, OrderLabelType, OrderStatusType } from '@types';
import { COLORS } from '@constants/theme';

interface IProps {
  status: IStatus;
}

interface IStatus {
  name: string;
  color: string;
}

export const ORDER_STATUSES: Record<OrderStatusType, IStatus> = {
  'ASSIGNED': { name: 'Pending', color: COLORS.YELLOW },
  'ACCEPTED': { name: 'Accepted', color: COLORS.BLUE_LIGHT },
  'PICKED_UP': { name: 'Picked up', color: COLORS.RED_LIGHT },
  'COMPLETED': { name: 'Completed', color: COLORS.CYAN },
  'DELIVERED': { name: 'Delivered', color: COLORS.RED_LIGHT },
  'UNASSIGNED': { name: 'Unassigned', color: COLORS.RED_LIGHT },
  'COMP_FOR_ARRIVING': { name: 'At drop-off', color: COLORS.VIOLET },
  'CANCELLED': { name: 'Cancelled', color: COLORS.RED_LIGHT },
};

// eslint-disable-next-line
// @ts-ignore
export const DRIVER_ORDER_API_STATUSES: Record<OrderApiStatusType, IStatus> = {
  'TRANSIT_TO_DROPOFF': { name: 'In transit', color: COLORS.GREY_MAIN },
  'TRANSIT_TO_PICKUP': { name: 'In transit', color: COLORS.GREY_MAIN },
  'AT_PICKUP': { name: 'At pick-up', color: COLORS.BLUE_LIGHT },
  'AT_DROPOFF': { name: 'At drop-off', color: COLORS.VIOLET },
};

export const ORDER_LABELS: { [key in OrderLabelType]: IStatus } = {
  'New': { name: 'New', color: COLORS.CYAN },
  'Not accept': { name: 'Not accept', color: COLORS.RED_LIGHT },
  'No address': { name: 'No address', color: COLORS.YELLOW },
  'Pickup addr': { name: 'Pickup addr', color: COLORS.CYAN },
  'NOT READY': { name: 'Not Ready', color: COLORS.RED_LIGHT },
  'Ready': { name: 'Ready', color: COLORS.CYAN_DARK },
  'ID check': { name: 'Check ID', color: COLORS.PINK },
  'Catering': { name: 'Catering', color: COLORS.BLUE_VIOLET },
  'Large order': { name: 'Large', color: COLORS.BLUE_VIOLET },
  'Fraud': { name: 'Fraud', color: COLORS.CYAN },
  'Check CC': { name: 'Check CC', color: COLORS.PINK },
  'DoorDash': { name: 'DoorDash', color: COLORS.CYAN },
  '-> DoorDash': { name: '-> DoorDash', color: COLORS.CYAN },
  'UberDirect': { name: 'UberDirect', color: COLORS.GREY_MAIN },
  '-> UberDirect': { name: '-> UberDirect', color: COLORS.GREY_MAIN },
};

const Label = styled.div`
  height: 18px;
  padding: 1.5px 8px;
  border-radius: 60px;

  font-size: 10px;
  color: ${COLORS.WHITE};

  display: inline-block;
  background-color: ${props => props.color};
`;

export default ({ status }: IProps) => (status ? <Label color={status.color}>{status.name}</Label> : <span></span>);
