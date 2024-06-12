import {createElement} from '../render';

const createButtonMoreTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmButtonMoreView {
  #element = null;

  get template() {
    return createButtonMoreTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
