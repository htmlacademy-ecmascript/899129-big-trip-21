import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';
export default class OfferModel extends Observable {
  #apiService = null;
  #offers = [];

  constructor({ apiService }) {
    super();
    this.#apiService = apiService;
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#apiService.offers;
    } catch (err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  };
}
