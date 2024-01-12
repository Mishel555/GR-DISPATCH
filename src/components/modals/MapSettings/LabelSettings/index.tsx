import SettingGroup from '../SettingGroup';
import { Label, StyledSwitch, Wrapper } from './styled-components';

interface IProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const LabelSettings = ({ value, onChange }: IProps) => (
  <SettingGroup>
    <Wrapper>
      <Label>Display Drivers’ Names</Label>
      <StyledSwitch
        checked={value}
        onChange={onChange}
        checkedChildren="On"
        unCheckedChildren="Off"
      />
    </Wrapper>
  </SettingGroup>
);

export default LabelSettings;
