import { FooterWrapper, FooterAction } from './styled-components';

interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const Footer = ({ onConfirm, onCancel }: IProps) => (
  <FooterWrapper justify="end">
    <FooterAction onClick={onCancel}>Cancel</FooterAction>
    <FooterAction confirm onClick={onConfirm}>Ok</FooterAction>
  </FooterWrapper>
);

export default Footer;
