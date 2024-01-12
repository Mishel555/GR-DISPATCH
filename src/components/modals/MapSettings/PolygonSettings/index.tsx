import { IValueLabel, MapPolygonsType } from '@types';
import { CheckboxGroup } from '@components/ui';
import SettingGroup from '../SettingGroup';

interface IProps {
  polygons?: MapPolygonsType[];
  onChange: (values: MapPolygonsType[]) => void;
}

const options: IValueLabel<MapPolygonsType>[] = [
  { label: 'Pick-ups', value: 'pick-ups' },
  { label: 'Teams', value: 'teams' },
];

const PolygonSettings = ({ polygons, onChange }: IProps) => (
  <SettingGroup title="Show Polygons">
    <CheckboxGroup
      values={polygons}
      options={options}
      onChange={(checkedValue) => onChange(checkedValue as MapPolygonsType[])}
    />
  </SettingGroup>
);

export default PolygonSettings;
