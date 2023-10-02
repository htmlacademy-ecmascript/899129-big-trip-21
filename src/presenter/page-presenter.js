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

  #newPointButtonComponent = null;

  init = (pointsModel, offersModel, destinationsModel, filterModel) => {
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newPointButtonComponent = new NewEventButtonView({
      handleClick: this.#handleNewPointButtonClick
    });

    this.#headerPresenter = new HeaderPresenter({
      pointsModel: this.#pointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      filterModel: this.#filterModel,
      buttonComponent: this.#newPointButtonComponent
    });

    this.#mainPresenter = new MainPresenter({
      pointsModel: this.#pointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      filterModel: this.#filterModel,
      handleNewPointDestroy: this.#handleNewPointFormClose
    });

    this.#headerPresenter.init();
    this.#mainPresenter.init();
  };


  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.#mainPresenter.createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };
}
