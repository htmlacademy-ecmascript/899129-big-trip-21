import { getRandomPoint } from '../mock/point';
import { RENDER_EVENT_COUNT } from '../const';

export default class PointModel {
  constructor() {
    this.points = Array.from({ length: RENDER_EVENT_COUNT}, getRandomPoint);
  }

  get() {
    return this.points;
  }
}
