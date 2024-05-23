import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Divider } from 'antd'
import { ArrowLeft, User } from 'lucide-react'

import { getEventDetail } from '@/api/get-event-detail'
import { EventForm } from '@/components/event-form'
import { Chart } from '@/components/icons/chart'
import { StatusTag } from '@/components/status-tag'

const FORM_ID = 'EDIT_EVENT_FORM_ID'

export const Route = createFileRoute('/_auth/events/$eventId')({
  component: EventDetailPage,
})

function EventDetailPage() {
  const { eventId } = Route.useParams()
  const { data: eventDetail } = useQuery({
    queryKey: ['events', eventId] as const,
    queryFn: () => getEventDetail({ eventId }),
    select(data) {
      return {
        ...data,
        startedDate: new Date(data.startedAt),
        startedTime: new Date(data.startedAt),
        endedDate: new Date(data.endedAt),
        endedTime: new Date(data.endedAt),
      }
    },
  })

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
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-[#181F25]">Edit Event</h2>
            <StatusTag status={eventDetail?.status} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-base font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
          >
            Cancel
          </Link>
          <Divider type="vertical" className="h-12 bg-[#CCD1D9]" />
          <button
            form={FORM_ID}
            type="submit"
            className="h-12 rounded border border-[#B5082A] bg-white p-3 font-bold text-[#B5082A] shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
          >
            Save Changes
          </button>
          <button
            form={FORM_ID}
            type="submit"
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded border bg-[#B5082A] p-3 px-3 py-2 text-base font-bold text-white shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
          >
            Save and Publish
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 pb-24">
        <div className="flex items-center justify-between pb-6">
          <h3 className="text-2xl font-bold text-[#181F25]">Event Details</h3>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold text-[#434A54] shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
            >
              <Chart className="size-4" />
              Predict Analytics
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold text-[#434A54] shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
            >
              <User className="size-4" />
              Attendance Dashboard
            </Link>
          </div>
        </div>

        <EventForm
          id={FORM_ID}
          eventData={eventDetail}
          onSubmit={(data) => console.log(data)}
        />
      </div>
    </section>
  )
}
