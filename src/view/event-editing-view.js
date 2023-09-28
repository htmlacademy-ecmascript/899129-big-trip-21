import AbstractView from '../framework/view/abstract-view.js';

const createEditingTemplate = () =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    </form>
  </li>`;
export default class EventEditingView extends AbstractView {
  #handleFormSubmit = null;

  constructor({onFormSubmit}) {
    super();
    this.#handleFormSubmit = onFormSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditingTemplate();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
