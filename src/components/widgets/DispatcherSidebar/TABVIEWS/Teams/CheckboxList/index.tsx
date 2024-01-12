import { RootWrapper } from './styled-components';
import { IValueLabel } from '@types';
import { CheckboxGroup } from '@components/ui';
import { CheckboxValueType } from 'antd/es/checkbox/Group';


interface IProps {
  values: string[];
  bordered?: boolean;
  options: IValueLabel[];
  onChange: (data: CheckboxValueType[]) => void;
  className?: string;
}

const CheckboxList = ({ values, options, bordered, className, onChange }: IProps) => (
  <RootWrapper className={className}>
    <CheckboxGroup
      values={values}
      bordered={bordered}
      options={options}
      direction="vertical"
      onChange={onChange}
    />
  </RootWrapper>
);

export default CheckboxList;
