import { getOffers } from '../mock/offer';

export default class OffernModel {
  constructor() {
    this.offers = getOffers();
  }

  get() {
    return this.offer;
  }

  getByType(type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }
}
