import { useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import { COLORS } from '@constants/theme';
import { DISPATCHER_SIDEBAR_PATHS } from '@constants/paths';
import { PlusButton } from '@components/ui';
import { ActionWrapper, FooterAction, FooterWrapper, Label } from './styled-components';

interface IProps {
  addDrop: () => void;
  onCancel: () => void;
}

const Footer = ({ addDrop, onCancel }: IProps) => {
  const navigate = useNavigate();

  const openFullForm = () => {
    onCancel();
    navigate(`/${DISPATCHER_SIDEBAR_PATHS.CREATE_ORDER}`);
  };

  return (
    <FooterWrapper justify="space-between">
      <Space>
        <PlusButton circle color={COLORS.GREY_MAIN} onClick={addDrop} />
        <Label>Add Drop-Off</Label>
      </Space>
      <ActionWrapper>
        <FooterAction onClick={openFullForm}>Full Form</FooterAction>
        <FooterAction onClick={onCancel}>Cancel</FooterAction>
        <FooterAction confirm htmlType="submit">Ok</FooterAction>
      </ActionWrapper>
    </FooterWrapper>
  );
};

export default Footer;
