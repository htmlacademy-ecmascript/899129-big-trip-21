const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Drive slowly',
        price: 80
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Order meal',
        price: 70
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 20
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Book a taxi at the arrival point',
        price: 200
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 150
      },
      {
        id: 2,
        title: 'Upgrade to comfort class',
        price: 125
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'With air conditioning',
        price: 60
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 85
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 40
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 32
      },
      {
        id: 3,
        title: 'Upgrade to a business class',
        price: 116
      },
      {
        id: 4,
        title: 'Add luggage',
        price: 27
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Choose the time of check-in',
        price: 140
      },
      {
        id: 2,
        title: 'Choose the time of check-out',
        price: 100
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Choose live music',
        price: 300
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Choose live music',
        price: 200
      },
      {
        id: 2,
        title: 'Choose VIP area',
        price: 240
      }
    ]
  },
];

const getOffers = () => mockOffers;

export { getOffers };
