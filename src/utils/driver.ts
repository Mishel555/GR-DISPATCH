import { OrderStatusType } from '@types';
import { COLORS } from '@constants/theme';

export const getDriverColorByOrderStatus = (status: OrderStatusType) => {
  if (status === 'ASSIGNED') return COLORS.YELLOW;
  if (status === 'ACCEPTED') return COLORS.BLUE_LIGHT;
  if (status === 'PICKED_UP') return COLORS.RED_LIGHT;
  if (status === 'DELIVERED') return COLORS.VIOLET;

  return COLORS.CYAN;
};
