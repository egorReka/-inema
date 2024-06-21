import AbstractView from '../framework/view/abstract-view';
import { createFilmDetailsCommentsTemplate } from './film-details-comments-template';
import { createFilmDetailsControlsTemplate } from './film-details-controls-template';
import { createFilmDetailsFormTemplate } from './film-details-form-template';
import { createFilmDetailsInfoTemplate } from './film-details-info-template';

const createFilmDetailsTemplate = ({ filmInfo }, comments ) =>
  `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          ${createFilmDetailsInfoTemplate(filmInfo)}

          ${createFilmDetailsControlsTemplate()}

        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            ${createFilmDetailsCommentsTemplate(comments)}

            ${createFilmDetailsFormTemplate()}

          </section>
        </div>
      </form>
    </section>
  `;

export default class FilmDetailsView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
  }
}
