import {render, remove} from '../framework/render.js';
import SortView from './../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoTripPointView from './../view/no-trip-point-view.js';
import TripPointPresenter from './trip-point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {comparePointsByPrice, comparePointsByTime, comparePointsByDate, getFilters} from '../utils.js';
import {SortType, FilterType, UpdateType, Action} from '../const.js';

export default class MainPresenter {
  #tripEventsElement = document.querySelector('.trip-events');

  #contentComponent = new EventListView();
  #sortComponent = null;
  #noTripPointComponent = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  #newPointPresenter = null;

  constructor({
    pointsModel,
    offersModel,
    destinationsModel,
    filterModel,
    handleNewPointDestroy
  }) {
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      parentContainer: this.#contentComponent.element,
      handleDataChange: this.#handleViewAction,
      handleDestroy: handleNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.points;
    const filteredPoints = getFilters()[this.filter](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        filteredPoints.sort(comparePointsByPrice);
        break;
      case SortType.TIME:
        filteredPoints.sort(comparePointsByTime);
        break;
      default:
        filteredPoints.sort(comparePointsByDate);
    }

    return filteredPoints;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get filter() {
    return this.#filterModel.filter;
  }

  init = () => {
    this.#renderContent();
  };

  createPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.destinations, this.offers);
  };

  #renderContent = () => {
    if (!this.points.length) {
      this.#renderNoTripPointComponent();
      return;
    }

    this.#renderSort();
    this.#renderTripEventsListComponent();

    this.points.forEach((point) => this.#renderTripEvent(point));
  };

  #clearContent = ({resetSortType = false} = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();

    remove(this.#sortComponent);
    if (this.#noTripPointComponent) {
      remove(this.#noTripPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderNoTripPointComponent = () => {
    this.#noTripPointComponent = new NoTripPointView({
      filterType: this.filter
    });
    render(this.#noTripPointComponent, this.#tripEventsElement);
  };

  #renderTripEventsListComponent = () => {
    render(this.#contentComponent, this.#tripEventsElement);
  };

  #renderTripEvent = (tripPoint) => {
    const tripPointPresenter = new TripPointPresenter({
      parentContainer: this.#contentComponent.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      handleDataChange: this.#handleViewAction,
      handleModeChange: this.#handleModeChange
    });

    tripPointPresenter.init(tripPoint);
    this.#pointPresenters.set(tripPoint.id, tripPointPresenter);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      handleSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripEventsElement);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case Action.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case Action.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case Action.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#clearContent({resetSortType: true});
        this.#renderContent();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearContent();
    this.#renderContent();
  };
}
