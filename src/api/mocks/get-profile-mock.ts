import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'Paciolan',
      email: 'paciolan@example.com',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
