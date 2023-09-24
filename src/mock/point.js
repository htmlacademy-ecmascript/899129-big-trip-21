import {POINT_TYPES} from '../const';
import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2023-05-10T09:00:00.000Z',
    dateTo: '2023-05-17T09:00:00.000Z',
    destination: 1,
    isFavorite: false,
    offers: [1],
    type: POINT_TYPES[0]
  },
  {
    id: 2,
    basePrice: 2100,
    dateFrom: '2023-05-25T09:00:00.000Z',
    dateTo: '2023-05-25T10:30:00.000Z',
    destination: 2,
    isFavorite: true,
    offers: [1, 2],
    type: POINT_TYPES[1]
  },
  {
    id: 3,
    basePrice: 700,
    dateFrom: '2017-01-10T15:57:56.845Z',
    dateTo: '2017-01-18T07:10:16.375Z',
    destination: 3,
    isFavorite: true,
    offers: [1, 2, 3, 4],
    type: POINT_TYPES[5]
  },
  {
    id: 4,
    basePrice: 221,
    dateFrom: '2017-01-10T15:57:56.845Z',
    dateTo: '2017-01-18T07:10:16.375Z',
    destination: 1,
    isFavorite: true,
    offers: [],
    type: POINT_TYPES[5]
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
