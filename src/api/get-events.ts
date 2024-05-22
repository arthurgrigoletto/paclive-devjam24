import { api } from '@/lib/axios'

export interface GetEventsResponse {
  id: string
  name: string
  eventCode: string
  eventDate: Date
  location: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getEvents() {
  const response = await api.get<Array<GetEventsResponse>>('/events')

  return response.data
}
