import { useMemo } from 'react';
import { Space } from 'antd';
import dayjs from 'dayjs';
import { IOrder } from '@types';
import { COLORS } from '@constants/theme';
import { getTimeFormatString } from '@utils';
import { useAppSelector } from '@hooks';
import { selectAppTimeFormat } from '@selectors/configSelector';
import { PinIcon, ShopIcon } from '@components/icons';
import { CustomTooltip } from '@components/ui';
import { RootWrapper, ContentWrapper, Label, ErrorMessage, StyledIcon } from './styled-components';

interface IProps {
  data: IOrder;
}

const Details = ({ data }: IProps) => {
  const timeFormat = useAppSelector(selectAppTimeFormat);
  const timeFormatString = getTimeFormatString(timeFormat);

  const { pickup, dropOff, timestamps } = data;

  const { pickupBy, pickupEta, deliverBy, dropOffEta } = useMemo(() => timestamps, [timestamps]);

  const today = dayjs();

  const pickupDate = dayjs(pickupBy);
  const isPickupToday = today.diff(pickupDate, 'days') < 1;
  const pickupETADate = pickupEta ? dayjs(pickupEta) : null;
  const isPickupDanger = Boolean(pickupETADate && pickupETADate.diff(pickupDate) > 0);

  const dropDate = dayjs(deliverBy);
  const isDropToday = today.diff(dropDate, 'days') < 1;
  const dropETADate = dropOffEta ? dayjs(dropOffEta) : null;
  const isDropOffDanger = Boolean(dropETADate && dropETADate.diff(dropDate) > 0);

  return (
    <RootWrapper>
      <ContentWrapper wrap={false} align="start">
        <Space align="start">
          <StyledIcon component={ShopIcon} />
          <Label>
            {pickup.name ? `${pickup.name}. ` : null}
            {pickup.address.address ? pickup.address.address : <ErrorMessage>Address is missing</ErrorMessage>}
          </Label>
        </Space>
        <CustomTooltip
          arrow={false}
          color={COLORS.GREY_LIGHT}
          title={pickupETADate && `Pick-up ETA: ${pickupETADate.format(timeFormatString)}`}
        >
          <Label isDate danger={isPickupDanger}>
            {isPickupToday ? `Today ${pickupDate.format(timeFormatString)}` : pickupDate.format(`MMM DD / ${timeFormatString}`)}
          </Label>
        </CustomTooltip>
      </ContentWrapper>
      <ContentWrapper wrap={false} align="start">
        <Space align="start">
          <StyledIcon component={PinIcon} />
          {dropOff && (
            <Label>
              {dropOff.name ? `${dropOff.name}. ` : null}
              {dropOff.address.address ? dropOff.address.address : <ErrorMessage>Address is missing</ErrorMessage>}
            </Label>
          )}
        </Space>
        <CustomTooltip
          arrow={false}
          color={COLORS.GREY_LIGHT}
          title={dropETADate && `Drop-off ETA: ${dropETADate.format(timeFormatString)}`}
        >
          <Label isDate danger={isDropOffDanger}>
            {isDropToday ? `Today ${dropDate.format(timeFormatString)}` : dropDate.format(`MMM DD / ${timeFormatString}`)}
          </Label>
        </CustomTooltip>
      </ContentWrapper>
    </RootWrapper>
  );
};

export default Details;
