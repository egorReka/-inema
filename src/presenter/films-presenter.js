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
      render(new FilmCardView(this.#films[i]), this.#filmListContainerComponent.element);
    }

    render(this.#filmButtonMoreComponent, this.#filmListComponent.element);

    this.#commentsModel.film = this.#films[0];
    const comments = [...this.#commentsModel.film];

    render(new FilmDetailsView(this.#films[0], comments), this.#container.parentElement);
  };
}
