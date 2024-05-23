import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getEventDetailMock } from './get-event-detail-mock'
import { getEventsMock } from './get-events-mock'
import { getProfileMock } from './get-profile-mock'
import { signInMock } from './sign-in-mock'

export const worker = setupWorker(
  signInMock,
  getProfileMock,
  getEventsMock,
  getEventDetailMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
