import { formatMinutesToTime, formatStringToYear } from '../utils';

export const createFilmCardInfoTemplate = (filmInfo, commentsLength) => {
  const {
    poster,
    title,
    rating,
    release,
    runtime,
    genre,
    description,
  } = filmInfo;

  return `
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatStringToYear(release.date)}</span>
        <span class="film-card__duration">${formatMinutesToTime(runtime)}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${commentsLength} comments</span>
    </a>
  `;
};

