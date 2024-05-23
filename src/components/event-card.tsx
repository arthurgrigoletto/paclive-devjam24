import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import React from 'react'

import { StatusTag } from './status-tag'

const formatDate = (dateString) => {
  const options = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const date = new Date(dateString)
  const separator = '•'
  let formattedDate = Intl.DateTimeFormat('en-US', options).format(date)
  formattedDate = formattedDate.replace(/,([^,]*)$/, ` ${separator}$1`)
  return formattedDate
}

const EventCard = ({
  status,
  type,
  eventName,
  eventId,
  eventStartDate,
  eventEndDate,
  venue,
}) => {
  return (
    <div
      style={{ width: '450px', 'border-radius': '2%' }}
      className="relative m-4 w-80 rounded-lg border border-gray-200 bg-white p-4"
    >
      <StatusTag status={status} />
      <div className="mt-6">
        <div style={{ fontSize: '0.75rem' }} className="text-sm text-gray-500">
          {type}
        </div>
        <div style={{ fontSize: '1.3rem' }} className="mt-2 text-lg font-bold">
          {eventName}
        </div>
        <div className="mt-4">
          <div className="my-2 rounded border border-gray-200 p-2">
            <div
              style={{ fontSize: '0.75rem' }}
              className="text-sm text-gray-500"
            >
              Event ID
            </div>
            <strong className="block text-gray-700">{eventId}</strong>
          </div>
          <div className="my-2 rounded border border-gray-200 p-2">
            <div
              style={{ fontSize: '0.75rem' }}
              className="text-sm text-gray-500"
            >
              Event Date / Time
            </div>
            <strong className="block text-gray-700">
              {formatDate(eventStartDate)}
              {eventEndDate && ` - ${formatDate(eventEndDate)}`}
            </strong>
          </div>
          <div className="my-2 rounded border border-gray-200 p-2">
            <div
              style={{ fontSize: '0.75rem' }}
              className="text-sm text-gray-500"
            >
              Venue
            </div>
            <strong className="block text-gray-700">{venue}</strong>
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xl focus:outline-none">...</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32 rounded border border-gray-300 bg-white shadow-md">
            <Link to="/events/$eventId" params={{ eventId }}>
              <DropdownMenuItem className="cursor-pointer p-2 hover:bg-gray-100 focus:outline-none">
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer p-2 hover:bg-gray-100 focus:outline-none">
              Publish
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer p-2 hover:bg-gray-100 focus:outline-none">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default EventCard
