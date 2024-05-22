import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search } from 'lucide-react'

import { getEvents, type GetEventsResponse } from '@/api/get-events'
import { Chart } from '@/components/icons/chart'
import { Filter } from '@/components/icons/filter'
import { Plus } from '@/components/icons/plus'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/')({
  component: DashboardPage,
})

const columnHelper = createColumnHelper<GetEventsResponse>()

const columns = [
  columnHelper.accessor('eventCode', {
    cell: (info) => info.getValue(),
    header: 'Event Code',
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'Name',
  }),
  columnHelper.accessor('eventDate', {
    cell: (info) => info.getValue(),
    header: 'Event Date/Time',
  }),
  columnHelper.accessor('location', {
    cell: (info) => info.getValue(),
    header: 'Location',
  }),
  columnHelper.accessor('status', {
    cell: (info) => info.getValue(),
    header: 'Status',
  }),
]

function DashboardPage() {
  const { data: eventList, isLoading: isLoadingEventList } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  const table = useReactTable({
    columns,
    data: eventList ?? [],
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <section className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#181F25]">Event List</h2>
        <div className="flex items-center gap-8">
          <button className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-sm border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]">
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

        <table className="mt-6 w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#181F25]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 px-1 text-left text-xs font-medium uppercase text-[#181F25]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${index % 2 === 0 ? 'bg-[#F5F7FA]' : 'bg-white'}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 px-1 text-sm font-normal text-[#181F25]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
