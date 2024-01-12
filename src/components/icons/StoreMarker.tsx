import { IIconDefaultProps } from '@types';

interface IProps extends IIconDefaultProps {
  withoutDot?: boolean;
}

const StoreMarkerIcon = ({ withoutDot, color = '#484655' }: IProps) => (
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
      d="M9.57129 16.5996V20.3004C9.57129 24.0011 11.063 25.4847 14.7839 25.4847H19.2507C22.9716 25.4847 24.4633 24.0011 24.4633 20.3004V16.5996"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.02 17.2422C18.5365 17.2422 19.6553 16.0141 19.5061 14.5058L18.9592 9H15.0891L14.5339 14.5058C14.3847 16.0141 15.5034 17.2422 17.02 17.2422Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.2509 17.2422C23.9249 17.2422 25.1514 15.8905 24.9856 14.2338L24.7536 11.9672C24.4553 9.82422 23.6265 9 21.4553 9H18.9277L19.5078 14.7778C19.6487 16.1377 20.8835 17.2422 22.2509 17.2422Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.7498 17.2422C13.1171 17.2422 14.3519 16.1377 14.4845 14.7778L14.6668 12.9563L15.0646 9H12.537C10.3658 9 9.53709 9.82422 9.23876 11.9672L9.015 14.2338C8.84926 15.8905 10.0758 17.2422 11.7498 17.2422Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.021 21.3613C15.6371 21.3613 14.9492 22.0454 14.9492 23.4219V25.4824H19.0928V23.4219C19.0928 22.0454 18.405 21.3613 17.021 21.3613Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default StoreMarkerIcon;
