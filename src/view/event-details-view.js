import { createElement } from '../render';

function createEventDetailsTemplate() {
  return (`<section class="event__details">
  </section>`);
}

export default class EventDetailsView {
  getTemplate() {
    return createEventDetailsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

