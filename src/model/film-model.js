import { generateFilm } from '../mock/film';

export default class FilmModel {
  films = Array.from({length: 5}, generateFilm);

  getFilms() {
    return this.films;
  }
}
