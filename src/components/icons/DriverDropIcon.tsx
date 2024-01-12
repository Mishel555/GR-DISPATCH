import { IIconDefaultProps } from '@types';

interface IProps extends IIconDefaultProps {
}

const DriverStoreIcon = ({ color = '#484655' }: IProps) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.75 4.875C9.75 8.25 6 10.875 6 10.875C6 10.875 2.25 8.25 2.25 4.875C2.25 3.88044 2.64509 2.92661 3.34835 2.22335C4.05161 1.52009 5.00544 1.125 6 1.125C6.99456 1.125 7.94839 1.52009 8.65165 2.22335C9.35491 2.92661 9.75 3.88044 9.75 4.875Z" fill={color} />
    <path d="M6 6.375C6.82843 6.375 7.5 5.70343 7.5 4.875C7.5 4.04657 6.82843 3.375 6 3.375C5.17157 3.375 4.5 4.04657 4.5 4.875C4.5 5.70343 5.17157 6.375 6 6.375Z" fill="#fff" />
  </svg>
);

export default DriverStoreIcon;
