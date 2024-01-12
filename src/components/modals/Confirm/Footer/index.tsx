import { FooterWrapper, FooterAction } from './styled-components';

interface IProps {
  closeLabel?: string;
  okLabel?: string;
  onConfirm?: () => void;
  onCancel: () => void;
}

const Footer = ({ closeLabel = 'Cancel', okLabel = 'oK', onConfirm, onCancel }: IProps) => (
  <FooterWrapper justify="center">
    <FooterAction onClick={onCancel}>{closeLabel}</FooterAction>
    {onConfirm && (
      <FooterAction confirm onClick={onConfirm}>{okLabel}</FooterAction>
    )}
  </FooterWrapper>
);

export default Footer;
