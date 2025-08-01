import React from "react"
import { isBefore } from "date-fns"
import { useNavigate } from "react-router-dom"

import { EventType } from "@/types/event"
import { Badge } from "@/components/catalyst-ui/badge"
import { Text } from "@/components/catalyst-ui/text"

interface EventCardProps {
  event: EventType
}

const EventCard = ({ event }: EventCardProps) => {
  const navigation = useNavigate()
  const handleClick = () => {
    navigation(`/events/${event.eventId}`)
  }

  const getEventStatus = (eventDate: string) => {
    const isCompleted = isBefore(new Date(), new Date(eventDate)) === false

    if (isCompleted) {
      return {
        text: "진행 완료",
        color: "amber" as const,
      }
    } else {
      return {
        text: "진행중",
        color: "green" as const,
      }
    }
  }

  const status = getEventStatus(event.eventDate)

  return (
    <div
      className="group relative flex cursor-pointer items-start space-x-4 bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0"
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
            <Badge color={status.color}>{status.text}</Badge>
          </div>
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">{event.venueName}</Text>
        </div>
      </div>
    </div>
  )
}

export default EventCard
