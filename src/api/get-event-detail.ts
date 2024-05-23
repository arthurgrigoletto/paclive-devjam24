import { api } from '@/lib/axios'

import type { GetEventsResponse } from './get-events'

export type GetEventDetailProps = {
  eventId: string
}

export async function getEventDetail({ eventId }: GetEventDetailProps) {
  const response = await api.get<GetEventsResponse>(`/events/${eventId}`)

  return response.data
}
