import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

import type { GetEventDetailProps } from '../get-event-detail'
import { GetEventsResponse } from '../get-events'

export const getEventDetailMock = http.get<
  GetEventDetailProps,
  never,
  GetEventsResponse
>('/events/:eventId', async ({ params }) => {
  return HttpResponse.json({
    id: params.eventId,
    name: faker.lorem.words({ max: 4, min: 1 }),
    status: 'ACTIVE',
    location: 'luca-arena',
    capacity: faker.number.int({ max: 10 }),
    displayEndedAt: faker.datatype.boolean(),
    displayStartedAt: faker.datatype.boolean(),
    endedAt: faker.date.future(),
    startedAt: faker.date.future(),
    price: faker.number.float().toFixed(2),
    priceTier: faker.number.int({ min: 1, max: 2 }).toString(),
    ticketDesignId: 'MOB.101',
    createdAt: faker.date.past(),
    updatedAt: null,
  })
})
