import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation } from '@tanstack/react-router'
import { Checkbox, DatePicker, Input, Progress, Select, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { File, Ticket } from 'lucide-react'
import { type ComponentProps, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { GetEventsResponse } from '@/api/get-events'
import maps from '@/assets/maps.png'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Dropzone } from './dropzone'

const eventForm = z.object({
  id: z.string(),
  name: z.string(),
  capacity: z.coerce.number().default(0).optional(),
  price: z.string().default('0').optional(),
  priceTier: z.string(),
  ticketDesignId: z.string().optional(),
  location: z.string().optional(),
  startedDate: z.date(),
  startedTime: z.date(),
  displayStartedAt: z.boolean().default(false).optional(),
  endedDate: z.date(),
  endedTime: z.date(),
  displayEndedAt: z.boolean().default(false).optional(),
})

export type EventForm = z.infer<typeof eventForm>

export type EventFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  eventData?: GetEventsResponse
  onSubmit: (data: EventForm) => void
}

export function EventForm({ eventData, onSubmit, ...props }: EventFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploadSuccessfully, setIsUploadSuccessfully] = useState(false)
  const [attendanceProgress, setAttendanceProgress] = useState(0)
  const location = useLocation()

  const form = useForm<EventForm>({
    resolver: zodResolver(eventForm),
    defaultValues: {
      capacity: 0,
      displayEndedAt: false,
      displayStartedAt: false,
      endedDate: undefined,
      endedTime: undefined,
      id: '',
      location: '',
      name: '',
      price: '',
      priceTier: '',
      startedDate: undefined,
      startedTime: undefined,
      ticketDesignId: '',
    },
  })

  useEffect(() => {
    if (eventData) {
      form.reset(eventData)
    }
  }, [eventData, form])

  useEffect(() => {
    if (isUploadSuccessfully) {
      const interval = setInterval(() => {
        setAttendanceProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 20
        })
      }, 500)

      return () => clearInterval(interval)
    }
  }, [isUploadSuccessfully])

  return (
    <>
      <form
        className="grid w-full grid-cols-2 gap-x-40"
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="grid auto-rows-min grid-cols-2 gap-8">
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <fieldset className="flex flex-col space-y-1">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Event Name*
                </label>
                <Input
                  {...field}
                  id={field.name}
                  className="h-10"
                  placeholder="Type an event name"
                />
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="id"
            render={({ field }) => (
              <fieldset className="flex flex-col space-y-1">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Event ID*
                </label>
                <Input
                  {...field}
                  id={field.name}
                  className="h-10"
                  placeholder="Type an Event ID"
                />
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="startedDate"
            render={({ field }) => (
              <fieldset className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Start Date*
                </label>
                <DatePicker
                  id={field.name}
                  className="h-10"
                  format={'MM/DD/YYYY'}
                  value={field.value && dayjs(field.value)}
                  onChange={(value) => field.onChange(value.toDate())}
                />
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="startedTime"
            render={({ field }) => (
              <fieldset className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Start Time*
                </label>
                <TimePicker
                  id={field.name}
                  className="h-10"
                  format={'hh:mm A'}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(value) => field.onChange(value.toDate())}
                />
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="displayStartedAt"
            render={({ field }) => (
              <fieldset className="col-span-2 flex flex-row items-center space-x-2 space-y-0">
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                />
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Display this on ticket
                </label>
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="endedDate"
            render={({ field }) => (
              <fieldset className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  End Date*
                </label>
                <DatePicker
                  id={field.name}
                  className="h-10"
                  format={'MM/DD/YYYY'}
                  value={field.value && dayjs(field.value)}
                  onChange={(value) => field.onChange(value.toDate())}
                />
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="endedTime"
            render={({ field }) => (
              <fieldset className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  End Time*
                </label>
                <TimePicker
                  id={field.name}
                  className="h-10"
                  format={'hh:mm A'}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(value) => field.onChange(value.toDate())}
                />
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="displayEndedAt"
            render={({ field }) => (
              <fieldset className="col-span-2 flex flex-row items-center space-x-2 space-y-0">
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                />
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Display this on ticket
                </label>
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <fieldset className="flex flex-col space-y-1">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Capacity*
                </label>
                <span className="text-xs text-[#656D78]">
                  Insert 0 if there is no limit in the event&apos;s capacity
                </span>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="0"
                  className="h-10"
                />
              </fieldset>
            )}
          />

          <Controller
            control={form.control}
            name="price"
            render={({ field }) => (
              <fieldset className="flex flex-col space-y-1">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Ticket Flat Price*
                </label>
                <span className="text-xs text-[#656D78]">
                  Insert 0 if this event is free
                </span>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="$ 0.00"
                  className="h-10"
                />
              </fieldset>
            )}
          />
          <Controller
            control={form.control}
            name="priceTier"
            render={({ field }) => (
              <fieldset className="flex w-64 flex-col">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Price Tier*
                </label>
                <Select
                  id={field.name}
                  className="h-10"
                  placeholder="- Select -"
                  value={field.value || null}
                  onChange={field.onChange}
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                  ]}
                />
              </fieldset>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Controller
            control={form.control}
            name="location"
            render={({ field }) => (
              <fieldset className="flex w-64 flex-col">
                <label
                  htmlFor={field.name}
                  className="text-base font-medium text-[#181F25]"
                >
                  Location
                </label>
                <Select
                  id={field.name}
                  className="h-10"
                  placeholder="- Select -"
                  value={field.value || null}
                  onChange={field.onChange}
                  options={[
                    { value: 'luca-arena', label: 'Luca Arena' },
                    { value: 'luca-stadium', label: 'Luca Stadium' },
                  ]}
                />
              </fieldset>
            )}
          />

          <img
            src={maps}
            alt="map from santa ana stadium"
            className="h-[226px] w-[471px]"
          />

          <div className="flex items-end gap-4">
            <Controller
              control={form.control}
              name="ticketDesignId"
              render={({ field }) => (
                <fieldset className="flex w-64 flex-col">
                  <label
                    htmlFor={field.name}
                    className="text-base font-medium text-[#181F25]"
                  >
                    Choose a Ticket Design*
                  </label>
                  <Select
                    id={field.name}
                    className="h-10"
                    placeholder="- Select -"
                    value={field.value || null}
                    onChange={field.onChange}
                    options={[
                      { value: 'MOB.101', label: 'MOB.101' },
                      { value: 'MOB.102', label: 'MOB.102' },
                    ]}
                  />
                </fieldset>
              )}
            />

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold">OR</span>
              <button
                type="button"
                className="inline-flex h-10 w-fit cursor-pointer items-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
              >
                <Ticket className="size-4 text-[#434A54]" />
                Go to Ticket Designer
              </button>
            </div>
          </div>

          {location.pathname.includes('events') &&
          !location.pathname.includes('create') &&
          !isUploadSuccessfully ? (
            <Dialog>
              <DialogTrigger asChild>
                <button className="mt-4 inline-flex h-10 w-fit cursor-pointer items-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]">
                  Upload Attendance List
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white p-0">
                <DialogHeader className="p-6">
                  <DialogTitle className="text-2xl font-bold">
                    Attendance Import
                  </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                  <Dropzone file={file} setFile={setFile} />
                </div>
                <DialogFooter className="bg-[#F5F7FA] p-2">
                  <DialogClose asChild>
                    <button
                      type="button"
                      disabled={!file}
                      onClick={() => setIsUploadSuccessfully(true)}
                      className="inline-flex h-12 cursor-pointer items-center gap-2 rounded border bg-[#B5082A] p-3 px-3 py-2 text-base font-bold text-white shadow-[0_4px_8px_0_rgba(0,0,0,0.1)] disabled:cursor-not-allowed disabled:border disabled:border-[#CCD1D9] disabled:bg-[#F5F7FA] disabled:text-[#CCD1D9]"
                    >
                      Continue
                    </button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex max-w-[480px] flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-[#181F25]">
                  Attendance List
                </span>
                <span className="cursor-pointer text-sm text-[#181F25] underline">
                  Resend Invite
                </span>
              </div>
              <div className="flex items-center justify-center border border-dashed border-[#D7D7D7] bg-[#F5F7FA] p-6">
                <div className="flex w-full max-w-[300px] flex-col items-center justify-center gap-1">
                  <File className="size-6 text-[#434A54]" />
                  <span className="text-sm text-[#5a5a5a]">{file?.name}</span>
                  <Progress
                    percent={attendanceProgress}
                    status={attendanceProgress < 100 ? 'active' : 'success'}
                    showInfo={false}
                  />
                  <span className="self-start text-xs text-[#333333]">
                    ({attendanceProgress}%) of invite sent
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  )
}
