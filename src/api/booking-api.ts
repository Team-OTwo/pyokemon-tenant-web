import {
  BookingFilters,
  BookingListResponse,
  BookingSummary,
  BookingWithDetails,
} from "@/types/booking"

import { bffClient } from "./client"

// 예매 목록 조회
export const getBookings = async (filters: BookingFilters): Promise<BookingListResponse> => {
  try {
    const response = await bffClient.get("/api/mypage/bookings", {
      params: {
        page: filters.page || 0,
        pageSize: filters.pageSize || 10,
        ...filters,
      },
    })
    return response.data
  } catch (error) {
    console.error("Failed to fetch bookings:", error)
    throw error
  }
}

// 특정 예매 상세 조회
export const getBookingById = async (bookingId: number): Promise<BookingWithDetails> => {
  try {
    const response = await bffClient.get("/api/mypage/bookings/detail", {
      params: { bookingId },
    })
    return response.data
  } catch (error) {
    console.error("Failed to fetch booking detail:", error)
    throw error
  }
}

// 특정 이벤트의 예매 목록 조회
export const getBookingsByEvent = async (
  eventId: number,
  filters: Omit<BookingFilters, "eventId">
): Promise<BookingListResponse> => {
  try {
    const response = await bffClient.get("/api/mypage/bookings", {
      params: {
        eventId,
        page: filters.page || 0,
        pageSize: filters.pageSize || 10,
        ...filters,
      },
    })
    return response.data
  } catch (error) {
    console.error("Failed to fetch bookings by event:", error)
    throw error
  }
}

// 특정 이벤트 스케줄의 예매 목록 조회 (ERD 구조에 맞게)
export const getBookingsByEventSchedule = async (
  eventScheduleId: number,
  filters: Omit<BookingFilters, "eventScheduleId">
): Promise<BookingListResponse> => {
  try {
    const response = await bffClient.get("/api/mypage/bookings", {
      params: {
        eventScheduleId,
        page: filters.page || 0,
        pageSize: filters.pageSize || 10,
        ...filters,
      },
    })
    return response.data
  } catch (error) {
    console.error("Failed to fetch bookings by event schedule:", error)
    throw error
  }
}

// 예매 통계 조회
export const getBookingSummary = async (eventId?: number): Promise<BookingSummary> => {
  try {
    const response = await bffClient.get("/api/mypage/bookings/summary", {
      params: { eventId },
    })
    return response.data
  } catch (error) {
    console.error("Failed to fetch booking summary:", error)
    throw error
  }
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
