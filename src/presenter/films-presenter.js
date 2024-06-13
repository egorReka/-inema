import {render} from '../render';
import SortView from '../view/filter-view';
import FilmsView from '../view/films-view';
import FilmListView from '../view/film-list-view';
import FilmListContainerView from '../view/film-list-container-view';
import FilmCardView from '../view/film-card-view';
import FilmButtonMoreView from '../view/film-button-more-view';
import FilmDetailsView from '../view/film-details-view';

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

  init = (container, filmsModel, commentsModel) => {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#films = [...this.#filmsModel.films];

    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilm(this.#films[i], this.#filmListContainerComponent);
    }

    render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
  };

  #renderFilm = (film, container) => {
    const filmCardComponent = new FilmCardView(film);
    const linkFilmCardElement = filmCardComponent.element.querySelector('a');

    linkFilmCardElement.addEventListener('click', () => {
      this.#addFilmDetailsComponent(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    render(filmCardComponent, container.element);
  };

  #renderFilmDetails = (film) => {
    this.#commentsModel.film = film;
    const comments = [...this.#commentsModel.film];

    this.#filmDetailsComponent = new FilmDetailsView(film, comments);

    const closeButtonFilmDetailsElement =
      this.#filmDetailsComponent.element
        .querySelector('.film-details__close-btn');

    closeButtonFilmDetailsElement.addEventListener('click', () => {
      this.#removeFilmDetailsComponent();
    });

    render(this.#filmDetailsComponent, this.#container.parentElement);
  };

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
}
