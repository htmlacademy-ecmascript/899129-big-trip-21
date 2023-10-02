import HeaderPresenter from './header-presenter.js';
import MainPresenter from './main-presenter.js';
import NewEventButtonView from '../view/new-event-button-view.js';

export default class PagePresenter {
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #headerPresenter = null;
  #mainPresenter = null;

  #newEventButtonComponent = null;

  init = (pointsModel, offersModel, destinationsModel, filterModel) => {
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newEventButtonComponent = new NewEventButtonView({
      handleClick: this.#handleNewEventButtonClick
    });

    this.#headerPresenter = new HeaderPresenter({
      pointsModel: this.#pointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      filterModel: this.#filterModel,
      buttonComponent: this.#newEventButtonComponent
    });

    this.#mainPresenter = new MainPresenter({
      pointsModel: this.#pointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      filterModel: this.#filterModel,
      handleNewPointDestroy: this.#handleNewPointFormClose,
      handleServerError: this.#blockNewEventButton
    });

    this.#headerPresenter.init();
    this.#mainPresenter.init();
  };


  #handleNewPointFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };

  #blockNewEventButton = () => {
    this.#newEventButtonComponent.element.disabled = true;
  };

  #handleNewEventButtonClick = () => {
    this.#mainPresenter.createPoint();
    this.#blockNewEventButton();
  };
}
