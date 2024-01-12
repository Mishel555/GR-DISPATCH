import { IIconDefaultProps } from '@types';
import { COLORS } from '@constants/theme';

interface IProps extends IIconDefaultProps {
  children: string;
  labelColor?: string;
}

const getWidth = (text: string): number => {
  const width = text.length * 7;

  return width > 180 ? 180 : width;
};

const getText = (children: string): string => {
  if (children.length > 18) {
    return `${children.slice(0, 18)}...`;
  }

  return children;
};

const styles = {
  text: {
    width: '100%',
    maxWidth: 100,

    fontSize: 10,
    fill: COLORS.WHITE,
    fontFamily: 'Manrope, sans-serif',
  },
};

const BadgeMarker = ({ children, color = COLORS.CYAN }: IProps) => {
  const text = getText(children);

  return (
    <svg
      width={getWidth(text)}
      height={18}
      viewBox={`0 0 ${getWidth(text)} 18`}
      xmlns="http://www.w3.org/2000/svg"
      fill="red"
    >
      <rect x={0} y={0} width="100%" height="18" rx="9" ry="9" fill={color} strokeWidth="0" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" style={styles.text}>
        {text}
      </text>
    </svg>
  );
};

export default BadgeMarker;
