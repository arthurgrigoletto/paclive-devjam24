import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

import { GetEventsResponse } from '../get-events'

export const getEventsMock = http.get<never, never, Array<GetEventsResponse>>(
  '/events',
  async () => {
    const events: Array<GetEventsResponse> = Array.from({ length: 3 }).map(
      (_, index) => ({
        id: `GS203${index}`,
        name: faker.lorem.words({ max: 4, min: 1 }),
        status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
        location: 'Luca Arena',
        capacity: faker.number.int({ max: 10 }),
        displayEndedAt: faker.datatype.boolean(),
        displayStartedAt: faker.datatype.boolean(),
        endedAt: null,
        // endedAt: faker.date.future(),
        startedAt: faker.date.future(),
        price: faker.number.float().toFixed(2),
        priceTier: faker.number.int().toString(),
        ticketDesignId: faker.string.nanoid(),
        createdAt: faker.date.past(),
        updatedAt: null,
      }),
    )
    return HttpResponse.json(events)
  },
)
