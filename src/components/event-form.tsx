import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Ticket } from 'lucide-react'
import { type ComponentProps, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { GetEventsResponse } from '@/api/get-events'
import maps from '@/assets/maps.png'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const eventForm = z.object({
  id: z.string(),
  name: z.string(),
  capacity: z.coerce.number().default(0).optional(),
  price: z.string().default('0').optional(),
  priceTier: z.string(),
  ticketDesignId: z.string().optional(),
  location: z.string(),
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
    <Form {...form}>
      <form
        className="grid w-full grid-cols-2 gap-x-40"
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className="grid auto-rows-min grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event ID*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'}>
                        {field.value ? (
                          format(field.value, 'MM/dd/yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startedTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Time*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'}>
                        {field.value ? (
                          format(field.value, 'MM/dd/yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="displayStartedAt"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Display this on ticket</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'}>
                        {field.value ? (
                          format(field.value, 'MM/dd/yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endedTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Time*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'}>
                        {field.value ? (
                          format(field.value, 'MM/dd/yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="displayEndedAt"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Display this on ticket</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Capacity*</FormLabel>
                <FormDescription className="text-xs">
                  Insert 0 if there is no limit in the event&apos;s capacity
                </FormDescription>
                <FormControl>
                  <Input {...field} placeholder="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Ticket Flat Price*</FormLabel>
                <FormDescription className="text-xs">
                  Insert 0 if this event is free
                </FormDescription>
                <FormControl>
                  <Input {...field} placeholder="$ 0.00" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceTier"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>Price Tier*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="- Select -" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>Location*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="- Select -" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="luca-arena">Luca Arena</SelectItem>
                    <SelectItem value="luca-stadium">Luca Stadium</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <img
            src={maps}
            alt="map from santa ana stadium"
            className="h-[226px] w-[471px]"
          />

          <div className="flex items-end gap-4">
            <FormField
              control={form.control}
              name="ticketDesignId"
              render={({ field }) => (
                <FormItem className="w-64">
                  <FormLabel>Choose a Ticket Design*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="- Select -" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MOB.101">MOB.101</SelectItem>
                      <SelectItem value="MOB.102">MOB.102</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold">OR</span>
              <button
                type="button"
                className="inline-flex h-12 w-fit cursor-pointer items-center gap-2 rounded border border-[#CCD1D9] bg-white px-3 py-2 text-xs font-bold shadow-[0_4px_8px_0_rgba(0,0,0,0.1)]"
              >
                <Ticket className="size-4 text-[#434A54]" />
                Go to Ticket Designer
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
