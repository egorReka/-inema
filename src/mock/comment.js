import dayjs from 'dayjs';
import { getRandomInteger, getRandomValue } from '../utils';
import { AUTORS, MESSAGES, EMOTIONS } from './const';

const generateComment = () => ({
  autor: getRandomValue(AUTORS),
  message: getRandomValue(MESSAGES),
  date: dayjs().subtract(getRandomInteger(0, 500), 'day'),
  emotion: getRandomValue(EMOTIONS),
});

const getCommentsCount = (films) => films.reduce(
  (count, film) => count + film.comments.length, 0
);

const generateComments = (films) => {
  const commentsCount = getCommentsCount(films);

  return Array.from({ length: commentsCount }, (_value, index) => {
    const commentItem = generateComment();

    return {
      id: String(index + 1),
      ...commentItem,
    };
  });
};

export { generateComments };
