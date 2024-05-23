import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

import { GetEventsResponse } from '../get-events'

const events = [
  {
    id: `LUCAGYM24`,
    name: 'Luca Gym Membership 2024',
    status: 'ACTIVE',
    location: 'Luca Recreational Center',
    capacity: 200,
    displayEndedAt: true,
    displayStartedAt: true,
    endedAt: new Date('01/01/25'),
    startedAt: new Date('01/01/24'),
    price: 50.0,
    priceTier: 1,
    type: 'Membership',
    ticketDesignId: 'MOB.1',
    createdAt: faker.date.past(),
    updatedAt: null,
  },
  {
    id: `SUMMER20`,
    name: 'Luca 20% Off Smoothies Coupon',
    status: 'ACTIVE',
    location: 'Luca Smoothie Shop',
    capacity: 200,
    displayEndedAt: true,
    displayStartedAt: true,
    endedAt: new Date('9/23/24'),
    startedAt: new Date('6/19/24'),
    price: 50.0,
    priceTier: 1,
    type: 'Coupon',
    ticketDesignId: 'MOB.2',
    createdAt: faker.date.past(),
    updatedAt: null,
  },
  {
    id: `BIGBEAR24`,
    name: 'Big Bear Resort Student Excursion 2024',
    status: 'ACTIVE',
    location: 'Big Bear Mountain Resort',
    capacity: 200,
    displayEndedAt: true,
    displayStartedAt: true,
    endedAt: new Date('5/28/24'),
    startedAt: new Date('5/25/24'),
    price: 50.0,
    priceTier: 1,
    type: 'Event',
    ticketDesignId: 'MOB.3',
    createdAt: faker.date.past(),
    updatedAt: null,
  },
]

export const getEventsMock = http.get<never, never, Array<GetEventsResponse>>(
  '/events',
  async () => {
    return HttpResponse.json(events)
  },
)
