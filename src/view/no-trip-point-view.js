import AbstractView from '../framework/view/abstract-view.js';
import {FilterText} from '../const.js';

const createNoTripPointTemplate = () =>
  `<p class="trip-events__msg">
    ${FilterText.EVERYTHING}
  </p>`;

export default class NoTripPointView extends AbstractView {
  get template() {
    return createNoTripPointTemplate();
  }
}
