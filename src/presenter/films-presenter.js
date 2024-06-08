import {render} from '../render';
import SortView from '../view/filter-view';
import FilmsView from '../view/films-view';
import FilmListView from '../view/film-list-view';
import FilmListContainerView from '../view/film-list-container-view';
import FilmCardView from '../view/film-card-view';
import FilmButtonMoreView from '../view/film-button-more-view';
import FilmDetailsView from '../view/film-details-view';


export default class FilmsPresenter {
  sortComponent = new SortView();
  filmsComponent = new FilmsView();
  filmListComponent = new FilmListView();
  filmListContainerComponent = new FilmListContainerView();
  filmButtonMoreComponent = new FilmButtonMoreView();
  filmDetailsComponent = new FilmDetailsView();

  init = (container, filmsModel, commentsModel) => {
    this.container = container;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;

    this.films = [...this.filmsModel.get()];

    render(this.sortComponent, this.container);
    render(this.filmsComponent, this.container);
    render(this.filmListComponent, this.filmsComponent.getElement());
    render(this.filmListContainerComponent, this.filmListComponent.getElement());

    for (let i = 0; i < this.films.length; i++) {
      render(new FilmCardView(this.films[i]), this.filmListContainerComponent.getElement());
    }

    render(this.filmButtonMoreComponent, this.filmListComponent.getElement());

    const comments = [...this.commentsModel.get(this.films[0])];

    render(this.filmDetailsComponent, this.container.parentElement);
  };
}
