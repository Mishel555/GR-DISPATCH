import { Space } from 'antd';
import { COLORS } from '@constants/theme';
import { PlusButton } from '@components/ui';
import { ActionWrapper, FooterAction, FooterWrapper, Label } from './styled-components';

interface IProps {
  addItem: () => void;
  onCancel: () => void;
}

const Footer = ({ addItem, onCancel }: IProps) => (
  <FooterWrapper justify="space-between">
    <Space>
      <PlusButton circle color={COLORS.GREY_MAIN} onClick={addItem} />
      <Label>Add Item</Label>
    </Space>
    <ActionWrapper>
      <FooterAction onClick={onCancel}>Cancel</FooterAction>
      <FooterAction confirm htmlType="submit">Ok</FooterAction>
    </ActionWrapper>
  </FooterWrapper>
);

export default Footer;
