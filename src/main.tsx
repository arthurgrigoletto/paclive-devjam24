import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { enableMSW } from './api/mocks'
import { AuthProvider, useAuth } from './context/auth'
import { queryClient } from './lib/react-query'
import { routeTree } from './routeTree.gen'

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface RouteContext {
    auth: {
      isAuthenticated: boolean
      user: string
      login: (username: string) => void
      logout: () => void
    }
  }
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  )
}

enableMSW()
  .then(() => {
    const rootElement = document.getElementById('root')!
    if (!rootElement.innerHTML) {
      const root = ReactDOM.createRoot(rootElement)
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      )
    }
  })
  .catch((error) => {
    console.error('MSW enabling failed:', error)
  })
