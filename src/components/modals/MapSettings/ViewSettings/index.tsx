import { Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { MapViewType } from '@types';
import { CheckboxGroup, RadioGroup } from '@components/ui';
import SettingGroup from '../SettingGroup';

interface IProps {
  view: MapViewType;
  dropOff: boolean;
  onChange: (value: MapViewType) => void;
  onDropChange: (value: CheckboxValueType[]) => void;
}

const VIEW_OPTIONS = [
  { label: 'Default View', value: 'default' },
  { label: 'Focused View', value: 'focused' },
];

const HIDE_OPTIONS = [
  { label: 'Hide drop-off', value: 'drop-off' },
];

const ViewSettings = ({ view, dropOff, onChange, onDropChange }: IProps) => (
  <SettingGroup title="Map View">
    <Row justify="space-between" align="middle">
      <RadioGroup options={VIEW_OPTIONS} value={view} onChange={(e) => onChange(e.target.value as MapViewType)} />
      {view === 'focused' && (
        <CheckboxGroup
          options={HIDE_OPTIONS}
          values={dropOff ? HIDE_OPTIONS.map(option => option.value) : []}
          onChange={onDropChange}
        />
      )}
    </Row>
  </SettingGroup>
);

export default ViewSettings;
