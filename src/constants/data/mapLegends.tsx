import { IMapSettingsLegendGroup, MapLegendsType } from '@types';
import { getDriverMarkerColor, getOrderMarkerColor } from '@utils';
import { CircleMarkerIcon, CompletedOrderMarkerIcon, DriverCarMarkerIcon, OrderMarkerIcon, StoreMarkerIcon } from '@components/icons';

const createLegend = (label: string, icon: JSX.Element) => ({ label, icon });

const ordersLegend: IMapSettingsLegendGroup[] = [
  {
    title: 'Order Icons that mark the drop-off locations',
    legends: [
      createLegend(
        'Unassigned order',
        <OrderMarkerIcon color={getOrderMarkerColor('UNASSIGNED')} withoutDot />,
      ),
      createLegend(
        'Order that has been assigned to a driver, but not yet accepted',
        <OrderMarkerIcon color={getOrderMarkerColor('ASSIGNED')} withoutDot />,
      ),
      createLegend(
        'Order that has been accepted by driver',
        <OrderMarkerIcon color={getOrderMarkerColor('ACCEPTED')} withoutDot />,
      ),
      createLegend(
        'Order that has been picked up by driver',
        <OrderMarkerIcon color={getOrderMarkerColor('PICKED_UP')} withoutDot />,
      ),
      createLegend(
        'Order that is about to be delivered; driver is at the customer\'s location',
        <OrderMarkerIcon color={getOrderMarkerColor('DELIVERED')} withoutDot />,
      ),
      createLegend(
        'Future order',
        <OrderMarkerIcon color={getOrderMarkerColor('COMP_FOR_ARRIVING')} withoutDot />,
      ),
    ],
  },
  {
    title: 'Alert icons for the orders that are passed due time',
    legends: [
      createLegend(
        'Unassigned order',
        <OrderMarkerIcon alert withoutDot color={getOrderMarkerColor('UNASSIGNED')} />,
      ),
      createLegend(
        'Order that has been assigned to a driver, but not yet accepted',
        <OrderMarkerIcon alert withoutDot color={getOrderMarkerColor('ASSIGNED')} />,
      ),
      createLegend(
        'Order that has been accepted by driver',
        <OrderMarkerIcon alert withoutDot color={getOrderMarkerColor('ACCEPTED')} />,
      ),
      createLegend(
        'Order that has been picked up by driver',
        <OrderMarkerIcon alert withoutDot color={getOrderMarkerColor('PICKED_UP')} />,
      ),
      createLegend(
        'Order that is about to be delivered; driver is at the customer\'s location',
        <OrderMarkerIcon alert withoutDot color={getOrderMarkerColor('DELIVERED')} />,
      ),
    ],
  },
  {
    title: 'Special icons',
    legends: [
      createLegend('Store Icon', <StoreMarkerIcon withoutDot />),
      createLegend('Completed Order Icon', <CompletedOrderMarkerIcon withoutDot />),
    ],
  },
  {
    title: 'Driver location icons',
    legends: [
      createLegend(
        'Available driver',
        <CircleMarkerIcon color={getDriverMarkerColor('AVAILABLE')} />,
      ),
      createLegend(
        'Driver that has been assigned with an order but has not yet accepted it',
        <CircleMarkerIcon color={getDriverMarkerColor('ASSIGNED')} />,
      ),
      createLegend(
        'Driver that has accepted an order',
        <CircleMarkerIcon color={getDriverMarkerColor('ACCEPTED')} />,
      ),
      createLegend(
        'Driver that has picked up an order',
        <CircleMarkerIcon color={getDriverMarkerColor('PICKED_UP')} />,
      ),
      createLegend(
        'Driver that is at a drop-off location about to deliver an order',
        <CircleMarkerIcon color={getDriverMarkerColor('DROP_OFF')} />,
      ),
    ],
  },
];

const driversLegend: IMapSettingsLegendGroup[] = [
  {
    title: 'Driver location icons',
    legends: [
      createLegend(
        'Available driver',
        <DriverCarMarkerIcon color={getDriverMarkerColor('AVAILABLE')} withoutDot />,
      ),
      createLegend(
        'Driver that has been assigned with an order but has not yet accepted it',
        <DriverCarMarkerIcon color={getDriverMarkerColor('ASSIGNED')} withoutDot />,
      ),
      createLegend(
        'Driver that has accepted an order',
        <DriverCarMarkerIcon color={getDriverMarkerColor('ACCEPTED')} withoutDot />,
      ),
      createLegend(
        'Driver that has picked up an order',
        <DriverCarMarkerIcon color={getDriverMarkerColor('PICKED_UP')} withoutDot />,
      ),
      createLegend(
        'Driver that is at a drop-off location about to deliver an order',
        <DriverCarMarkerIcon color={getDriverMarkerColor('DROP_OFF')} withoutDot />,
      ),
    ],
  },
  {
    title: 'Special icons',
    legends: [
      createLegend('Store Icon', <StoreMarkerIcon withoutDot />),
      createLegend('Completed Order Icon', <CompletedOrderMarkerIcon withoutDot />),
    ],
  },
  {
    title: 'Order Icons that mark the drop-off locations',
    legends: [
      createLegend(
        'Unassigned order',
        <CircleMarkerIcon color={getOrderMarkerColor('UNASSIGNED')} />,
      ),
      createLegend(
        'Order that has been assigned to a driver, but not yet accepted',
        <CircleMarkerIcon color={getOrderMarkerColor('ASSIGNED')} />,
      ),
      createLegend(
        'Order that has been accepted by driver',
        <CircleMarkerIcon color={getOrderMarkerColor('ACCEPTED')} />,
      ),
      createLegend(
        'Order that has been picked up by driver',
        <CircleMarkerIcon color={getOrderMarkerColor('PICKED_UP')} />,
      ),
      createLegend(
        'Order that is about to be delivered; driver is at the customer\'s location',
        <CircleMarkerIcon color={getOrderMarkerColor('DELIVERED')} />,
      ),
      createLegend(
        'Future order',
        <CircleMarkerIcon color={getOrderMarkerColor('COMP_FOR_ARRIVING')} />,
      ),
    ],
  },
];

export const MAP_LEGENDS: { [key in MapLegendsType]: IMapSettingsLegendGroup[] } = {
  orders: ordersLegend,
  drivers: driversLegend,
};
