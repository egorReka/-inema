import { render } from '../framework/render';
import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmListView from '../view/film-list-view';
import FilmListContainerView from '../view/film-list-container-view';
import FilmButtonMoreView from '../view/film-button-more-view';
import FilmDetailsView from '../view/film-details-view';
import FilmListEmptyView from '../view/film-list-empty-view';
import { FILM_COUNT_PER_STEP } from '../const';
import FilmPresenter from './film-presenter';

export default class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new FilmButtonMoreView();
  #filmDetailsComponent = null;

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilmBoard();
  };

  #renderFilmButtonMore() {
    render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
    this.#filmButtonMoreComponent.setButtonClickHandler(this.#filmButtonMoreClickHandler);
  }

  #renderSort(container) {
    render(this.#sortComponent, container);
  }

  #renderFilmListContainer(container) {
    render(this.#filmsComponent, container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  }

  #renderFilmList() {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP), this.#filmListContainerComponent);

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderFilmButtonMore();
    }
  }

  #renderFilms(from, to, container) {
    this.#films
      .slice(from, to)
      .forEach((film) =>
        this.#renderFilm(film, container)
      );
  }

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(container, this.#addFilmDetailsComponent, this.#onEscKeyDown);

    filmPresenter.init(film);
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.film = film;
    const comments = [...this.#commentsModel.film];

    this.#filmDetailsComponent = new FilmDetailsView(film, comments);
    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#removeFilmDetailsComponent);

    render(this.#filmDetailsComponent, this.#container.parentElement);
  };

  #renderFilmBoard() {
    if (this.#films.length === 0) {
      render(new FilmListEmptyView(), this.#container);
      return;
    }

    this.#renderSort(this.#container);
    this.#renderFilmListContainer(this.#container);
    this.#renderFilmList();
  }

  #addFilmDetailsComponent = (film) => {
    this.#renderFilmDetails(film);
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
    }
  };

  #filmButtonMoreClickHandler = () => {
    this.#renderFilms(
      this.#renderedFilmCount,
      this.#renderedFilmCount + FILM_COUNT_PER_STEP,
      this.#filmListContainerComponent);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  };
}
