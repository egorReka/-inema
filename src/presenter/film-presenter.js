import FilmCardView from '../view/film-card-view';
import { render } from '../framework/render';

export default class FilmPresenter {
  #container = null;
  #film = null;
  #escKeyDownHandler = null;
  #clickCardHandler = null;

  constructor(container, clickCardHandler, escKeyDownHandler) {
    this.#container = container;
    this.#clickCardHandler = clickCardHandler;
    this.#escKeyDownHandler = escKeyDownHandler;
  }

  init = (film) => {
    this.#film = film;

    const filmCardComponent = new FilmCardView(this.#film);
    const linkFilmCardElement = filmCardComponent.element.querySelector('a');

    linkFilmCardElement.addEventListener('click', () => {
      this.#clickCardHandler(this.#film);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    });

    render(filmCardComponent, this.#container.element);
  };
}
