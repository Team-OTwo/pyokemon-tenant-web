import React, { useEffect, useState } from "react"
import { getBookings, getBookingsByEvent, getBookingsByEventSchedule } from "@/api/booking-api"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { BookingDisplay, BookingFilters, BookingListResponse } from "@/types/booking"
import { Button } from "@/components/catalyst-ui/button"
import { Heading } from "@/components/catalyst-ui/heading"
import { SimplePagination } from "@/components/catalyst-ui/simple-pagination"
import BookingFiltersComponent from "@/components/table/booking-filters"
import BookingsTable from "@/components/table/bookings-table"

const BookingsPage = () => {
  const { eventId, eventScheduleId } = useParams<{ eventId?: string; eventScheduleId?: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  // 이전 페이지에서 전달된 이벤트 정보
  const eventInfo = location.state?.eventInfo

  const [bookings, setBookings] = useState<BookingDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<BookingFilters>({
    page: 1,
    pageSize: 10,
  })
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const handleGoBack = () => {
    navigate("/bookinglist")
  }

  // 데이터 로딩
  const fetchBookings = async () => {
    setLoading(true)
    try {
      // API가 아직 없으므로 바로 mock 데이터 사용
      console.log("Mock 데이터 사용 - eventScheduleId:", eventScheduleId)

      let response: BookingListResponse

      if (eventScheduleId) {
        // ERD 구조에 맞게 event_schedule_id로 조회
        response = await getBookingsByEventSchedule(parseInt(eventScheduleId), filters)
      } else if (eventId) {
        response = await getBookingsByEvent(parseInt(eventId), filters)
      } else {
        response = await getBookings(filters)
      }

      // API 응답을 테이블 표시용으로 변환
      const displayBookings: BookingDisplay[] = response.bookings.map((booking) => ({
        id: booking.booking.bookingId.toString(),
        orderNumber: `#${booking.booking.bookingId.toString().padStart(4, "0")}`,
        purchaseDate: booking.booking.createdAt,
        customer: booking.user.name,
        amount: booking.payment.totalPrice,
        paymentStatus: getPaymentStatusDisplay(booking.payment.status),
        paymentMethod: booking.payment.method,
        seatClass: booking.seatClass.className,
        seatInfo: `${booking.seat.floor} ${booking.seat.seatNumber}`,
        venue: booking.venue.venueName,
        eventDate: booking.eventSchedule.eventDate,
      }))

      setBookings(displayBookings)
      setTotalPages(response.totalPages)
      setTotalItems(response.total)
    } catch (error) {
      console.error("예매 데이터 로딩 실패:", error)
      // 에러 시 빈 배열로 설정
      setBookings([])
      setTotalPages(1)
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }

  // 결제 상태를 한국어로 변환
  const getPaymentStatusDisplay = (status: string): "결제완료" | "결제대기" | "환불됨" => {
    switch (status) {
      case "COMPLETED":
        return "결제완료"
      case "PENDING":
        return "결제대기"
      case "REFUNDED":
        return "환불됨"
      default:
        return "결제대기"
    }
  }

  // 필터 변경 핸들러
  const handleFiltersChange = (newFilters: BookingFilters) => {
    setFilters(newFilters)
  }

  // 필터 초기화
  const handleResetFilters = () => {
    setFilters({
      page: 1,
      pageSize: 10,
    })
  }

  // 일괄 환불 핸들러
  const handleBulkRefund = () => {
    // 선택된 예매들을 환불 처리하는 로직
    console.log("일괄 환불 처리")
    // TODO: 선택된 예매들의 환불 처리 로직 구현
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  // 데이터 로딩 효과
  useEffect(() => {
    fetchBookings()
  }, [filters, eventId, eventScheduleId])

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="flex gap-6 items-center mb-16">
          <ArrowUturnLeftIcon
            className="text-gray-700 cursor-pointer w-5 h-5"
            onClick={handleGoBack}
          />
          <div>
            <h1 className="text-2xl font-bold">{`${eventInfo.title} 예매 현황`}</h1>
            {eventInfo?.title && (
              <p className="text-sm text-zinc-500 mt-1">
                {eventInfo.venueName} • {new Date(eventInfo.eventDate).toLocaleDateString("ko-KR")}
              </p>
            )}
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="mb-6">
          <BookingFiltersComponent
            filters={{ ...filters, total: totalItems }}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
            onBulkRefund={handleBulkRefund}
          />
        </div>

        {/* 예매 테이블 */}
        <div className="bg-white overflow-hidden">
          <BookingsTable bookings={bookings} loading={loading} />
        </div>

        {/* 페이지네이션 */}
        <div className="mt-6 flex justify-center">
          <SimplePagination
            current={filters.page || 1}
            total={totalItems}
            pageSize={filters.pageSize || 10}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  )
}

export default BookingsPage
