import { Collapse, Tabs } from 'antd';
import Icon from '@ant-design/icons';
import { MapLegendsType } from '@types';
import { MAP_LEGENDS } from '@constants/data/mapLegends';
import { CaretArrowIcon } from '@components/icons';
import { CollapseWrapper, CollapseHeader } from './styled-components';
import LegendGroup from './LegendGroup';
import LegendSwitch from './LegendSwitch';

interface IProps {
  legend: MapLegendsType;
  onChange: (legend: MapLegendsType) => void;
}

const TABS = [
  {
    key: 'orders',
    label: 'Orders',
    children: MAP_LEGENDS.orders.map((data, index) => (
      <LegendGroup key={index} {...data} />
    )),
  },
  {
    key: 'drivers',
    label: 'Drivers',
    children: MAP_LEGENDS.drivers.map((data, index) => (
      <LegendGroup key={index} {...data} />
    )),
  },
];

const MapLegend = ({ legend, onChange }: IProps) => (
  <CollapseWrapper
    bordered={false}
    expandIconPosition="right"
    expandIcon={({ isActive }) => (
      <Icon component={() => <CaretArrowIcon direction={isActive ? 'bottom' : 'top'} />} />
    )}
  >
    <Collapse.Panel key="0" header={<CollapseHeader>Map Legend</CollapseHeader>}>
      <Tabs
        items={TABS}
        activeKey={legend}
        renderTabBar={() => <LegendSwitch tabs={TABS} currentTab={legend} onChange={onChange} />}
      />
    </Collapse.Panel>
  </CollapseWrapper>
);

export default MapLegend;
