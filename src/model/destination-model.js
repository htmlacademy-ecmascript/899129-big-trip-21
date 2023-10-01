import { getDestinations } from '../mock/destination';
import Observable from '../framework/observable.js';

export default class DestinationModel extends Observable {
  #destinations;

  constructor() {
    super();
    this.#destinations = getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
