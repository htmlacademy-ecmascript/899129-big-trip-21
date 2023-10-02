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
  formDateTime: 'DD/MM/YY HH:mm',
  PICKER_DATETIME: 'd/m/y H:i'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const FilterText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now'
};

const FormType = {
  CREATING: 'CREATING',
  EDITING: 'EDITING'
};

const PointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const Action = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const EMPTY_POINT = {
  'basePrice': 0,
  'dateFrom': null,
  'dateTo': null,
  'destination': null,
  'isFavorite': false,
  'offers': [],
  'type': POINT_TYPES[0],
};

const Path = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations'
};

export {
  RENDER_EVENT_COUNT,
  POINT_TYPES, DATE_TIME_FORMAT,
  FilterType,
  FilterText,
  PointMode,
  SortType,
  Action,
  UpdateType,
  FormType,
  EMPTY_POINT,
  Path
};
