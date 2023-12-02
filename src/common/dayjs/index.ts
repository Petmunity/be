import defaultDayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const dayjs = (value: string | Date) => {
  defaultDayjs.extend(utc);

  return defaultDayjs(value);
};
