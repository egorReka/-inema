import { EMOTIONS } from '../mock/const';

const createEmotionItem = (emotion) =>
  `
    <input class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${emotion}"
      value="${emotion}">

    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>
  `;

export const createFilmDetailsFormTemplate = () =>
  `
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${EMOTIONS.map(createEmotionItem).join('')}
      </div>
    </div>
  `;

