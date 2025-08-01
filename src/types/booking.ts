// ERD 기반 타입 정의
export interface User {
  id: number
  userId: string
  name: string
  phone: string
  email: string
  birth: string
  gender: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: number
  eventId: string
  title: string
  description: string
  ageLimit: number
  genre: string
  status: "ACTIVE" | "INACTIVE" | "CANCELLED"
  created_at: string
  updated_at: string
}

export interface Venue {
  id: number
  venue_name: string
  address: string
  phone: string
  email: string
  created_at: string
  updated_at: string
}

export interface EventSchedule {
  id: number
  event_id: number
  venue_id: number
  event_date: string
  ticket_open_at: string
  created_at: string
  updated_at: string
}

export interface SeatClass {
  id: number
  event_schedule_id: number
  seat_class_name: string
  price: number
  priority: number
  created_at: string
  updated_at: string
}

export interface Payment {
  id: number
  booking_id: number
  payment_key: string
  method: string
  total_price: number
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "FAILED"
  created_at: string
  updated_at: string
}

export interface Booking {
  id: number
  booking_id: string
  user_id: number
  event_schedule_id: number
  payment_id: number
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
  created_at: string
  updated_at: string

  // 조인된 데이터
  user?: User
  event_schedule?: EventSchedule
  payment?: Payment
  event?: Event
  venue?: Venue
  seat_class?: SeatClass
}

export interface BookingDisplay {
  id: string
  purchaser: string
  bookingPid: string
  seat: string
  amount: number
  paymentMethod: string
  paymentStatus: "결제대기" | "결제완료" | "결제취소"
  eventId: string
  eventTitle: string
  eventDate: string
  venueName: string
  thumbnailUrl: string
}

export interface BookingSummary {
  totalSales: number
  remainingSeats: number
  totalBookings: number
}
