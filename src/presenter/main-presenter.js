import TripInfoView from '../view/trip-info-view';
import SortView from '../view/sort-view';
import FilterView from '../view/filter-view';
import EventListView from '../view/event-list-view';
import NoTripPointView from './../view/no-trip-point-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import { generateFilter } from '../mock/filter.js';
import { RenderPosition, render } from '../framework/render.js';
import { updateItem } from '../utils.js';

export default class MainPresenter {
  #contentComponent = new EventListView();

  #parentContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #tripPoints = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();

  constructor({ parentContainer, pointsModel, offersModel, destinationsModel }) {
    this.#parentContainer = parentContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  #renderTripEvent = (tripPoint) => {
    const tripPointPresenter = new TripPointPresenter({
      parentContainer: this.#contentComponent.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    tripPointPresenter.init(tripPoint);
    this.#pointPresenters.set(tripPoint.id, tripPointPresenter);
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  init() {
    const tripMainElement = this.#parentContainer.querySelector('.trip-main');
    const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');
    const tripEventsElement = this.#parentContainer.querySelector('.trip-events');

    this.#tripPoints = this.#pointsModel.points;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    const filters = generateFilter(this.#tripPoints);

    render(new FilterView({ filters }), tripControlsElement);

    if (!this.#tripPoints.length) {
      render(new NoTripPointView(), tripEventsElement);
      return;
    }

    render(new TripInfoView({
      tripPoints: this.#tripPoints,
      destinations: this.#destinations,
      offers: this.#offers
    }), tripMainElement, RenderPosition.AFTERBEGIN);

    render(new SortView(), tripEventsElement);

    render(this.#contentComponent, tripEventsElement);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripEvent(this.#tripPoints[i]);
    }
  }
}
