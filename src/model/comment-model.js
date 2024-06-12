import { generateComments } from '../mock/comment';

export default class CommentsModel {
  #filmsModel = null;
  #allComments = [];
  #comments = [];
  #film = null;

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
    this.generateAllComments();
  }

  generateAllComments() {
    this.#allComments = generateComments(this.#filmsModel.films);
  }

  set film(film) {
    this.#film = film;
  }

  get film() {
    this.#comments = this.#film.comments.map((commentId) =>
      this.#allComments.find((comment) =>
        comment.id === commentId)
    );

    return this.#comments;
  }
}
