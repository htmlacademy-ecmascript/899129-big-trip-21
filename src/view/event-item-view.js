import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, getPointDuration } from '../utils.js';
import { DATE_TIME_FORMAT } from '../const';

function createOffersListTemplate(chosenOffers, offers) {
  return chosenOffers.map((id) => {
    const offer = offers.filter((item) => item.id === id);
    return `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </li>`;
  }).join('');
}

function createEventItemTemplate(point, offersList, destination) {
  const { basePrice, dateFrom, dateTo, isFavorite, offers, type } = point;

  const shortStartDate = formatDate(dateFrom, DATE_TIME_FORMAT.shortDate);
  const startDate = formatDate(dateFrom, DATE_TIME_FORMAT.date);

  const startTime = formatDate(dateFrom, DATE_TIME_FORMAT.dateTime);
  const shortStartTime = formatDate(dateFrom, DATE_TIME_FORMAT.time);

  const endTime = formatDate(dateTo, DATE_TIME_FORMAT.dateTime);
  const shortEndTime = formatDate(dateTo, DATE_TIME_FORMAT.time);

  const duration = getPointDuration(dateFrom, dateTo);

  return (`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${startDate}">${shortStartDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startTime}">${shortStartTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${endTime}">${shortEndTime}</time>
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
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`
  );
}

export default class EventItemView extends AbstractView {
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
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClickHandler);
    this.#handleFavoriteClick = handleFavoriteClick;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventItemTemplate(
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
