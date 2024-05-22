import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Toaster } from '@/components/ui/sonner'
import type { AuthContext } from '@/context/auth'

interface MyRouterContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
    </>
  ),
})
