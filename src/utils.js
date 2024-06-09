import dayjs from 'dayjs';

// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

const getRandomValue = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);

  return items[randomIndex];
};

const formatStringToDateWithTime = (date) => dayjs(date).format('YYYY/MM/DD hh:mm'); // 2019/12/31 23:59

const formatStringToYear = (date) => dayjs(date).format('YYYY');

const formatStringToDate = (date) => dayjs(date).format('D MMMM YYYY');

const formatMinutesToTime = (minutes) => {
  const MINUTES_PER_HOUR = 60;


  return (MINUTES_PER_HOUR > minutes)
    ? `${minutes}`
    : `${Math.floor(minutes / MINUTES_PER_HOUR)}h ${minutes % MINUTES_PER_HOUR}m`;
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomValue,
  formatMinutesToTime,
  formatStringToDateWithTime,
  formatStringToYear,
  formatStringToDate
};
