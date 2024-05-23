import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

import { GetEventsResponse } from '../get-events'

const events = [
  {
    id: `GT0101`,
    name: 'Beethoven No .2 Concerto',
    status: 'ACTIVE',
    location: 'Luca Arena',
    capacity: 200,
    displayEndedAt: false,
    displayStartedAt: true,
    endedAt: null,
    startedAt: faker.date.future(),
    price: 50.0,
    priceTier: 1,
    ticketDesignId: 'MOB.1',
    createdAt: faker.date.past(),
    updatedAt: null,
  },
  {
    id: `GT0102`,
    name: 'Metallica Concert - Acoustic',
    status: 'ACTIVE',
    location: 'Luca Theater',
    capacity: 200,
    displayEndedAt: false,
    displayStartedAt: true,
    endedAt: null,
    startedAt: faker.date.future(),
    price: 50.0,
    priceTier: 1,
    ticketDesignId: 'MOB.1',
    createdAt: faker.date.past(),
    updatedAt: null,
  },
  {
    id: `GS2035`,
    name: 'Music Is Art : Recital 2024',
    status: 'ACTIVE',
    location: 'Stadium',
    capacity: 200,
    displayEndedAt: false,
    displayStartedAt: true,
    endedAt: null,
    startedAt: faker.date.future(),
    price: 50.0,
    priceTier: 1,
    ticketDesignId: 'MOB.1',
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
