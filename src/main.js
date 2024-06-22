import { render } from './framework/render';

// Model
import FilmsModel from './model/film-model';
import CommentsModel from './model/comment-model';

// View
import HeaderProfileView from './view/header-profile-view';
import FilterView from './view/filter-view';
import FooterStatisticsView from './view/footer-statistics-view';

// Presenter
import FilmsPresenter from './presenter/films-presenter';
import { getUserStatus } from './utils/user';
import { generateFilter } from './mock/filter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);

const userStatus = getUserStatus(filmsModel.films);
const filters = generateFilter(filmsModel.films);
const filmsCount = filmsModel.films.length;

render(new HeaderProfileView(userStatus), siteHeaderElement);
render(new FilterView(filters), siteMainElement);
render(new FooterStatisticsView(filmsCount), siteFooterElement);

filmsPresenter.init();
