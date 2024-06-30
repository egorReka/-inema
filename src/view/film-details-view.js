import AbstractView from '../framework/view/abstract-view';
import { createFilmDetailsCommentsTemplate } from './film-details-comments-template';
import { createFilmDetailsControlsTemplate } from './film-details-controls-template';
import { createFilmDetailsFormTemplate } from './film-details-form-template';
import { createFilmDetailsInfoTemplate } from './film-details-info-template';

const createFilmDetailsTemplate = ({ filmInfo, userDetails }, comments ) =>
  `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          ${createFilmDetailsInfoTemplate(filmInfo)}

          ${createFilmDetailsControlsTemplate(userDetails)}

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

  setCloseBtnClickHandler = (callback) => {
    this._callback.closeBtnClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeBtnClickHandler);
  };

  setWatchlistBtnClickHandler(callback) {
    this._callback.watchlistBtnClick = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchListBtnClickHandler);
  }

  setWatchedBtnClickHandler(callback) {
    this._callback.watchedBtnClick = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedBtnClickHandler);
  }

  setFavoriteBtnClickHandler(callback) {
    this._callback.favoriteBtnClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteBtnClickHandler);
  }

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeBtnClick();
  };

  #watchListBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistBtnClick();
  };

  #watchedBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedBtnClick();
  };

  #favoriteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteBtnClick();
  };
}
