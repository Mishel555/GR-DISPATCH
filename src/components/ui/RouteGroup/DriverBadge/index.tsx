import { Space, Typography } from 'antd';
import styled from 'styled-components';
import { IRouteDriver } from '@types';
import { COLORS } from '@constants/theme';
import { getDriverStatus } from '@utils';
import { DriverStatusBadge } from '@components/ui';

interface IProps {
  driver: IRouteDriver;
}

const Label = styled(Typography.Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.GREY_MAIN};
`;

const DriverBadge = ({ driver }: IProps) => {
  const status = getDriverStatus(driver.lastCoordinatesTime);

  return (
    <Space>
      <DriverStatusBadge status={status} />
      <Label>{driver.name}</Label>
    </Space>
  );
};

export default DriverBadge;
