import { CloseIcon } from '@components/icons';
import { StyledButton, StyledIcon } from './styled-components';

interface IProps {
  value: string;
  label: string;
  active?: boolean;
  remove?: boolean;
  onClick: (id: string, label: string) => void;
}

const FilterButton = ({ value, label, active, remove, onClick }: IProps) => (
  <StyledButton active={active || remove ? active || remove : undefined} onClick={() => onClick(value, label)}>
    {label}
    {remove && <StyledIcon component={() => <CloseIcon />} />}
  </StyledButton>
);

export default FilterButton;
