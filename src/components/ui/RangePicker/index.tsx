import { StyledRangePicker } from './styled-components';
import dayjs from 'dayjs';

interface IProps {
  onChange: (dates: Array<dayjs.Dayjs> | null) => void;
  defaultValue: Array<dayjs.Dayjs> | null;
}

const RangePicker = ({ onChange, defaultValue } : IProps) => (
  <StyledRangePicker
    allowClear={false}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange={(dates) => onChange(dates)}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    defaultValue={defaultValue}
  />
);


export default RangePicker;
