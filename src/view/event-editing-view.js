import { createElement } from '../render';

function createEditingTemplate() {
  return (`<form class="event event--edit" action="#" method="post">
  </form>`);
}

export default class EventEditingView {
  getTemplate() {
    return createEditingTemplate();
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
