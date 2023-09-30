import EventItemView from '../view/event-item-view';
import EventEditingView from '../view/event-editing-view';
import EventHeaderView from '../view/event-header-view';
import EventDetailsView from '../view/event-details-view';
import EventDestinationView from '../view/event-destination-view';
import EventOffersView from '../view/event-offers-view';
import { PointMode } from '../const';
import {render, replace, remove} from '../framework/render.js';

export default class TripPointPresenter {
  #parentContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #offersModel = null;
  #destinationsModel = null;

  #tripPointComponent = null;
  #formComponent = null;

  #tripPoint = null;
  #mode = PointMode.DEFAULT;

  constructor({
    parentContainer,
    offersModel,
    destinationsModel,
    onDataChange,
    onModeChange
  }) {
    this.#parentContainer = parentContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  #replaceTripPointToForm = () => {
    replace(this.#formComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = PointMode.EDITING;
  };

  #replaceFormToTripPoint = () => {
    replace(this.#tripPointComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = PointMode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToTripPoint();
    }
  };

  #handleRollupButtonDownClick = () => {
    this.#replaceTripPointToForm();
  };

  #handleRollupButtonUpClick = () => {
    this.#replaceFormToTripPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#tripPoint, 'is_favorite': !this.#tripPoint.is_favorite });
  };

  #handleFormSubmit = () => {
    this.#replaceFormToTripPoint();
  };

  destroy = () => {
    remove(this.#tripPointComponent);
    remove(this.#formComponent);
  };

  resetView = () => {
    if (this.#mode !== PointMode.DEFAULT) {
      this.#replaceFormToTripPoint();
    }
  };

  init(tripPoint) {
    this.#tripPoint = tripPoint;

    const offers = this.#offersModel.getByType(this.#tripPoint.type);
    const destination = this.#destinationsModel.getById(this.#tripPoint.destination);
    const destinations = this.#destinationsModel.destinations;

    const prevPointComponent = this.#tripPointComponent;
    const prevFormComponent = this.#formComponent;

    this.#tripPointComponent = new EventItemView({
      tripPoint: this.#tripPoint,
      offers: offers,
      destination: destination,
      onRollupButtonClick: this.#handleRollupButtonDownClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#formComponent = new EventEditingView({
      onFormSubmit: this.#handleFormSubmit
    });

    const formElement = this.#formComponent.element.querySelector('.event');
    const formDetailsComponent = new EventDetailsView();

    render(new EventHeaderView({
      tripPoint: this.#tripPoint,
      destinationList: destinations,
      destination: destination,
      onRollupButtonClick: this.#handleRollupButtonUpClick
    }), formElement);

    render(formDetailsComponent, formElement);
    if (destination) {
      render(new EventDestinationView({ destination: destination }),
        formDetailsComponent.element);
    }

    if (offers.length) {
      render(new EventOffersView({
        pointOffers: tripPoint.offers,
        offers: offers
      }), formDetailsComponent.element);
    }

    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.#tripPointComponent, this.#parentContainer);
      return;
    }

    if (this.#mode === PointMode.DEFAULT) {
      replace(this.#tripPointComponent, prevPointComponent);
    }

    if (this.#mode === PointMode.EDITING) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevPointComponent);
    remove(prevFormComponent);
  }
}
