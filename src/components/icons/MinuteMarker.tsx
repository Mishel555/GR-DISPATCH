import { IIconDefaultProps } from '@types';

interface IProps extends IIconDefaultProps {
  minutes: number;
  withoutDot?: boolean;
}

const MinuteMarker = ({ minutes, withoutDot, color = '#484655' }: IProps) => (
  <svg width="40" height={withoutDot ? 41.5 : 56} xmlns="http://www.w3.org/2000/svg" fill="none">
    <g>
      {!withoutDot && <circle id="svg_1" fill={color} r="5" cy="51" cx="20" />}
      <rect transform="rotate(-90 -8.74228e-7 40)" id="svg_2" fill={color} rx="16" height="40" width="40" y="40" />
      <text
        // fontWeight="bold"
        xmlSpace="preserve"
        textAnchor="start"
        fontFamily="Arial"
        fontSize="15"
        strokeWidth="0"
        y="26.20289"
        x="11.44927"
        fill="#ffffff"
      >
        {minutes}
      </text>
    </g>
  </svg>
);

export default MinuteMarker;
