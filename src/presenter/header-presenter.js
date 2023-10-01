import {RenderPosition, render, replace, remove} from '../framework/render.js';
import FilterPresenter from './filter-presenter.js';
import TripInfoView from '../view/trip-info-view.js';
import {comparePointsByDate, getFilters} from '../utils.js';

export default class HeaderPresenter {
  #tripMainElement = document.querySelector('.trip-main');

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #tripInfoComponent = null;
  #buttonComponent = null;

  #filterPresenter = null;

  constructor({
    pointsModel,
    offersModel,
    destinationsModel,
    filterModel,
    buttonComponent
  }) {
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#buttonComponent = buttonComponent;

    this.#filterPresenter = new FilterPresenter({
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.points;
    const filteredPoints = getFilters()[this.filter](points);
    return filteredPoints.sort(comparePointsByDate);
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get filter() {
    return this.#filterModel.filter;
  }

  init = () => {
    this.#filterPresenter.init();

    if (this.points.length) {
      this.#renderTripInfo();
    }

    this.#renderButton();
  };

  #renderTripInfo = () => {
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      tripPoints: this.points,
      destinations: this.destinations,
      offers: this.offers
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #renderButton = () => {
    render(this.#buttonComponent, this.#tripMainElement);
  };

  #handleModelEvent = () => {
    if (!this.points.length) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
      return;
    }
    this.#renderTripInfo();
  };
}
