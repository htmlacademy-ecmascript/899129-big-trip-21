const RENDER_EVENT_COUNT = 3;

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const DATE_TIME_FORMAT = {
  dateTime: 'YYYY-MM-DDTHH:mm',
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
  shortDate: 'MMM DD',
  formDateTime: 'DD/MM/YY HH:mm'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const FilterText = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
};

const PointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'DAY',
  PRICE: 'PRICE',
  TIME: 'TIME',
  EVENT: 'EVENT',
  OFFERS: 'OFFERS'
};

export { RENDER_EVENT_COUNT, POINT_TYPES, DATE_TIME_FORMAT, FilterType, FilterText, PointMode, SortType };
