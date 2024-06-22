import dayjs from 'dayjs';
import { getRandomFloat, getRandomInteger, getRandomValue } from '../utils/common';
import {
  POSTERS, TITLES, GENRES,
  DESCRIPTIONS, ALTERNATIVE_TITLES,
  DIRECTORS, WRITERS, ACTORS, COUNTRYS,
} from './const';

import {FILM_COUNT, MAX_COMMENTS_ON_FILM } from '../const';

const generateRating = () => getRandomFloat(1, 10).toFixed(1);
const generateDate = () => dayjs().subtract(getRandomInteger(0, 100), 'year');

const generateGenre = (genres) => {
  const countGenres = getRandomInteger(1, 3);

  return Array.from({length: countGenres}, () => genres[getRandomInteger(1, genres.length - 1)]);
};

const generateFilm = () => ({
  poster: getRandomValue(POSTERS),
  title: getRandomValue(TITLES),
  rating: generateRating(),
  alternativeTitles: getRandomValue(ALTERNATIVE_TITLES),
  director: getRandomValue(DIRECTORS),
  writers: getRandomValue(WRITERS),
  actors: getRandomValue(ACTORS),
  release: {
    date: generateDate(),
    country: getRandomValue(COUNTRYS),
  },
  runtime: getRandomInteger(30, 400),
  genre: generateGenre(GENRES),
  description: getRandomValue(DESCRIPTIONS),
});

const generateFilms = () => {
  const films = Array.from({ length: FILM_COUNT }, generateFilm);

  let totalCommentsCount = 0;

  const getWatchingDate = () => {
    const date = new Date();

    date.setDate(
      date.getDate() - getRandomInteger(0, 7)
    );

    return date.toISOString();
  };

  return films.map((film, index) => {
    const hasComments = getRandomInteger(0, 1);

    const filmCommentsCount  = getRandomInteger(1, MAX_COMMENTS_ON_FILM);

    if (hasComments) {totalCommentsCount += filmCommentsCount;}

    const alreadyWatched = Boolean(getRandomInteger(0, 1));

    return {
      id: String(index + 1),
      comments: (hasComments)
        ? Array.from(
          { length: filmCommentsCount },
          (_value, commentIndex) => String(totalCommentsCount - commentIndex)
        )
        : [],
      filmInfo: film,
      userDetails: {
        watchlist: Boolean(getRandomInteger(0, 1)),
        alreadyWatched,
        watchingDate: (alreadyWatched) ? getWatchingDate() : null,
        favorite: Boolean(getRandomInteger(0, 1)),
      },
    };
  });
};

export { generateFilms };
