import { IIconDefaultProps } from '@types';

interface IProps extends IIconDefaultProps {
  withoutDot?: boolean;
  marginBottom?: number;
}

const DriverCarMarker = ({ withoutDot, marginBottom = 0, color = '#34B9B5' }: IProps) => {
  const height: number = (withoutDot ? 34.5 : 46) + marginBottom;

  return (
    <svg
      width="34"
      height={height}
      viewBox={`0 0 34 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!withoutDot && <circle cx="17" cy="42" r="4" fill={color} />}
      <path
        d="M13.6 34C6.08893 34 7.26097e-08 27.9111 1.62178e-07 20.4L2.43268e-07 13.6C3.32836e-07 6.08893 6.08893 7.26098e-08 13.6 1.62178e-07L20.4 2.43268e-07C27.9111 3.32836e-07 34 6.08893 34 13.6L34 20.4C34 27.9111 27.9111 34 20.4 34L13.6 34Z"
        fill={color}
      />
      <path
        d="M20.2178 8.59375H13.7828C11.5003 8.59375 10.9962 9.73042 10.7028 11.1238L9.66699 16.0829H24.3337L23.2978 11.1238C23.0045 9.73042 22.5003 8.59375 20.2178 8.59375Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.157 24.169C26.2578 25.2415 25.3962 26.1673 24.2962 26.1673H22.5728C21.5828 26.1673 21.4453 25.7456 21.2712 25.2232L21.0878 24.6732C20.8312 23.9215 20.6662 23.4173 19.3462 23.4173H14.6528C13.3328 23.4173 13.1403 23.9857 12.9112 24.6732L12.7278 25.2232C12.5537 25.7456 12.4162 26.1673 11.4262 26.1673H9.70285C8.60285 26.1673 7.74118 25.2415 7.84201 24.169L8.35535 18.5865C8.48368 17.2115 8.74951 16.084 11.1512 16.084H22.8478C25.2495 16.084 25.5153 17.2115 25.6437 18.5865L26.157 24.169Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.66667 13.334H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25.2497 13.334H24.333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8.75V10.5833" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.625 10.584H18.375" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 19.75H14.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.75 19.75H22.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default DriverCarMarker;
