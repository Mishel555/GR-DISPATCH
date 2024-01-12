import { IMapSettingsLegendGroup } from '@types';
import { MapLegendItem } from '@components/ui';
import { GroupWrapper, LegendWrapper, Title } from './styled-components';

const LegendGroup = ({ title, legends }: IMapSettingsLegendGroup) => (
  <GroupWrapper>
    <Title>{title}</Title>
    <LegendWrapper direction="vertical">
      {legends.map((data, index) => (
        <MapLegendItem key={index} {...data} />
      ))}
    </LegendWrapper>
  </GroupWrapper>
);

export default LegendGroup;
