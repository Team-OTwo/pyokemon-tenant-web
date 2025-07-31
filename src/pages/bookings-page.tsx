import React, { useMemo, useState } from "react"
import {
  bookings,
  BOOKINGS_PER_PAGE,
  mockBookingSummary,
  PAYMENT_STATUS_OPTIONS,
} from "@/constants/booking"

import { BookingDisplay } from "@/types/booking"
import Badge from "@/components/ui/badge"
import Pagination from "@/components/ui/pagination"
import BookingsTable from "@/components/dashboard/bookings-table"
import Dashboard from "@/components/dashboard/dashboard"
import Sidebar from "@/components/sidebar/sidebar"

const BookingsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeStatus, setActiveStatus] = useState(0)
  const itemsPerPage = 5 // 페이지당 5개

  const statusOptions = PAYMENT_STATUS_OPTIONS

  // 상태별 필터링
  const filteredBookings = useMemo(() => {
    if (activeStatus === 0) return bookings

    const targetStatus = statusOptions[activeStatus] as BookingDisplay["paymentStatus"]
    return bookings.filter((booking) => booking.paymentStatus === targetStatus)
  }, [activeStatus])

  // 페이지네이션 todo: 백엔드에서 query로 페이징 해줘야 함.
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBookings = filteredBookings.slice(startIndex, endIndex)

  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()}원`
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white">
        <div className="p-30">
          <Dashboard>
            {/* 이벤트 정보 섹션 */}
            <div className="bg-white border border-gray-200 rounded-xl p-24 mb-24 shadow-sm">
              <div className="flex gap-16">
                <div className="w-120 h-80 rounded-lg overflow-hidden">
                  <img
                    src={bookings[0]?.thumbnailUrl || "/placeholder.jpg"}
                    alt="공연 썸네일"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-8">{bookings[0]?.eventTitle}</h2>
                  <p className="text-gray-700 mb-4">{bookings[0]?.eventDate}</p>
                  <p className="text-gray-700 mb-16">{bookings[0]?.venueName}</p>

                  <div className="flex justify-between items-center">
                    <div className="space-y-4">
                      <p className="text-lg font-semibold">
                        총 매출 : {formatAmount(mockBookingSummary.totalSales)}
                      </p>
                      <p className="text-lg font-semibold">
                        잔여석 : {mockBookingSummary.remainingSeats}
                      </p>
                    </div>
                  </div>
                  {/* 상태 필터 버튼들 */}
                  <div className="flex gap-8 ml-350">
                    {statusOptions.map((status, index) => (
                      <div key={index} onClick={() => setActiveStatus(index)}>
                        <Badge
                          text={status}
                          textColor={index === activeStatus ? "white" : undefined}
                          bgColor={index === activeStatus ? "#FFD800" : undefined}
                          borderColor={index === activeStatus ? "#FFD800" : undefined}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 예매 테이블 */}
            <BookingsTable bookings={currentBookings} loading={false} />

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="mt-24 flex justify-center">
                <Pagination
                  current={currentPage}
                  total={filteredBookings.length}
                  pageSize={5}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                />
              </div>
            )}
          </Dashboard>
        </div>
      </main>
    </div>
  )
}

export default BookingsPage
