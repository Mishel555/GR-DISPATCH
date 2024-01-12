import { FooterWrapper, FooterAction } from './styled-components';

interface IProps {
  goBack: () => void;
  saveAndClose: () => void;
}

const Footer = ({ goBack, saveAndClose }: IProps) => (
  <FooterWrapper justify="end">
    <FooterAction onClick={goBack}>Cancel</FooterAction>
    <FooterAction htmlType="submit">Save</FooterAction>
    <FooterAction confirm onClick={saveAndClose}>Save and Close</FooterAction>
  </FooterWrapper>
);

export default Footer;
