export interface PriceGrade {
  priceId?: number // 기존 공연 수정을 위한 가격 ID
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
  priceGrades: [{ priceId: undefined, grade: "", price: 0, seatClassId: undefined }],
}

// event-register API 요청 관련 타입들
export interface EventSchedule {
  eventScheduleId?: number // 기존 공연 수정을 위한 스케줄 ID
  venueId: number
  ticketOpenAt: string
  eventDate: string
  prices: Array<{
    priceId?: number // 기존 공연 수정을 위한 가격 ID
    seatClassId: number
    price: number
  }>
}

export interface EventRequestData {
  accountId: number
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
  venueId: number // 공연장 ID 추가
  eventDate: string
  ticketOpenAt: string
  genre: string
  description: string
  eventScheduleId: number
  thumbnailUrl: string
  prices?: Array<{
    priceId: number // 가격 ID 추가
    grade: string
    price: number
    seatClassId?: number
  }>
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
