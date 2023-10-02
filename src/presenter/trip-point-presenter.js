import { render, replace, remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import EventEditingView from '../view/event-editing-view.js';
import { PointMode, Action, UpdateType } from '../const.js';
import { isDateEqual, isPriceEqual } from '../utils.js';

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
    handleDataChange,
    handleModeChange
  }) {
    this.#parentContainer = parentContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = handleDataChange;
    this.#handleModeChange = handleModeChange;
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
    this.#handleDataChange(
      Action.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#tripPoint,
        isFavorite: !this.#tripPoint.isFavorite
      }
    );
  };

  #handleFormSubmit = (tripPoint) => {
    const isMinorUpdate = !isDateEqual(this.#tripPoint.dateFrom, tripPoint.dateFrom) ||
      !isDateEqual(this.#tripPoint.dateTo, tripPoint.dateTo) ||
      !isPriceEqual(this.#tripPoint.basePrice, tripPoint.basePrice);

    this.#handleDataChange(
      Action.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      tripPoint
    );
    this.#replaceFormToTripPoint();
  };

  #handleDeleteClick = (tripPoint) => {
    this.#handleDataChange(
      Action.DELETE_POINT,
      UpdateType.MINOR,
      tripPoint
    );
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

    const typeOffers = this.#offersModel.getByType(this.#tripPoint.type);
    const destination = this.#destinationsModel.getById(this.#tripPoint.destination);
    const destinations = [...this.#destinationsModel.destinations];
    const offers = [...this.#offersModel.offers];

    const prevPointComponent = this.#tripPointComponent;
    const prevFormComponent = this.#formComponent;

    this.#tripPointComponent = new EventItemView({
      tripPoint: this.#tripPoint,
      offers: typeOffers,
      destination: destination,
      handleRollupButtonDownClick: this.#handleRollupButtonDownClick,
      handleFavoriteClick: this.#handleFavoriteClick,
    });

    this.#formComponent = new EventEditingView({
      tripPoint: this.#tripPoint,
      destinationList: destinations,
      offersList: offers,
      handleFormSubmit: this.#handleFormSubmit,
      handleDeleteClick: this.#handleDeleteClick,
      handleCancelClick: this.#handleRollupButtonUpClick
    });


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
