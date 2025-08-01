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
  }
}
