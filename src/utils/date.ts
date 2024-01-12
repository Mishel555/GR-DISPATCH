import dayjs from 'dayjs';
import { EDateFormats, EDateTimeFormats, ETimeFormats } from '@types';
import { DATE_FORMAT_MAPPINGS, DATE_TIME_FORMATS_MAPPING, TIME_FORMAT_MAPPINGS } from '@constants/config';

export const minutesToHours = (minutes: number): number => Math.floor(minutes / 60);

export const wasOnlineMinutes = (lastCoordinatesTime: string): number => {
  const now = dayjs();
  const mDate = dayjs(lastCoordinatesTime);

  return now.diff(mDate, 'minute');
};

export const getNearestDate = (dateStrings: string[], targetString: string): { value: string; index: number } => {
  const target = dayjs(targetString).valueOf();

  let nearestIndex = -1;
  let nearest = Infinity;

  dateStrings.forEach((dateString, index) => {
    const date = dayjs(dateString).valueOf();
    const distance = Math.abs(date - target);

    if (distance < nearest) {
      nearest = distance;
      nearestIndex = index;
    }
  });

  return {
    index: nearestIndex,
    value: dateStrings[nearestIndex],
  };
};

type TFormattedOrderHeaderDate = {
  alert: boolean;
  formattedDate: string;
};

export const formatOrderHeaderDate = (dateString: string, globalTimeFormat: string): TFormattedOrderHeaderDate => {
  const now = dayjs();
  const date = dayjs(dateString);
  const diff = date.diff(now, 'second');

  const absValue = Math.abs(diff);

  if (absValue <= 60) { // 1 minute
    return {
      alert: diff < 0,
      formattedDate: '<1 min',
    };
  }

  if (absValue < 3600) { // 1 hour
    return {
      alert: diff < 0,
      formattedDate: `${diff < 0 ? '-' : ''} ${Math.floor(absValue / 60)} min`,
    };
  }

  if (absValue > 3600 && absValue < 86400) {
    return {
      alert: diff < 0,
      formattedDate: date.format(globalTimeFormat),
    };
  }

  if (absValue < 86400) { // 1 day
    return {
      alert: diff < 0,
      formattedDate: `${diff < 0 ? '-' : ''}${Math.floor(absValue / 3600)} hour`,
    };
  }

  return {
    alert: diff < 0,
    formattedDate: date.format('MMM DD'),
  };
};

export const getPickUpOverdueTime = (seconds: number): number | false => {
  if (seconds > 0) return false;

  const absoluteValue = Math.abs(seconds);

  if (absoluteValue < 600) return 0; // 10 minutes

  if (absoluteValue < 1200) return 10; // 20 minutes

  if (absoluteValue < 1800) return 20; // 30 minutes

  if (absoluteValue < 2400) return 30; // 40 minutes

  if (absoluteValue < 3000) return 45; // 50 minutes

  return 60; // 60 > minutes
};

export const getTimeFormatString = (format: ETimeFormats): string => TIME_FORMAT_MAPPINGS[format];
export const getDateFormatString = (format: EDateFormats): string => DATE_FORMAT_MAPPINGS[format];
export const getDateTimeFormatString = (format: EDateTimeFormats): string => DATE_TIME_FORMATS_MAPPING[format];
