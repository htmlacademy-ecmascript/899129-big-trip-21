import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FilterType } from './const';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MIN_IN_HOUR * HOUR_IN_DAY;

const getRandomNumber = () => Math.random();

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function convertToTitleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function formatDate(date, format) {
  return dayjs(date).format(format);
}

function getPointDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true) {
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }

  return pointDuration;
}

const isTripPointInFuture = (dateFrom) =>
  dateFrom && dayjs(dateFrom).isAfter(dayjs());

const isTripPointInPresent = (dateFrom, dateTo) =>
  dateFrom &&
  dateTo &&
  dayjs(dateFrom).isSameOrBefore(dayjs()) &&
  dayjs(dateTo).isSameOrAfter(dayjs());

const isTripPointInPast = (dateTo) =>
  dateTo && dayjs(dateTo).isBefore(dayjs());

const comparePointsByDate = (firstPoint, secondPoint) => {
  const firstDate = dayjs(firstPoint.dateFrom);
  const secondDate = dayjs(secondPoint.dateFrom);
  const result = firstDate.isBefore(secondDate);

  return result ? -result : firstDate.isAfter(secondDate);
};

const comparePointsByPrice = (firstPoint, secondPoint) => {
  const firstPrice = firstPoint.basePrice;
  const secondPrice = secondPoint.basePrice;

  return secondPrice - firstPrice;
};

const comparePointsByTime = (firstPoint, secondPoint) => {
  const firstDuration = dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom));
  const secondDuration = dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom));

  return secondDuration - firstDuration;
};

const getFilters = () => ({
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isTripPointInFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isTripPointInPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isTripPointInPast(point.dateTo))
});

const isDateEqual = (firstDate, secondDate) =>
  dayjs(firstDate).isSame(secondDate, 'm');

const isPriceEqual = (firstPrice, secondPrice) =>
  firstPrice === secondPrice;

export {
  getRandomNumber,
  getRandomArrayElement,
  formatDate,
  getPointDuration,
  convertToTitleCase,
  isTripPointInFuture,
  isTripPointInPresent,
  isTripPointInPast,
  comparePointsByDate,
  comparePointsByPrice,
  comparePointsByTime,
  getFilters,
  isDateEqual,
  isPriceEqual
};
