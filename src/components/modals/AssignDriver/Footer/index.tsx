import { FooterWrapper, FooterAction, ActionWrapper } from './styled-components';

interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const Footer = ({ onConfirm, onCancel }: IProps) => (
  <FooterWrapper justify="space-between">
    <FooterAction onClick={onCancel}>Send to DSP</FooterAction>
    <ActionWrapper>
      <FooterAction onClick={onCancel}>Cancel</FooterAction>
      <FooterAction confirm onClick={() => onConfirm()}>Ok</FooterAction>
    </ActionWrapper>
  </FooterWrapper>
);

export default Footer;
