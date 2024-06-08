import { getRandomFloat, getRandomInteger, getRandomValue } from '../utils';
import { POSTERS, TITLES, GENRES, DESCRIPTIONS, ALTERNATIVE_TITLES, DIRECTORS, WRITERS, ACTORS, COUNTRYS, } from './const';

const FILM_COUNT = 5;
const MAX_COMMENTS_ON_FILM = 10;

const generateRating = () => getRandomFloat(1, 10).toFixed(1);

const generateFilm = () => ({
  poster: getRandomValue(POSTERS),
  title: getRandomValue(TITLES),
  rating: generateRating(),
  alternativeTitles: getRandomValue(ALTERNATIVE_TITLES),
  director: getRandomValue(DIRECTORS),
  writers: getRandomValue(WRITERS),
  actors: getRandomValue(ACTORS),
  release: {
    date: '2021-01-01T00:00:00.000Z', // TODO доработать с dayjs
    country: getRandomValue(COUNTRYS),
  },
  runtime: 115, // TODO доработать с dayjs
  genre: getRandomValue(GENRES),
  description: getRandomValue(DESCRIPTIONS),
});

const generateFilms = () => {
  const films = Array.from({ length: FILM_COUNT }, generateFilm);

  let totalCommentsCount = 0;

  return films.map((film, index) => {
    const hasComments = getRandomInteger(0, 1);

    const filmCommentsCount  = getRandomInteger(1, MAX_COMMENTS_ON_FILM);

    totalCommentsCount += filmCommentsCount;

    return {
      id: String(index + 1),
      comments: (hasComments)
        ? Array.from(
          { length: filmCommentsCount },
          (_value, commentIndex) => String(totalCommentsCount - commentIndex)
        )
        : [],
      filmInfo: film,
    };
  });
};

export { generateFilms };
