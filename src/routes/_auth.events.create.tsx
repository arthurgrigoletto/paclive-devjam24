import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { EventForm } from '@/components/event-form'

export const Route = createFileRoute('/_auth/events/create')({
  component: CreateEventPage,
})

const FORM_ID = 'CREATE_EVENT_FORM_ID'

function CreateEventPage() {
  return (
    <section className="flex flex-col space-y-8 bg-[#F5F7FA]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Link className="inline-flex items-center gap-2" to="/">
            <ArrowLeft className="size-3" />
            <span className="text-sm font-normal text-[#181F25] underline">
              Back to All Events
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-[#181F25]">Add a New Event</h2>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-base font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
          >
            Cancel
          </Link>
          <button
            form={FORM_ID}
            type="submit"
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded border bg-[#B5082A] p-3 px-3 py-2 text-base font-bold text-white shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
          >
            Save
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 pb-24">
        <EventForm id={FORM_ID} />
      </div>
    </section>
  )
}
