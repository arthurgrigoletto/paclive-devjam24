import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Link } from 'lucide-react'

export const Route = createFileRoute('/_auth/attendance')({
  component: AttendancePage,
})

function AttendancePage() {
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
          <h2 className="text-3xl font-bold text-[#181F25]">
            Attendance Dashboard
          </h2>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 pb-24" />
    </section>
  )
}
