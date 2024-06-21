import { convertMinutesToHours, humanizeDateToDateMonthYear } from '../utils/film';

const generateGenreTitle = (genre) =>
  (genre.length > 1)
    ? 'Genres'
    : 'Genre';

const generateGenereList = (genres) =>
  genres.map((genre) =>
    `<span class="film-details__genre">${genre}</span>`
  ).join('');

export const createFilmDetailsInfoTemplate = (filmInfo) => {
  const { poster, title, alternativeTitles, rating, director, writers, actors, release, runtime, genre, description } = filmInfo;
  const {date, country } = release;

  return `
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="${title}">

        <p class="film-details__age">18+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitles}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${humanizeDateToDateMonthYear(date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${convertMinutesToHours(runtime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${country}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${generateGenreTitle(genre)}</td>
            <td class="film-details__cell">
              ${generateGenereList(genre)}
            </td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>
  `;
};
