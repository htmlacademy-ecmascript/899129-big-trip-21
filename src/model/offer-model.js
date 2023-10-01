import { getOffers } from '../mock/offer';
import Observable from '../framework/observable.js';
export default class OfferModel extends Observable{
  #offers;

  constructor() {
    super();
    this.#offers = getOffers();
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
