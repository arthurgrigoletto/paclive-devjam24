import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox, DatePicker, Input, Select, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { Ticket } from 'lucide-react'
import { type ComponentProps, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { GetEventsResponse } from '@/api/get-events'
import maps from '@/assets/maps.png'

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

  return (
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
      </div>
    </form>
  )
}
