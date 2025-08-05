import React from "react"
import { EVENT_STATUS_COLORS, EVENT_STATUS_LABELS } from "@/constants/event"
import { useNavigate } from "react-router-dom"

import { EventType } from "@/types/event"
import { Text } from "@/components/catalyst-ui/text"

interface EventCardProps {
  event: EventType
  disableClick?: boolean
}

const EventCard = ({ event, disableClick = false }: EventCardProps) => {
  const navigation = useNavigate()
  const handleClick = () => {
    if (!disableClick) {
      navigation(`/events/${event.eventId}`)
    }
  }

  return (
    <div
      className={`group relative flex items-start space-x-4 bg-white p-4 border-b border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 last:border-b-0 ${
        !disableClick ? "cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className="h-16 w-16 rounded-lg object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Text className="text-base font-semibold text-zinc-900 dark:text-white">{event.title}</Text>

        <div className="mt-1 space-y-1">
          <div className="flex items-center justify-between">
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">{event.eventDate}</Text>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${EVENT_STATUS_COLORS[event.status]}`}
            >
              {EVENT_STATUS_LABELS[event.status]}
            </span>
          </div>
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">{event.venueName}</Text>
        </div>
      </div>
    </div>
  )
}

export default EventCard
