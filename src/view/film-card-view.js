import { createElement } from '../render';
import { createFilmCardInfoTemplate } from './film-card-info-template';
import  { createFilmCardControlsTemplate }  from './film-card-controls-template';

const createFilmCardTemplate = ({ filmInfo, comments }) =>
  `
    <article class="film-card">

      ${createFilmCardInfoTemplate(filmInfo, comments.length)}

      ${createFilmCardControlsTemplate()}

    </article>
  `;

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
