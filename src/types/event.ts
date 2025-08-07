export interface PriceGrade {
  grade: string
  price: number
  seatClassId?: number
}

// 이벤트 상태 타입
export type EventStatus = "PENDING" | "APPROVED" | "REJECTED"

export interface EventFormData {
  title: string
  venue: string
  ageLimit: string
  genre: string
  description: string
  thumbnail: File | null
  thumbnailPreview: string
  priceGrades: PriceGrade[]
}

// 초기 상태
export const initialEventFormData: EventFormData = {
  title: "",
  venue: "",
  ageLimit: "",
  genre: "",
  description: "",
  thumbnail: null,
  thumbnailPreview: "",
  priceGrades: [{ grade: "", price: 0, seatClassId: undefined }],
}

// event-register API 요청 관련 타입들
export interface EventSchedule {
  venueId: number
  ticketOpenAt: string
  eventDate: string
  prices: Array<{
    seatClassId: number
    price: number
  }>
}

export interface EventRequestData {
  tenantId: number
  title: string
  ageLimit: number
  description: string
  genre: string
  thumbnailUrl: string
  schedules: EventSchedule[]
}

export interface EventType {
  eventId: number
  title: string
  ageLimit: number
  venueName: string
  eventDate: string
  ticketOpenAt: string
  genre: string
  description: string
  eventScheduleId: number
  thumbnailUrl: string
  prices?: PriceGrade[]
  status: EventStatus
}

export interface MonthlyEvent {
  title: string
  venueName: string
  eventDate: string
  ticketCount: number
}

export interface MonthlySummary {
  events: MonthlyEvent[]
  summary: {
    totalRevenue: number
    activeEventCount: number
    totalTicketsSold: number
  }
}
