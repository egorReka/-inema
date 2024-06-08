import { generateComments } from '../mock/comment';

export default class CommentsModel {
  comments = generateComments();

  get = () => this.comments;
}
