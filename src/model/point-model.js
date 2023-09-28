import { getRandomPoint } from '../mock/point';
import { RENDER_EVENT_COUNT } from '../const';

export default class PointModel {
  #points;

  constructor() {
    this.#points = Array.from({ length: RENDER_EVENT_COUNT}, getRandomPoint);
  }

  get points() {
    return this.#points;
  }
}
