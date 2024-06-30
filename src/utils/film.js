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

const sortFilmsByDate = (filmA, filmB) =>
  new Date(filmB.filmInfo.release.date) - new Date(filmA.filmInfo.release.date);

const sortFilmsByRating = (filmA, filmB) =>
  filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {
  humanizeDateWithTime,
  humanizeDateToYear,
  humanizeDateToDateMonthYear,
  convertMinutesToHours,
  sortFilmsByDate,
  sortFilmsByRating,
};
