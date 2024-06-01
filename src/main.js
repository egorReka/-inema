import { render } from './render';

import HeaderProfileView from './view/header-profile-view';
import FilterView from './view/sort-view';
import FooterStatisticsView from './view/footer-statistics-view';

import FilmsPresenter from './presenter/films-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const filmsPresenter = new FilmsPresenter();

render(new HeaderProfileView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterElement);
filmsPresenter.init(siteMainElement);
