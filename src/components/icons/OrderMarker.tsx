import { IIconDefaultProps } from '@types';

interface IProps extends IIconDefaultProps {
  alert?: boolean;
  withoutDot?: boolean;
}

const OrderMarkerIcon = ({ alert, withoutDot, color = '#34B9B5' }: IProps) => alert ? (
  <svg
    width="34"
    height={withoutDot ? 34.5 : 46}
    viewBox={`0 0 34 ${withoutDot ? 34.5 : 46}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {!withoutDot && <circle cx="17" cy="42" r="4" fill={color} />}
    <path
      d="M13.6 34C6.08893 34 7.26097e-08 27.9111 1.62178e-07 20.4L2.43268e-07 13.6C3.32836e-07 6.08893 6.08893 7.26098e-08 13.6 1.62178e-07L20.4 2.43268e-07C27.9111 3.32836e-07 34 6.08893 34 13.6L34 20.4C34 27.9111 27.9111 34 20.4 34L13.6 34Z"
      fill={color}
    />
    <path
      d="M11.5825 18.1728H14.415V24.7728C14.415 26.3128 15.2492 26.6245 16.2667 25.4695L23.2058 17.5862C24.0583 16.6237 23.7008 15.8262 22.4083 15.8262H19.5758V9.22617C19.5758 7.68617 18.7417 7.3745 17.7242 8.5295L10.785 16.4128C9.94168 17.3845 10.2992 18.1728 11.5825 18.1728Z"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
) : (
  <svg
    width="34"
    height={withoutDot ? 34.5 : 46}
    viewBox={`0 0 34 ${withoutDot ? 34.5 : 46}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {!withoutDot && <circle cx="17" cy="42" r="4" fill={color} />}
    <path
      d="M13.6 34C6.08893 34 7.26097e-08 27.9111 1.62178e-07 20.4L2.43268e-07 13.6C3.32836e-07 6.08893 6.08893 7.26098e-08 13.6 1.62178e-07L20.4 2.43268e-07C27.9111 3.32836e-07 34 6.08893 34 13.6L34 20.4C34 27.9111 27.9111 34 20.4 34L13.6 34Z"
      fill={color}
    />
    <path
      d="M16.9998 18.7113C18.6484 18.7113 19.9849 17.3821 19.9849 15.7424C19.9849 14.1027 18.6484 12.7734 16.9998 12.7734C15.3511 12.7734 14.0146 14.1027 14.0146 15.7424C14.0146 17.3821 15.3511 18.7113 16.9998 18.7113Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M8.98226 13.7866C10.8671 5.84628 23.1425 5.85545 25.0178 13.7958C26.1181 18.4536 23.0947 22.3962 20.4444 24.8352C18.5213 26.614 15.4787 26.614 13.5461 24.8352C10.9054 22.3962 7.88197 18.4444 8.98226 13.7866Z"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

export default OrderMarkerIcon;
