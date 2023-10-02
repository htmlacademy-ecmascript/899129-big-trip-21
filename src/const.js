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

const DatetimeFormat = {
  DATETIME: 'YYYY-MM-DDTHH:mm',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  SHORT_DATE: 'MMM DD',
  FORM_DATETIME: 'DD/MM/YY HH:mm',
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
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const EMPTY_POINT = {
  'basePrice': 0,
  'dateFrom': null,
  'dateTo': null,
  'destination': null,
  'isFavorite': false,
  'offers': [],
  'type': POINT_TYPES[0]
};

const Path = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

const HTTPMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export {
  POINT_TYPES,
  DatetimeFormat,
  FilterType,
  FilterText,
  PointMode,
  SortType,
  Action,
  UpdateType,
  FormType,
  EMPTY_POINT,
  Path,
  TimeLimit,
  HTTPMethod
};
