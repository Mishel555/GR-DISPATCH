import { IIconDefaultProps } from '@types';

interface IProps extends IIconDefaultProps {
}

const DriverStoreIcon = ({ color = '#484655' }: IProps) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.07502 0.349067L9.11669 2.08518C9.14916 2.13918 9.16632 2.20099 9.16634 2.264C9.16708 2.5324 9.08987 2.79525 8.9441 3.02061C8.79832 3.24598 8.59025 3.42418 8.34515 3.53357C8.10004 3.64295 7.82845 3.67883 7.56335 3.63683C7.29826 3.59483 7.05105 3.47677 6.85176 3.29698C6.59789 3.52682 6.26766 3.65411 5.9252 3.65411C5.58274 3.65411 5.25251 3.52682 4.99864 3.29698C4.74487 3.52634 4.41499 3.65332 4.07294 3.65332C3.73089 3.65332 3.40101 3.52634 3.14725 3.29698C2.89274 3.52688 2.56174 3.65376 2.21877 3.65289H2.216C1.84847 3.65197 1.49634 3.50515 1.23701 3.24472C0.977676 2.98428 0.832364 2.63153 0.83301 2.264C0.83303 2.20099 0.850194 2.13918 0.882663 2.08518L1.92433 0.349067C1.95519 0.297709 1.99881 0.255209 2.05095 0.2257C2.10309 0.19619 2.16198 0.180675 2.2219 0.180664H7.77746C7.83737 0.180675 7.89626 0.19619 7.94841 0.2257C8.00055 0.255209 8.04417 0.297709 8.07502 0.349067ZM6.8528 4.12927C7.14183 4.27293 7.46025 4.34757 7.78301 4.34733C7.8976 4.34581 8.01187 4.3349 8.12468 4.31469V7.81955C8.12468 7.91164 8.08809 7.99996 8.02298 8.06508C7.95786 8.13019 7.86954 8.16677 7.77745 8.16677H5.69412V6.08344H4.30523V8.16677H2.2219C2.12981 8.16677 2.04149 8.13019 1.97637 8.06508C1.91126 7.99996 1.87467 7.91164 1.87467 7.81955V4.31608C1.98834 4.33578 2.10342 4.34623 2.21877 4.34733C2.54089 4.34787 2.85873 4.27358 3.14724 4.13032C3.23254 4.17255 3.32058 4.20898 3.41079 4.23934C3.66886 4.32708 3.94176 4.36277 4.21372 4.34435C4.48567 4.32594 4.75127 4.25378 4.99516 4.13205L4.99898 4.13032C5.08439 4.17255 5.17255 4.20898 5.26287 4.23934C5.52105 4.32688 5.794 4.36244 6.06599 4.34396C6.33798 4.32549 6.60362 4.25335 6.84759 4.13171L6.8528 4.12927Z"
      fill={color}
    />
  </svg>
);

export default DriverStoreIcon;