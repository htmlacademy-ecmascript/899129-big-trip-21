import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

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
  const firstDate = dayjs(firstPoint.date_from);
  const secondDate = dayjs(secondPoint.date_from);
  const result = firstDate.isBefore(secondDate);

  return result ? -result : firstDate.isAfter(secondDate);
};


function convertToTitleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export {
  getRandomNumber,
  getRandomArrayElement,
  formatDate,
  getPointDuration,
  convertToTitleCase,
  isTripPointInFuture,
  isTripPointInPresent,
  isTripPointInPast,
  comparePointsByDate
};
