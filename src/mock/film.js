import { getRandomInteger, getRandomFloat } from '../utils';

const generatePoster = () => {
  const posters = [
    '/images/posters/made-for-each-other.png',
    '/images/posters/popeye-meets-sinbad.png',
    '/images/posters/sagebrush-trail.jpg',
    '/images/posters/santa-claus-conquers-the-martians.jpg',
    '/images/posters/the-dance-of-life.jpg',
    '/images/posters/the-great-flamarion.jpg',
    '/images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateFilmName = () => {
  const FilmsNames = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
  ];

  const randomIndex = getRandomInteger(0, FilmsNames.length - 1);

  return FilmsNames[randomIndex];
};

const generateRating = () => getRandomFloat(1, 10).toFixed(1);

const generateYear = () => getRandomInteger(1950, 2024);

const generateGenre = () => {
  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Musical',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'War',
    'Western',
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…',
    'Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant\'s narrow escap…',
    'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
    'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
    'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const getCounter = () => {
  let counter = 0;

  return () => counter++;
};

const generateCommentsId = getCounter();

const generateAutor = () => {
  const autors = [
    'Kate Muir',
    'Tim Macoveev',
    'John Doe',
    'Bob Smith',
    'Jane Doe',
    'Tom Smith',
    'Mark Smith',
    'Sara Smith',
    'Alex Smith',
  ];

  const randomIndex = getRandomInteger(0, autors.length - 1);

  return autors[randomIndex];
};

const generateMessage = () => {
  const messages = [
    'The best film ever',
    'I like this film',
    'The film is so good',
    'I love this film',
    'I don\'t like this film',
  ];

  const randomIndex = getRandomInteger(0, messages.length - 1);

  return messages[randomIndex];
};

const generateEmotion = () => {
  const emotions = [
    'sad',
    'angry',
    'happy',
    'excited',
    'surprised',
    'smile',
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateComments = () => ({
  id: generateCommentsId(),
  autor: generateAutor(),
  message: generateMessage(),
  date: '2021-01-01T00:00:00.000Z', // TODO доработать с dayjs
  emotion: generateEmotion(),
});

export const generateFilm = () => ({
  poster: generatePoster(),
  filmName: generateFilmName(),
  rating: generateRating(),
  releaseYear: generateYear(),
  duration: '1h 55m', // TODO доработать с dayjs
  genre: generateGenre(),
  description: generateDescription(),
  comments: generateComments(),
});
