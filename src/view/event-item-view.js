import AbstractView from '../framework/view/abstract-view.js';
import { DATE_TIME_FORMAT } from '../const.js';
import { formatDate, getPointDuration } from '../utils.js';
import he from 'he';

const createOffersListTemplate = (pointOffers, offers) =>
  pointOffers.map((pointOfferId) => {
    const offer = offers.find((el) => el.id === pointOfferId);
    return `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;
  }).join('');

const createTripPointTemplate = (point, offersList, destination) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type, offers } = point;

  const shortDate = formatDate(dateFrom, DATE_TIME_FORMAT.shortDate);

  const startDatetime = formatDate(dateFrom, DATE_TIME_FORMAT.dateTime);
  const startDate = formatDate(dateFrom, DATE_TIME_FORMAT.date);
  const startTime = formatDate(dateFrom, DATE_TIME_FORMAT.time);

  const endDatetime = formatDate(dateTo, DATE_TIME_FORMAT.date);
  const endTime = formatDate(dateTo, DATE_TIME_FORMAT.time);

  const duration = getPointDuration(dateFrom, dateTo);

  const destinationName = he.encode(destination.name);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime=${startDate}>${shortDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destinationName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${startDatetime}>${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime=${endDatetime}>${endTime}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffersListTemplate(offers, offersList)}
    </ul>
    <button class="event__favorite-btn ${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripPointView extends AbstractView {
  #point = null;
  #offers = null;
  #destination = null;
  #handleRollupButtonClick = null;
  #handleFavoriteClick = null;

  constructor({
    tripPoint,
    offers,
    destination,
    handleRollupButtonDownClick,
    handleFavoriteClick
  }) {
    super();

    this.#point = tripPoint;
    this.#offers = offers;
    this.#destination = destination;

    this.#handleRollupButtonClick = handleRollupButtonDownClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);

    this.#handleFavoriteClick = handleFavoriteClick;
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripPointTemplate(
      this.#point,
      this.#offers,
      this.#destination
    );
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
