import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-grow flex-row">
        <Sidebar />
        <div className="flex flex-1 flex-col gap-4 p-9">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
