import { FooterWrapper, FooterAction } from './styled-components';

interface IProps {
  okLabel: string;
  rejectLabel: string;
  onConfirm: () => void;
  onReject: () => void;
  onClose: () => void;
}

const Footer = ({ rejectLabel = 'No', okLabel = 'Yes', onConfirm, onReject, onClose }: IProps) => (
  <FooterWrapper justify="center">
    <FooterAction onClick={onClose}>Close</FooterAction>
    <FooterAction onClick={onReject}>{rejectLabel}</FooterAction>
    <FooterAction confirm onClick={onConfirm}>{okLabel}</FooterAction>
  </FooterWrapper>
);

export default Footer;
