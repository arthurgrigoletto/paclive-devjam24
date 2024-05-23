import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'

import type { GetEventDetailProps } from '../get-event-detail'
import { GetEventsResponse } from '../get-events'
import { getEvent } from './events-db'
import { get } from 'http'

export const getEventDetailMock = http.get<
  GetEventDetailProps,
  never,
  GetEventsResponse
>('/events/:eventId', async ({ params }) => {
  const event = getEvent(params.eventId)
  return HttpResponse.json(event)
})
