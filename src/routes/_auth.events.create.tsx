import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/events/create')({
  component: () => <div>Hello /_auth/events/create!</div>,
})
