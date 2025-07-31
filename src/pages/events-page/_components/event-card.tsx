import React from "react"

import { EventType } from "@/types/event"
import Badge from "@/components/ui/badge"

interface EventCardProps {
  event: EventType
}

const EventCard = ({ event }: EventCardProps) => {
  const getEventStatus = (eventDate: string) => {
    const today = new Date()
    const eventDateObj = new Date(eventDate)

    if (eventDateObj < today) {
      return {
        text: "진행 완료",
        bgColor: "rgba(255, 207, 54, 0.2)",
        borderColor: "#FFD800",
        textColor: "#FFD800",
      }
    } else {
      return {
        text: "진행중",
        bgColor: "rgba(68, 203, 143, 0.2)",
        borderColor: "#44CB8F",
        textColor: "#44CB8F",
      }
    }
  }

  const status = getEventStatus(event.eventDate)

  return (
    <div className="p-16 flex shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] rounded-xl justify-between">
      <div className="flex gap-16">
        <img src={event.thumbnailUrl} alt="" className="w-120 rounded-lg" />
        <div>
          <h3 className="text-lg font-semibold mb-12">{event.title}</h3>
          <p className="font-semibold text-gray-700">{event.eventDate}</p>
          <p className="text-gray-700">{event.venueName}</p>
        </div>
      </div>
      <div className="flex items-end">
        <Badge
          text={status.text}
          bgColor={status.bgColor}
          borderColor={status.borderColor}
          textColor={status.textColor}
          cursor="default"
        />
      </div>
    </div>
  )
}

export default EventCard
