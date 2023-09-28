import AbstractView from '../framework/view/abstract-view.js';

function createTypeOffersTemplate(pointOffers, offerList) {
  return offerList.map((offer, index) => {
    const checkedOffer = pointOffers.filter((id) => id === offer.id).length;
    return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-luggage" ${checkedOffer ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${index}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;
  }).join('');
}

function createEventOffersTemplate(pointOffers, typeOffers) {
  return (`<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">
  ${createTypeOffersTemplate(pointOffers, typeOffers)}
  </div>
</section>`);
}

export default class EventOffersView extends AbstractView {
  #pointOffers;
  #offers;

  constructor({pointOffers, offers}) {
    super();
    this.#pointOffers = pointOffers;
    this.#offers = offers;
  }

  get template() {
    return createEventOffersTemplate(this.#pointOffers, this.#offers);
  }
}

