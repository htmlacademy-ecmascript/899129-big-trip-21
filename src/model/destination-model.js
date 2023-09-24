import { getDestinations } from '../mock/destination';

export default class DestinationModel {
  constructor() {
    this.destinations = getDestinations();
  }

  get() {
    return this.destinations;
  }

  getById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
