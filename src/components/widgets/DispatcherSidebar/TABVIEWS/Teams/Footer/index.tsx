import { FooterAction, RootWrapper } from './styled-components';

interface IProps {
  isAllSelected: boolean;
  hideSelectAll: boolean;
  onSave: () => void;
  onSelect: () => void;
}

const Footer = ({ isAllSelected, hideSelectAll, onSave, onSelect }: IProps) => (
  <RootWrapper>
    {!hideSelectAll && (
      <FooterAction onClick={onSelect}>{!isAllSelected ? 'Select all' : 'Deselect all'}</FooterAction>
    )}
    <FooterAction confirm onClick={onSave}>Save</FooterAction>
  </RootWrapper>
);

export default Footer;
