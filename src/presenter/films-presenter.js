import { remove, render, replace } from '../framework/render';
import SortView from '../view/sort-view';
import FilmsView from '../view/films-view';
import FilmListView from '../view/film-list-view';
import FilmListContainerView from '../view/film-list-container-view';
import FilmButtonMoreView from '../view/film-button-more-view';
import FilmListEmptyView from '../view/film-list-empty-view';
import { FILM_COUNT_PER_STEP, SortType } from '../const';
import FilmPresenter from './film-presenter';
import { updateItem } from '../utils/common';
import FilmDetailsPresenter from './film-details-presenter';
import { sortFilmsByDate, sortFilmsByRating } from '../utils/film';

export default class FilmsPresenter {
  #container = null;
  #filmsModel = null;
  #commentsModel = null;
  #sortComponent = null;

  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new FilmButtonMoreView();

  #films = [];
  #sourcedFilms = [];

  #filmPresenter = new Map();
  #filmDetailsPresenter = null;

  #selectedFilm = null;
  #currentSortType = SortType.DEFAULT;

  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#sourcedFilms = [...this.#filmsModel.films];

    this.#renderFilmBoard();
  };

  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);

    if (this.#filmDetailsPresenter && this.#selectedFilm.id === updatedFilm.id) {
      this.#selectedFilm = updatedFilm;
      this.#renderFilmDetails();
    }
  };

  #renderFilmButtonMore() {
    render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
    this.#filmButtonMoreComponent.setButtonClickHandler(this.#filmButtonMoreClickHandler);
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortFilmsByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderSort(this.#container);
    this.#renderFilmList();
  };

  #renderSort(container) {
    if (!this.#sortComponent) {
      this.#sortComponent = new SortView(this.#currentSortType);
      render(this.#sortComponent, container);
    } else {
      const updatedSortComponent = new SortView(this.#currentSortType);
      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }

    this.#sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);
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

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#filmButtonMoreComponent);
  };

  #renderFilms(from, to, container) {
    this.#films
      .slice(from, to)
      .forEach((film) =>
        this.#renderFilm(film, container)
      );
  }

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(
      container,
      this.#filmChangeHandler,
      this.#addFilmDetailsComponent,
      this.#onEscKeyDown
    );

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilmDetails() {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];

    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        this.#container.parentNode,
        this.#filmChangeHandler,
        this.#removeFilmDetailsComponent,
        this.#onEscKeyDown
      );
    }

    this.#filmDetailsPresenter.init(this.#selectedFilm, comments);
  }

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
    this.#selectedFilm = film;
    this.#renderFilmDetails();
    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;
    this.#selectedFilm = null;

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
