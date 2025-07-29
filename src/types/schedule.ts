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

// EventType을 확장하여 추가 필드들을 포함
export interface ExtendedEventData extends EventType {
  venue: string
  thumbnail: File | null
  thumbnailPreview: string
  priceGrades: Array<{ grade: string; price: string }>
}
