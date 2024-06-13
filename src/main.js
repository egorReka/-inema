import { render } from './render';

// Model
import FilmsModel from './model/film-model';
import CommentsModel from './model/comment-model';

// View
import HeaderProfileView from './view/header-profile-view';
import FilterView from './view/sort-view';
import FooterStatisticsView from './view/footer-statistics-view';

// Presenter
import FilmsPresenter from './presenter/films-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');


const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);

render(new HeaderProfileView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterElement);

filmsPresenter.init();
