import { getDestinations } from '../mock/destination';

export default class DestinationModel {
  #destinations;

  constructor() {
    this.#destinations = getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
