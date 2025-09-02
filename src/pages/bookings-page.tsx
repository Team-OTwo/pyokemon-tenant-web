import React, { useCallback, useEffect, useState } from "react"
import { getBookings, getBookingsByEvent } from "@/api/booking-api"
import baseClient from "@/api/client/base-client"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import {
  BookingApiItem,
  BookingApiResponse,
  BookingFilters,
  BookingListResponse,
} from "@/types/booking"
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@/components/catalyst-ui/pagination"
import BookingFiltersComponent from "@/components/table/booking-filters"
import BookingsTable from "@/components/table/bookings-table"

const BookingsPage = () => {
  const { eventId, eventScheduleId } = useParams<{ eventId?: string; eventScheduleId?: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  // 이벤트 정보 (이전 페이지에서 전달받은 정보 또는 API 응답)
  const [eventInfo, setEventInfo] = useState<{
    eventTitle: string
    eventDate: string
    venueName: string
    thumbnailUrl: string
  } | null>(() => {
    if (location.state?.eventInfo) {
      return {
        eventTitle: location.state.eventInfo.title, // title을 eventTitle로 매핑
        eventDate: location.state.eventInfo.eventDate,
        venueName: location.state.eventInfo.venueName,
        thumbnailUrl: location.state.eventInfo.thumbnailUrl,
      }
    }
    return null
  })

  const [bookings, setBookings] = useState<BookingApiItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<BookingFilters>({
    search: "",
    status: "",
    page: 1,
    pageSize: 10,
  })
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const handleGoBack = () => {
    navigate("/bookinglist")
  }

  // 데이터 로딩
  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      // 실제 API 호출 (eventScheduleId가 있을 때)
      if (eventScheduleId) {
        // 백엔드는 0부터 시작하는 페이지 번호를 사용하므로 변환
        const backendPage = (filters.page || 1) - 1

        // 검색어와 상태 필터를 쿼리 파라미터로 전달
        const queryParams = new URLSearchParams({
          eventScheduleId: eventScheduleId,
          page: backendPage.toString(),
          size: (filters.pageSize || 10).toString(),
        })

        // 검색어가 있으면 추가
        if (filters.search && filters.search.trim() !== "") {
          queryParams.append("search", filters.search.trim())
        }

        // 상태 필터가 있으면 추가
        if (filters.status && filters.status !== "" && filters.status !== "전체") {
          queryParams.append("status", filters.status)
        }

        const response = await baseClient.get(`/bff/api/v1/bookings?${queryParams.toString()}`)

        const apiResponse: BookingApiResponse = response.data

        // API 응답 구조 확인 및 안전한 처리
        console.log("API 응답:", apiResponse)

        if (
          !apiResponse.content ||
          !Array.isArray(apiResponse.content) ||
          apiResponse.content.length === 0
        ) {
          console.warn("API 응답에 content 배열이 없거나 비어있습니다:", apiResponse)
          setBookings([])
          setTotalItems(0)
          setTotalPages(1)

          // API 응답이 없을 때는 이전 페이지에서 받아온 이벤트 정보 유지
          // eventInfo는 이미 초기값으로 설정되어 있음
          return
        }

        const eventData = apiResponse.content[0] // 첫 번째 이벤트 데이터 사용

        if (!eventData.items || !Array.isArray(eventData.items)) {
          console.warn("API 응답에 items 배열이 없거나 올바르지 않습니다:", eventData)
          setBookings([])
          setTotalItems(0)
          setTotalPages(1)
          return
        }

        // 백엔드에서 페이징된 결과를 직접 사용
        setBookings(eventData.items)
        setTotalItems(apiResponse.totalCount) // 백엔드에서 제공하는 전체 개수
        setTotalPages(Math.ceil(apiResponse.totalCount / (filters.pageSize || 10)))

        // 이벤트 정보 저장 (API 응답이 있을 때만)
        if (eventData.eventTitle && eventData.venueName && eventData.eventDate) {
          setEventInfo({
            eventTitle: eventData.eventTitle,
            eventDate: eventData.eventDate,
            venueName: eventData.venueName,
            thumbnailUrl: eventData.thumbnailUrl || "/placeholder.jpg",
          })
        }
      } else {
        // eventScheduleId가 없을 때는 기존 로직 사용
        console.log("Mock 데이터 사용 - eventScheduleId가 없음")
        let response: BookingListResponse

        if (eventId) {
          response = await getBookingsByEvent(parseInt(eventId), filters)
        } else {
          response = await getBookings(filters)
        }

        // 기존 로직은 그대로 유지 (mock 데이터 사용 시)
        setBookings([]) // mock 데이터는 현재 사용하지 않음
        setTotalPages(response.totalPages)
        setTotalItems(response.total)
      }
    } catch (error) {
      console.error("예매 데이터 로딩 실패:", error)
      // 에러 시 빈 배열로 설정
      setBookings([])
      setTotalPages(1)
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }, [eventScheduleId, filters, eventId])

  // 필터 변경 핸들러
  const handleFiltersChange = (newFilters: BookingFilters) => {
    setFilters({ ...newFilters, page: 1 }) // 필터 변경 시 페이지 1로 리셋
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

  // 백엔드 페이징을 활용하므로 프론트엔드 필터링은 제거
  // 필터가 변경될 때마다 백엔드에 새로운 요청을 보내도록 수정

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  // 페이지 번호 생성 함수
  const generatePageNumbers = (currentPage: number, totalPages: number) => {
    const pages: (number | "gap")[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 현재 페이지 주변의 페이지들 표시
      if (currentPage <= 3) {
        // 앞쪽 페이지들
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("gap")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // 뒤쪽 페이지들
        pages.push(1)
        pages.push("gap")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 중간 페이지들
        pages.push(1)
        pages.push("gap")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("gap")
        pages.push(totalPages)
      }
    }

    return pages
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

          {/* 이벤트 썸네일 */}
          {eventInfo && (
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={eventInfo.thumbnailUrl}
                alt="공연 썸네일"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* 이벤트 정보 */}
          <div>
            <h1 className="text-2xl font-bold">
              {eventInfo?.eventTitle || "이벤트 정보를 불러오는 중..."}
            </h1>
            {eventInfo?.venueName && eventInfo?.eventDate ? (
              <p className="text-sm text-zinc-500 mt-1">
                {eventInfo.venueName} • {new Date(eventInfo.eventDate).toLocaleDateString("ko-KR")}
              </p>
            ) : (
              <p className="text-sm text-zinc-500 mt-1">이벤트 정보를 불러오는 중...</p>
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
        {bookings.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination aria-label="예매 목록 페이지네이션">
              <PaginationPrevious
                href={filters.page && filters.page > 1 ? "#" : null}
                onClick={(e: React.MouseEvent) => {
                  if (filters.page && filters.page > 1) {
                    e.preventDefault()
                    handlePageChange(filters.page - 1)
                  }
                }}
              >
                이전
              </PaginationPrevious>
              <PaginationList>
                {generatePageNumbers(filters.page || 1, totalPages).map((page, index) => {
                  if (page === "gap") {
                    return (
                      <span key={`gap-${index}`} className="px-2">
                        ...
                      </span>
                    )
                  }
                  return (
                    <PaginationPage
                      key={page}
                      href="#"
                      current={page === (filters.page || 1)}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault()
                        handlePageChange(page as number)
                      }}
                    >
                      {page}
                    </PaginationPage>
                  )
                })}
              </PaginationList>
              <PaginationNext
                href={filters.page && filters.page < totalPages ? "#" : null}
                onClick={(e: React.MouseEvent) => {
                  if (filters.page && filters.page < totalPages) {
                    e.preventDefault()
                    handlePageChange((filters.page || 1) + 1)
                  }
                }}
              >
                다음
              </PaginationNext>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingsPage
