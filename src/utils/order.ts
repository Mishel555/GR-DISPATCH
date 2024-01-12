import dayjs from 'dayjs';
import { FormDateAndTimeType, IFullOrderCreateForm, IOrder } from '@types';
import { deepChangeValues } from './common';

export const MOCK_ADDRESS_VALUE = 'VALUEEE'; // DO NOT EDIT

export const getInitialValues = (orderTemplate: IOrder): IFullOrderCreateForm => {
  const { timestamps, pickup, driver, dropOff, orderDetails, ...rest } = orderTemplate;

  return {
    ...rest,
    driver: driver ? { id: driver.id } : {},
    pickup: {
      id: pickup?.id,
      name: pickup?.name,
      address: pickup?.address?.address,
    },
    dropOff: dropOff ? {
      ...dropOff,
      address: MOCK_ADDRESS_VALUE,
    } : {},
    orderDetails: orderDetails ? orderDetails : [],
    timestamps: {
      pickupBy: { date: dayjs(timestamps.pickupBy), time: dayjs(timestamps.pickupBy) },
      createdTime: { date: dayjs(timestamps.createdTime), time: dayjs(timestamps.createdTime) },
    },
  };
};

export const processFormValuesForOrderCreate = (formValues: IFullOrderCreateForm): IFullOrderCreateForm => {
  const data = deepChangeValues(formValues, undefined, null);

  data.flags ??= {};

  data.FLAGS1?.forEach(key => {
    data.flags[key as keyof IFullOrderCreateForm['flags']] = true;
  });

  data.FLAGS2?.forEach(key => {
    data.flags[key as keyof IFullOrderCreateForm['flags']] = true;
  });

  Object.entries(data.timestamps).forEach(([key, value]) => {
    const keyName = key as keyof IFullOrderCreateForm['timestamps'];

    const { date, time } = value as FormDateAndTimeType;

    if (date && time) {
      const { hours, minutes } = {
        hours: time.get('hour'),
        minutes: time.get('minute'),
      };

      date.set('hour', hours);
      date.set('minute', minutes);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data.timestamps[keyName] = date.format('YYYY-MM-DDTHH:mm:ssZZ');
    } else {
      delete data.timestamps[keyName];
    }
  });

  if (data.dropOff.address === MOCK_ADDRESS_VALUE) {
    delete data.dropOff.address;
  }

  if (data.driver && Object.values(data.driver).length === 0) {
    delete data.driver;
  }

  delete data.FLAGS1;
  delete data.FLAGS2;
  delete data.pickupETA;
  delete data.dropOffETA;
  delete data.signerName;
  delete data.pickup.address;

  return data;
};
