import { mockGetBookings, mockGetBookingsByEvent, mockGetBookingSummary } from "@/mock/booking-mock"

import {
  BookingFilters,
  BookingListResponse,
  BookingSummary,
  BookingWithDetails,
} from "@/types/booking"

// 예매 목록 조회
export const getBookings = async (filters: BookingFilters): Promise<BookingListResponse> => {
  return await mockGetBookings(filters)
}

// 특정 예매 상세 조회
export const getBookingById = async (bookingId: number): Promise<BookingWithDetails> => {
  // Mock 데이터에서 해당 booking 찾기
  const allBookings = await mockGetBookings({})
  const booking = allBookings.bookings.find((b) => b.booking.bookingId === bookingId)

  if (!booking) {
    throw new Error("Booking not found")
  }

  return booking
}

// 특정 이벤트의 예매 목록 조회
export const getBookingsByEvent = async (
  eventId: number,
  filters: Omit<BookingFilters, "eventId">
): Promise<BookingListResponse> => {
  return await mockGetBookingsByEvent(eventId, filters)
}

// 예매 통계 조회
export const getBookingSummary = async (eventId?: number): Promise<BookingSummary> => {
  return await mockGetBookingSummary()
}

// 예매 상태 변경
export const updateBookingStatus = async (
  bookingId: number,
  status: "PENDING" | "BOOKED" | "CANCELED"
): Promise<void> => {
  // Mock에서는 성공으로 처리
  console.log(`Booking ${bookingId} status updated to ${status}`)
}

// 결제 상태 변경
export const updatePaymentStatus = async (
  paymentId: number,
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
): Promise<void> => {
  // Mock에서는 성공으로 처리
  console.log(`Payment ${paymentId} status updated to ${status}`)
}

// 예매 취소
export const cancelBooking = async (bookingId: number): Promise<void> => {
  // Mock에서는 성공으로 처리
  console.log(`Booking ${bookingId} cancelled`)
}

// 환불 처리
export const refundPayment = async (paymentId: number): Promise<void> => {
  // Mock에서는 성공으로 처리
  console.log(`Payment ${paymentId} refunded`)
}
