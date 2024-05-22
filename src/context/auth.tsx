import { useMutation } from '@tanstack/react-query'
import { destroyCookie, parseCookies } from 'nookies'
import * as React from 'react'

import { signIn } from '@/api/sign-in'
import { sleep } from '@/lib/utils'
import type { SignInForm } from '@/routes/login'

export interface AuthContext {
  isAuthenticated: boolean
  logout: () => Promise<void>
  login: (data: SignInForm) => Promise<void>
}

const AuthContext = React.createContext<AuthContext | null>(null)

export const tokenCookieKey = 'paclive.auth.token'

function getStorageToken() {
  const cookies = parseCookies()
  return cookies[tokenCookieKey] ?? null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(getStorageToken())
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(!!token)

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  const logout = React.useCallback(async () => {
    await sleep(250)

    destroyCookie(null, tokenCookieKey)
    setToken(null)
    setIsAuthenticated(false)
  }, [])

  const login = React.useCallback(
    async ({ email, password }: SignInForm) => {
      await authenticate({ email, password })

      const token = getStorageToken()
      setIsAuthenticated(!!token)
    },
    [authenticate],
  )

  React.useEffect(() => {
    setToken(getStorageToken())
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
