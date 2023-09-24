import { getRandomNumber } from '../utils';

const mockDestinations = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'The city proper is the fourth most populous in California and 17th most populous in the United States, with 815,201 residents as of 2021.',
    name: 'San Francisco',
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        'description': 'San Francisco center'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 3,
    description: 'The capital and most populous city of Norway.',
    name: 'Oslo',
    pictures: []
  }
];

const getDestinations = () => mockDestinations;

export { getDestinations };
