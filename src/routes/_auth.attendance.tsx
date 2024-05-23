import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Select } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { z } from 'zod'

import analytics1 from '@/assets/analytics-1.png'
import analytics2 from '@/assets/analytics-2.png'
import analytics3 from '@/assets/analytics-3.png'
import analytics4 from '@/assets/analytics-4.png'
import analytics5 from '@/assets/analytics-5.png'
import analytics6 from '@/assets/analytics-6.png'
import analytics7 from '@/assets/analytics-7.png'

const attendanceSearchSchema = z.object({
  clientId: z.string().default('').optional(),
  event: z.string().default('').optional(),
})

export const Route = createFileRoute('/_auth/attendance')({
  component: AttendancePage,
  validateSearch: attendanceSearchSchema,
})

function AttendancePage() {
  const { clientId, event } = Route.useSearch()
  const router = useRouter()
  const navigate = Route.useNavigate()

  return (
    <section className="flex flex-col space-y-8 bg-[#F5F7FA]">
      <div className="flex flex-col gap-2">
        <button
          className="inline-flex items-center gap-2"
          onClick={() => router.history.back()}
        >
          <ArrowLeft className="size-3" />
          <span className="text-sm font-normal text-[#181F25] underline">
            Back to Event Detail
          </span>
        </button>
        <h2 className="text-3xl font-bold text-[#181F25]">
          Attendance Dashboard
        </h2>
      </div>

      <div className="flex w-full items-center gap-4">
        <fieldset className="flex w-48 flex-col gap-1">
          <label className="text-base font-medium text-[#181F25]">
            Client ID*
          </label>
          <Select
            className="h-10"
            onChange={(value) =>
              navigate({ search: (prev) => ({ ...prev, clientId: value }) })
            }
            value={clientId || null}
            placeholder="- Select -"
            options={[{ label: '10822991', value: '10822991' }]}
          />
        </fieldset>
        <fieldset className="flex w-48 flex-col gap-1">
          <label className="text-base font-medium text-[#181F25]">Event*</label>
          <Select
            className="h-10"
            onChange={(value) =>
              navigate({ search: (prev) => ({ ...prev, event: value }) })
            }
            value={event || null}
            placeholder="- Select -"
            options={[{ label: 'Barbeque', value: 'Barbeque' }]}
          />
        </fieldset>
      </div>

      <div className="grid grid-cols-3 gap-4 rounded-lg bg-white p-6 pb-24">
        <img src={analytics1} alt="" className="h-[200px] w-[500px] border" />
        <img src={analytics2} alt="" className="h-[200px] w-[500px] border" />
        <img src={analytics3} alt="" className="h-[200px] w-[500px] border" />
        <img src={analytics4} alt="" className="h-[450px] w-[500px] border" />
        <img src={analytics5} alt="" className="h-[450px] w-[500px] border" />
        <img src={analytics6} alt="" className="h-[450px] w-[500px] border" />
        <img
          src={analytics7}
          alt=""
          className="col-span-3 h-[450px] w-full border"
        />
      </div>
    </section>
  )
}
