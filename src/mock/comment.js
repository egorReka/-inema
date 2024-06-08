import { getRandomValue } from '../utils';
import { AUTORS, MESSAGES, EMOTIONS } from './const';

const generateComment = () => ({
  autor: getRandomValue(AUTORS),
  message: getRandomValue(MESSAGES),
  date: '2021-01-01T00:00:00.000Z', // TODO доработать с dayjs
  emotion: getRandomValue(EMOTIONS),
});

const getCommentsCount = (films) => films.reduce((count, film) => count + film.comments.length, 0);

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
