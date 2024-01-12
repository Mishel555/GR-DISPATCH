import { COLORS } from '@constants/theme';
import { PlusIcon } from '@components/icons';
import { CreateButton } from './styled-components';

interface IProps {
  color?: string;
  circle?: boolean;
  className?: string;
  onClick: () => void;
}

const PlusButton = ({ color = COLORS.GREY_LIGHT, circle, className, onClick }: IProps) => (
  <CreateButton
    htmlType="button"
    icon={<PlusIcon />}
    color={color}
    circle={circle}
    onClick={onClick}
    className={className}
  />
);

export default PlusButton;
