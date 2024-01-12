import { FooterWrapper, FooterAction } from './styled-components';

interface IProps {
  onViewDetails: () => void;
}

const ExtraActions = ({ onViewDetails }: IProps) => (
  <FooterWrapper justify="space-between">
    <FooterAction onClick={onViewDetails}>View Order Details</FooterAction>
    <FooterAction confirm>Send to DoorDash</FooterAction>
  </FooterWrapper>
);

export default ExtraActions;
