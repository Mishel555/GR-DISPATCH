import { useLocation } from 'react-router-dom';
import { ROOT_PATHS } from '@constants/paths';
import { Label } from './styled-components';

interface IProps {
  label: string;
  badge?: string | number;
}

const BASE_PATH = ROOT_PATHS.ROOT;
const Item = ({ label, badge }: IProps) => {
  const { pathname } = useLocation();

  const cleanPath = pathname.replace(BASE_PATH, '');
  const active = cleanPath.includes('teams');

  return (
    <Label badge={badge} active={active}>{label}</Label>
  );
};

export default Item;
