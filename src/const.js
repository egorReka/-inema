const FILM_COUNT = 23;
const MAX_COMMENTS_ON_FILM = 10;
const FILM_COUNT_PER_STEP = 5;

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const FILTER_TYPE_ALL_NAME = 'All movies';

const FilterType = {
  ALL: 'all movies',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserStatusValue = {
  NOVICE: 0,
  FAN: 10,
  MOVIE_BUFF: 20,
};

const UserStatusTitle = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

export {
  FILM_COUNT,
  MAX_COMMENTS_ON_FILM,
  FILM_COUNT_PER_STEP,
  EMOTIONS,
  FILTER_TYPE_ALL_NAME,
  FilterType,
  SortType,
  UserStatusValue,
  UserStatusTitle,
};
