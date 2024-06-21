import AbstractView from '../framework/view/abstract-view';
import { createFilmCardInfoTemplate } from './film-card-info-template';
import  { createFilmCardControlsTemplate }  from './film-card-controls-template';

const createFilmCardTemplate = ({ filmInfo, comments }) =>
  `
    <article class="film-card">

      ${createFilmCardInfoTemplate(filmInfo, comments.length)}

      ${createFilmCardControlsTemplate()}

    </article>
  `;

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
