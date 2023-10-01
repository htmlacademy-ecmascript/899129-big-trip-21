import {remove, render, RenderPosition} from '../framework/render.js';
import EventEditingView from '../view/event-editing-view.js';
import {Action, UpdateType, FormType} from '../const.js';

export default class NewPointPresenter {
  #parentContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #formComponent = null;

  constructor({parentContainer, handleDataChange, handleDestroy}) {
    this.#parentContainer = parentContainer;
    this.#handleDataChange = handleDataChange;
    this.#handleDestroy = handleDestroy;
  }

  init(destinations, offers) {
    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new EventEditingView({
      destinationList: destinations,
      offersList: offers,
      type: FormType.CREATING,
      handleFormSubmit: this.#handleFormSubmit,
      handleCanselClick: this.#handleCanselClick
    });

    render(this.#formComponent, this.#parentContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#formComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#formComponent);
    this.#formComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      Action.ADD_POINT,
      UpdateType.MINOR,
      {
        id: crypto.randomUUID(),
        ...point
      },
    );
    this.destroy();
  };

  #handleCanselClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
