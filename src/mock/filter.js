import { isTripPointInFuture, isTripPointInPresent, isTripPointInPast } from '../utils.js';
import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isTripPointInFuture(point.date_from)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isTripPointInPresent(point.date_from, point.date_to)),
  [FilterType.PAST]: (points) => points.filter((point) => isTripPointInPast(point.date_to))
};

const generateFilter = (tripPoints) =>
  Object.entries(filter).map(
    ([filterType, filterTasks]) => ({
      type: filterType,
      count: filterTasks(tripPoints).length,
    }),
  );

export { generateFilter };
