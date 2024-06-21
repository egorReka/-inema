import dayjs from 'dayjs';

const humanizeDateWithTime = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

const humanizeDateToYear = (date) => dayjs(date).format('YYYY');

const humanizeDateToDateMonthYear = (date) => dayjs(date).format('D MMMM YYYY');

const convertMinutesToHours = (minutes) => {
  const MINUTES_PER_HOUR = 60;

  return (MINUTES_PER_HOUR > minutes)
    ? `${minutes}`
    : `${Math.floor(minutes / MINUTES_PER_HOUR)}h ${minutes % MINUTES_PER_HOUR}m`;
};

export {
  humanizeDateWithTime,
  humanizeDateToYear,
  humanizeDateToDateMonthYear,
  convertMinutesToHours,
};
