import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

import { GetEventsResponse } from '../get-events'

export const getEventsMock = http.get<never, never, Array<GetEventsResponse>>(
  '/events',
  async () => {
    const events: Array<GetEventsResponse> = Array.from({ length: 7 }).map(
      () => ({
        id: faker.string.uuid(),
        name: faker.lorem.words({ max: 4, min: 1 }),
        status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
        eventCode: 'GS2035',
        location: 'Luca Arena',
        eventDate: faker.date.future(),
        createdAt: faker.date.past(),
        updatedAt: null,
      }),
    )
    return HttpResponse.json(events)
  },
)
