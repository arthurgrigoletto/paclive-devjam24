import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { StatusTag } from './status-tag';

const formatDate = (dateString) => {
  const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' };
  const date = new Date(dateString);
  const separator = "•";
  let formattedDate = Intl.DateTimeFormat('en-US', options).format(date);
  formattedDate = formattedDate.replace(/,([^,]*)$/, ` ${separator}$1`);
  return formattedDate;
};

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
    <div style={{width:"400px", "border-radius": "2%"}} className="bg-white border border-gray-200 rounded-lg p-4 w-80 relative m-4">
      <StatusTag status={status} />
      <div className="mt-6">
        <div style={{fontSize: "0.75rem"}} className="text-sm text-gray-500">{type}</div>
        <div style={{fontSize: "1.3rem"}} className="text-lg font-bold mt-2">{eventName}</div>
        <div className="mt-4">
          <div className="my-2 border border-gray-200 rounded p-2">
            <div style={{fontSize: "0.75rem"}} className="text-sm text-gray-500">Event ID</div>
            <strong className="block text-gray-700">{eventId}</strong>
          </div>
          <div className="my-2 border border-gray-200 rounded p-2">
            <div style={{fontSize: "0.75rem"}} className="text-sm text-gray-500">Event Date / Time</div>
            <strong className="block text-gray-700">{formatDate(eventStartDate)}{eventEndDate && ` - ${formatDate(eventEndDate)}`}</strong>
          </div>
          <div className="my-2 border border-gray-200 rounded p-2">
            <div style={{fontSize: "0.75rem"}} className="text-sm text-gray-500">Venue</div>
            <strong className="block text-gray-700">{venue}</strong>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xl focus:outline-none">...</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-300 rounded shadow-md w-32">
            <DropdownMenuItem className="focus:outline-none p-2 cursor-pointer hover:bg-gray-100">Edit</DropdownMenuItem>
            <DropdownMenuItem className="focus:outline-none p-2 cursor-pointer hover:bg-gray-100">Publish</DropdownMenuItem>
            <DropdownMenuItem className="focus:outline-none p-2 cursor-pointer hover:bg-gray-100">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EventCard;
