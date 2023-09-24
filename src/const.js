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

export { RENDER_EVENT_COUNT, POINT_TYPES, DATE_TIME_FORMAT };
