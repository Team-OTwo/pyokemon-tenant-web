import { EventType } from "@/types/event"
import { ScheduleFormData } from "@/types/schedule"

export const convertEventToScheduleFormData = (event: EventType): ScheduleFormData => {
  const parseDateTime = (
    dateTimeStr: string
  ): { date: Date; time: { hour: string; minute: string } } => {
    const date = new Date(dateTimeStr)
    const hour = String(date.getHours()).padStart(2, "0")
    const minute = String(date.getMinutes()).padStart(2, "0")
    return {
      date,
      time: { hour, minute },
    }
  }

  const { date: eventDate, time: eventStartTime } = parseDateTime(event.eventDate)
  const { date: ticketDate, time: ticketStartTime } = parseDateTime(event.ticketOpenAt)

  return {
    date: eventDate,
    ticketDate: ticketDate,
    eventStartTime,
    ticketStartTime,
    // 기존 공연의 실제 ID들을 포함
    venueId: event.venueId || 1,
    eventScheduleId: event.eventScheduleId || 1,
    priceIds: event.prices?.map((price) => price.priceId) || [1],
  }
}
