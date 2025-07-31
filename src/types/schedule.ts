import { EventFormData, PriceGrade } from "./event"

export interface ScheduleFormData {
  date: Date | null
  ticketDate: Date | null
  eventStartTime: {
    hour: string
    minute: string
  }
  ticketStartTime: {
    hour: string
    minute: string
  }
}

export interface ExtendedEventData extends EventFormData {
  date: Date | null
  ticketDate: Date | null
  eventStartTime: {
    hour: string
    minute: string
  }
  ticketStartTime: {
    hour: string
    minute: string
  }
}
