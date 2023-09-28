import TripInfoView from '../view/trip-info-view';
import SortView from '../view/sort-view';
import EventEditingView from '../view/event-editing-view';
import EventDetailsView from '../view/event-details-view';
import FilterView from '../view/filter-view';
import EventListView from '../view/event-list-view';
import EventDestinationView from '../view/event-destination-view';
import EventHeaderView from '../view/event-header-view';
import EventOffersView from '../view/event-offers-view';
import EventItemView from '../view/event-item-view';
import NoTripPointView from './../view/no-trip-point-view.js';
import {generateFilter} from '../mock/filter.js';
import { RenderPosition, render, replace } from '../framework/render.js';

export default class MainPresenter {
  #contentComponent = new EventListView();

  #parentContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #tripPoints = [];
  #destinations = [];
  #offers = [];

  constructor({parentContainer, pointsModel, offersModel, destinationsModel}) {
    this.#parentContainer = parentContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  #renderTripEvent(tripPoint) {
    const offers = this.#offersModel.getByType(tripPoint.type);
    const destination = this.#destinationsModel.getById(tripPoint.id);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToTripPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripPointComponent = new EventItemView({
      tripPoint: tripPoint,
      offers: offers,
      destination: destination,
      onRollupButtonClick: () => {
        replaceTripPointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const formComponent = new EventEditingView({
      onFormSubmit: () => {
        replaceFormToTripPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    const formElement = formComponent.element.querySelector('.event');
    const formDetailsComponent = new EventDetailsView();

    render(new EventHeaderView({
      tripPoint: tripPoint,
      destinationList: this.#destinations,
      destination: destination,
      onRollupButtonClick: () => {
        replaceFormToTripPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }), formElement);

    render(formDetailsComponent, formElement);
    if (destination) {
      render(new EventDestinationView({destination: destination}),
        formDetailsComponent.element);
    }

    if (offers.length) {
      render(new EventOffersView({
        pointOffers: tripPoint.offers,
        offers: offers
      }), formDetailsComponent.element);
    }

    function replaceTripPointToForm() {
      replace(formComponent, tripPointComponent);
    }

    function replaceFormToTripPoint() {
      replace(tripPointComponent, formComponent);
    }

    render(tripPointComponent, this.#contentComponent.element);
  }

  init() {
    const tripMainElement = this.#parentContainer.querySelector('.trip-main');
    const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');
    const tripEventsElement = this.#parentContainer.querySelector('.trip-events');

    this.#tripPoints = this.#pointsModel.points;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    const filters = generateFilter(this.#tripPoints);

    render(new FilterView({filters}), tripControlsElement);

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
