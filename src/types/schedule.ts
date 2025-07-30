import { PriceGrade } from "@/constants/event-register-options"

import { EventType } from "./event"

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

export interface ExtendedEventData extends Omit<EventType, "ageLimit"> {
  venue: string
  ageLimit: string
  thumbnail: File | null
  thumbnailPreview: string
  priceGrades: PriceGrade[]
}
