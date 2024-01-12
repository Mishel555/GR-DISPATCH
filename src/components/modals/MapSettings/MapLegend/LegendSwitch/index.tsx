import { MapLegendsType } from '@types';
import { SwitchButton, SwitchWrapper } from './styled-components';

interface ITab {
  key: string;
  label: string;
  children: JSX.Element[];
}

interface IProps {
  tabs: ITab[];
  currentTab: string;
  onChange: (tab: MapLegendsType) => void;
}

const LegendSwitch = ({ tabs, currentTab, onChange }: IProps) => (
  <SwitchWrapper>
    {tabs.map(({ key, label }) => (
      <SwitchButton
        key={key}
        active={currentTab === key}
        onClick={() => onChange(key as MapLegendsType)}
      >
        {label}
      </SwitchButton>
    ))}
  </SwitchWrapper>
);

export default LegendSwitch;
