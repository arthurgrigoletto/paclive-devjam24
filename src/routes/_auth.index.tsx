import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'

import { getEvents } from '@/api/get-events'
import { Chart } from '@/components/icons/chart'
import { Filter } from '@/components/icons/filter'
import { Plus } from '@/components/icons/plus'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: eventList } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  const navigate = useNavigate()

  console.log({ eventList })

  return (
    <section className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#181F25]">Event List</h2>
        <div className="flex items-center gap-8">
          <button
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-sm border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
            onClick={() => navigate({'to':'/predictive-analysis'})}
          >
            <Chart className="size-5" />
            Data & Insight
          </button>
          <Button size="lg" className="inline-flex items-center gap-2">
            <Plus className="size-5" /> Add New
          </Button>
        </div>
      </div>

      <div className="bg-white p-6">
        <div className="flex items-center justify-between">
          <button className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-sm border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]">
            <Filter />
            Filter
          </button>

          <div className="flex h-9 items-center gap-2 rounded border border-[#CCD1D9] px-3 py-2">
            <Search className="size-3" />
            <input
              className="h-full flex-1 bg-transparent outline-none placeholder:text-sm placeholder:text-gray-400"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
