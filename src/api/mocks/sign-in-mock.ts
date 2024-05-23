import { http, HttpResponse } from 'msw'

import { tokenCookieKey } from '@/context/auth'

import { SignInBody } from '../sign-in'

export const signInMock = http.post<never, SignInBody>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'devjam@paciolan.com') {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': `${tokenCookieKey}=sample-jwt`,
        },
      })
    }
    return new HttpResponse(null, { status: 401 })
  },
)
