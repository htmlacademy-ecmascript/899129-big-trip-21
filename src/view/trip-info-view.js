import AbstractView from '../framework/view/abstract-view.js';
import { DatetimeFormat } from '../const.js';
import { formatDate } from '../utils.js';

const createTripInfoMainTemplate = (points, destinations) => {
  const startDate = formatDate(points[0].dateFrom, DatetimeFormat.SHORT_DATE);
  const endDate = formatDate(points[points.length - 1].dateTo, DatetimeFormat.SHORT_DATE);

  let destinationNames = points.map((point) => destinations.find((el) => point.destination === el.id).name);
  destinationNames = destinationNames.filter((el, i, array) => array[i] !== array[i + 1]);

  let title;

  switch (destinationNames.length) {
    case 1:
      title = destinationNames[0];
      break;
    case 2:
      title = `${destinationNames[0]} &mdash; ${destinationNames[1]}`;
      break;
    case 3:
      title = `${destinationNames[0]} &mdash; ${destinationNames[1]} &mdash; ${destinationNames[2]}`;
      break;
    default:
      title = `${destinationNames[0]} &mdash; &hellip; &mdash; ${destinationNames[destinationNames.length - 1]}`;
  }

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${title}</h1>

    <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
  </div>`;
};

const createTripInfoCostTemplate = (points, offers) => {
  let cost = 0;

  points.map((point) => {
    cost += point.basePrice ? point.basePrice : 0;
    const offersList = offers.find((el) => el.type === point.type).offers;
    point.offers.map((pointOfferId) => {
      const offer = offersList.find((el) => el.id === pointOfferId);
      cost += offer.price ? offer.price : 0;
    });
  });

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

const createTripInfoTemplate = (points, destinations, offers) =>
  `<section class="trip-main__trip-info  trip-info">
    ${createTripInfoMainTemplate(points, destinations)}

    ${createTripInfoCostTemplate(points, offers)}
  </section>`;

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({ tripPoints, destinations, offers }) {
    super();

    this.#points = tripPoints;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
