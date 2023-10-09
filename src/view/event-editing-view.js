import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DatetimeFormat, POINT_TYPES, FormType, EMPTY_POINT } from '../const.js';
import { convertToTitleCase, formatDate } from '../utils.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const createEventTypeDropdownTemplate = (point) => {
  const { isDisabled } = point;
  return POINT_TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${convertToTitleCase(type)}</label>
    </div>`
  ).join('');
};

const createDestinationOptionsTemplate = (destinations) =>
  destinations.map((destination) =>
    `<option value="${he.encode(destination.name)}"></option>`).join('');

const createRollupButtonTemplate = (type, point) => {
  const { isDisabled } = point;
  return type === FormType.EDITING ?
    `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}/>` :
    '';
};

const createFormButtonsTemplate = (type, point) => {
  const { isDisabled, isDeleting, isSaving } = point;
  const buttonText = type === FormType.CREATING ? 'Cancel' : 'Delete';

  return `<button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
    ${isDeleting ? 'Deleting...' : `${buttonText}`}
  </button >
  ${createRollupButtonTemplate(type, point)}`;
};

const createFormHeaderTemplate = (point, destinationList, destination, formType) => {
  const { basePrice, dateFrom, dateTo, type, isDisabled } = point;

  const startDatetime = dateFrom ? formatDate(dateFrom, DatetimeFormat.FORM_DATETIME) : '';
  const endDatetime = dateTo ? formatDate(dateTo, DatetimeFormat.FORM_DATETIME) : '';

  const typeName = type ? type : POINT_TYPES[0];

  const destinationName = destination?.name ? he.encode(destination.name) : '';

  return `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${typeName}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createEventTypeDropdownTemplate(point)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${typeName}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-1">
        ${createDestinationOptionsTemplate(destinationList)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDatetime}" ${isDisabled ? 'disabled' : ''}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDatetime}" ${isDisabled ? 'disabled' : ''}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
    </div>

    ${createFormButtonsTemplate(formType, point)}
  </header>`;
};

const createOffersTemplate = (pointOffers, offersList, point) => {
  const { isDisabled } = point;

  return offersList.map((offer) => {
    const offerChecked = pointOffers.filter((el) => el === offer.id).length;
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-comfort" ${offerChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${he.encode(offer.title)}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`);
  }).join('');
};

const createFormOffersTemplate = (pointOffers, offersList, point) =>
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${createOffersTemplate(pointOffers, offersList, point)}
    </div>
  </section>`;

const createPicturesTemplate = (pictures) =>
  pictures.map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`);

const createFormDestinationTemplate = (destination) => {
  const description = destination.description ? destination.description : '';
  const pictures = destination.pictures;

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${he.encode(description)}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createPicturesTemplate(pictures)}
      </div>
    </div>
  </section>`;
};

const createFormDetailsTemplate = (point, offersList, destination) => {
  const typeOffers = offersList.find((offers) => offers.type === point.type).offers;

  return `<section class="event__details">
    ${typeOffers.length ? createFormOffersTemplate(point.offers, typeOffers, point) : ''}
    ${destination ? createFormDestinationTemplate(destination) : ''}
  </section>`;
};

const createEditFormTemplate = (point, destinationList, offersList, type) => {
  const destination = destinationList.find((el) => el.id === point.destination);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createFormHeaderTemplate(point, destinationList, destination, type)}
      ${createFormDetailsTemplate(point, offersList, destination)}
    </form>
  </li>`;
};

export default class EventEditingView extends AbstractStatefulView {
  #destinationList = null;
  #offersList = null;

  #type = null;

  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCancelClick = null;

  #datepickers = null;

  constructor({
    tripPoint = EMPTY_POINT,
    destinationList,
    offersList,
    type = FormType.EDITING,
    handleFormSubmit,
    handleDeleteClick,
    handleCancelClick: handleCancelClick
  }) {
    super();

    this._setState(EventEditingView.parsePointToState(tripPoint));
    this.#destinationList = destinationList;
    this.#offersList = offersList;

    this.#type = type;

    this.#handleFormSubmit = handleFormSubmit;
    this.#handleDeleteClick = handleDeleteClick;
    this.#handleCancelClick = handleCancelClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(
      this._state,
      this.#destinationList,
      this.#offersList,
      this.#type
    );
  }

  removeElement = () => {
    super.removeElement();

    this.#datepickers.forEach((datepicker) => datepicker.destroy());
  };

  _restoreHandlers = () => {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox')
      .forEach((offer) => offer.addEventListener('change', this.#offerChangeHandler));

    if (this.#type === FormType.CREATING) {
      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#formCancelClickHandler);
    } else {
      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#formDeleteClickHandler);
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#formCancelClickHandler);
    }

    this.#setDatepickers();
  };

  #setDatepickers = () => {
    const dateElements = this.element.querySelectorAll('.event__input--time');

    this.#datepickers = [...dateElements].map((element, id) => {
      const minDate = id ? dateElements[0].value : null;
      const maxDate = id ? null : dateElements[1].value;
      const defaultDate = id ? dateElements[1].value : dateElements[0].value;

      return flatpickr(
        element,
        {
          dateFormat: DatetimeFormat.PICKER_DATETIME,
          defaultDate,
          enableTime: true,
          minDate,
          maxDate,
          'time_24hr': true,
          locale: {
            firstDayOfWeek: 1,
          },
          onChange: this.#dateChangeHandler
        });
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditingView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditingView.parseStateToPoint(this._state));
  };

  #formCancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destinationList.find((el) => el.name === evt.target.value);
    if (destination) {
      this.updateElement({
        destination: destination.id
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const price = parseInt(evt.target.value, 10) || 0;
    this.updateElement({
      basePrice: price
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const { offers } = this._state;

    if (evt.target.checked) {
      this._setState({
        offers: [...offers, evt.target.id]
      });
    } else {
      const updatedOffers = offers.filter((offer) => offer !== Number(evt.target.id));
      this._setState({
        offers: updatedOffers
      });
    }
  };

  #dateChangeHandler = ([userDate], dateStr, datepicker) => {
    const fieldName = datepicker.element.name === 'event-start-time'
      ? 'dateFrom'
      : 'dateTo';

    this._setState({
      [fieldName]: formatDate(userDate)
    });

    this.#setDatepickers();
  };

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
