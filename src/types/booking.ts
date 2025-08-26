// ERD 기반 실제 API 구조에 맞는 타입 정의

export interface Booking {
  bookingId: number
  eventScheduleId: number
  accountId: number
  seatClassId: number
  paymentId: number
  status: "PENDING" | "BOOKED" | "CANCELED"
  createdAt: string
  updatedAt: string
}

export interface Payment {
  paymentId: number
  bookingId: number
  eventScheduleId: number
  totalPrice: number
  method: string
  status: "PENDING" | "COMPLETED" | "REFUNDED"
  createdAt: string
  updatedAt: string
}

export interface EventSchedule {
  eventScheduleId: number
  eventId: number
  eventDate: string
  eventTime: string
  ticketOpenAt: string
  ticketCloseAt: string
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: number
  eventId: number
  title: string
  description: string
  totalSeatCount: number
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELED"
  createdAt: string
  updatedAt: string
}

export interface Venue {
  venueId: number
  venueName: string
  address: string
  city: string
  state: string
  zipcode: string
  country: string
  createdAt: string
  updatedAt: string
}

export interface SeatClass {
  seatClassId: number
  className: string
  seatCount: number
}

export interface Seat {
  seatId: number
  seatClassId: number
  floor: string
  row: string
  column: string
  seatNumber: string
  isAvailable: boolean
}

export interface Price {
  priceId: number
  eventScheduleId: number
  seatClassId: number
  price: number
  createdAt: string
  updatedAt: string
}

export interface Account {
  accountId: number
  role: string
  username: string
  isActiveDeleted: "ACTIVE" | "DELETED"
  createdAt: string
  updatedAt: string
}

export interface User {
  userId: number
  accountId: number
  name: string
  phone: string
  birth: string
  isVerified: boolean
}

// API 응답용 통합 타입
export interface BookingWithDetails {
  booking: Booking
  payment: Payment
  eventSchedule: EventSchedule
  event: Event
  venue: Venue
  seatClass: SeatClass
  seat: Seat
  price: Price
  account: Account
  user: User
}

// 검색 및 필터링 옵션
export interface BookingFilters {
  search?: string
  status?: string
  page?: number
  pageSize?: number
}

// API 응답 타입
export interface BookingListResponse {
  bookings: BookingWithDetails[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 통계 정보
export interface BookingSummary {
  totalBookings: number
  totalRevenue: number
  completedPayments: number
  pendingPayments: number
  canceledBookings: number
  averageTicketPrice: number
}

// 예매현황 BFF 응답 타입
export interface BookingApiResponse {
  content: Array<{
    eventId: number
    eventTitle: string
    eventDate: string
    venueName: string
    thumbnailUrl: string
    items: BookingApiItem[]
  }>
  page: number
  totalCount: number
}

export interface BookingApiItem {
  bookingId: string
  userName: string
  seat: {
    className: string
    floor: string
    row: string
    col: string
  }
  totalPrice: string
  status: string
}
