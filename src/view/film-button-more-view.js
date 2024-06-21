import AbstractView from '../framework/view/abstract-view';

const createButtonMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmButtonMoreView extends AbstractView {
  get template() {
    return createButtonMoreTemplate();
  }
}
