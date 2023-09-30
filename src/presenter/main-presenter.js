import TripInfoView from '../view/trip-info-view';
import SortView from '../view/sort-view';
import FilterView from '../view/filter-view';
import EventListView from '../view/event-list-view';
import NoTripPointView from './../view/no-trip-point-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import { generateFilter } from '../mock/filter.js';
import { RenderPosition, render } from '../framework/render.js';
import { updateItem, comparePointsByPrice, comparePointsByTime } from '../utils.js';
import { SortType } from '../const.js';

export default class MainPresenter {
  #contentComponent = new EventListView();
  #tripEventsElement = document.querySelector('.trip-events');
  #sortComponent = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #tripPoints = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  constructor({ pointsModel, offersModel, destinationsModel }) {

    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  #renderTripEvent = (tripPoint) => {
    const tripPointPresenter = new TripPointPresenter({
      parentContainer: this.#contentComponent.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      handlePointChange: this.#handlePointChange,
      handleModeChange: this.#handleModeChange
    });

    tripPointPresenter.init(tripPoint);
    this.#pointPresenters.set(tripPoint.id, tripPointPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView({
      handleSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripEventsElement);
  };

  #renderTripEventsList = () => {
    render(this.#contentComponent, this.#tripEventsElement);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripEvent(this.#tripPoints[i]);
    }
  };

  #clearTripEventsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripPoints.sort(comparePointsByPrice);
        break;
      case SortType.TIME:
        this.#tripPoints.sort(comparePointsByTime);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearTripEventsList();
    this.#renderTripEventsList();
  };

  init() {
    const tripMainElement = document.querySelector('.trip-main');
    const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');

    this.#tripPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.destinations];
    this.#offers = [...this.#offersModel.offers];

    this.#sourcedTripPoints = [...this.#pointsModel.points];

    const filters = generateFilter(this.#tripPoints);

    render(new FilterView({filters}), tripControlsElement);

    if (!this.#tripPoints.length) {
      render(new NoTripPointView(), this.#tripEventsElement);
      return;
    }

    render(new TripInfoView({
      tripPoints: this.#tripPoints,
      destinations: this.#destinations,
      offers: this.#offers
    }), tripMainElement, RenderPosition.AFTERBEGIN);

    this.#renderSort();
    this.#renderTripEventsList();
  }
}
