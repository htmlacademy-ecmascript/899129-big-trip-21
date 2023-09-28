import { getOffers } from '../mock/offer';

export default class OffernModel {
  #offers;

  constructor() {
    this.#offers = getOffers();
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
