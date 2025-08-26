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
  // 기존 공연 수정을 위한 ID들
  venueId?: number
  eventScheduleId?: number
  priceIds?: number[]
}

export const initialScheduleFormData: ScheduleFormData = {
  date: null,
  ticketDate: null,
  eventStartTime: {
    hour: "",
    minute: "",
  },
  ticketStartTime: {
    hour: "",
    minute: "",
  },
  venueId: undefined,
  eventScheduleId: undefined,
  priceIds: undefined,
}
