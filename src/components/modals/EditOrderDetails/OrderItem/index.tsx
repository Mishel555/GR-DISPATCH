import { COLORS } from '@constants/theme';
import { CloseIcon } from '@components/icons';
import { FormInputField, FormAreaField } from '@components/ui';
import { FieldWrapper, HeaderWrapper, RootWrapper, Title } from './styled-components';

interface IProps {
  name: number;
  allowRemove: boolean;
  remove: (index: number) => void;
}

const urlRegexp = new RegExp('(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})');

const OrderItem = ({ name, allowRemove, remove }: IProps) => (
  <RootWrapper direction="vertical">
    <HeaderWrapper justify="space-between">
      <Title index={allowRemove ? name + 1 : 0}>Item</Title>
      {allowRemove && <CloseIcon color={COLORS.GREY_LIGHT} onClick={() => remove(name)} />}
    </HeaderWrapper>
    <FieldWrapper justify="space-between">
      <FormInputField
        gap={68}
        label="Name"
        inputWidth={170}
        allowClear={false}
        name={[name, 'title']}
        rules={[{ required: true, message: '' }]}
      />
      <FormInputField
        type="number"
        label="Quantity"
        inputWidth={70}
        allowClear={false}
        name={[name, 'quantity']}
        rules={[{ required: true, message: '' }]}
      />
    </FieldWrapper>
    <FormAreaField
      gap={30}
      allowClear={false}
      label="Description"
      placeholder="Add notes"
      name={[name, 'description']}
    />
    <FormInputField
      gap={36}
      label="Image Link"
      inputWidth={320}
      allowClear={false}
      name={[name, 'imageUrl']}
      rules={[
        {
          type: 'regexp',
          pattern: urlRegexp,
          validator: (_, value, callback) => {
            try {
              if (value && !urlRegexp.test(value)) {
                throw new Error('');
              }

              callback();
            } catch (e) {
              callback(e as string);
            }
          },
        },
      ]}
    />
  </RootWrapper>
);

export default OrderItem;
