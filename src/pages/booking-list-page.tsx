import React, { useEffect, useMemo, useState } from "react"
import { getTenantSchedules } from "@/api/event-register-api"
import { eventList, STATUS_FILTER_OPTIONS } from "@/constants/event"
import { getAccountId } from "@/utils/auth"
import { searchEventsByTitle } from "@/utils/search"
import { PlusIcon } from "@heroicons/react/16/solid"
import { useNavigate } from "react-router-dom"

import { EventType } from "@/types/event"
import { Badge } from "@/components/catalyst-ui/badge"
import { Button } from "@/components/catalyst-ui/button"
import { Heading } from "@/components/catalyst-ui/heading"
import { Input } from "@/components/catalyst-ui/input"
import { Listbox, ListboxOption } from "@/components/catalyst-ui/listbox"
import { Text } from "@/components/catalyst-ui/text"

import EventCard from "./events-page/_components/event-card"

const BookingListPage = () => {
  const [activeStatus, setActiveStatus] = useState("ALL")
  const [searchValue, setSearchValue] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [useMockData, setUseMockData] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(7) // 페이지당 7개로 변경
  const navigate = useNavigate()

  const sortOptions = [
    { value: "name", label: "이름순" },
    { value: "date", label: "날짜순" },
  ]

  // API에서 이벤트 목록 가져오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)

        const accountId = getAccountId()

        const eventsData = await getTenantSchedules(accountId)
        setEvents(eventsData)
        setUseMockData(false)
      } catch (err) {
        console.warn("API 호출 실패, mock 데이터 사용:", err)
        setEvents(eventList)
        setUseMockData(true)
        setError("백엔드 API에 연결할 수 없어 샘플 데이터를 표시합니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // 검색과 상태 필터링을 모두 적용
  const finalEvents = useMemo(() => {
    let filteredEvents = events

    // booking-list-page에서는 APPROVED 상태의 이벤트만 표시
    filteredEvents = filteredEvents.filter((event) => event.status === "APPROVED")

    // 검색 필터링
    if (searchValue) {
      filteredEvents = searchEventsByTitle(filteredEvents, searchValue)
    }

    // 정렬
    if (sortBy === "name") {
      filteredEvents = [...filteredEvents].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "date") {
      filteredEvents = [...filteredEvents].sort(
        (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      )
    }

    return filteredEvents
  }, [events, searchValue, activeStatus, sortBy])

  // 페이지네이션 계산
  const totalPages = Math.ceil(finalEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = finalEvents.slice(startIndex, endIndex)

  // 디버깅용 로그
  console.log("페이지네이션 정보:", {
    totalEvents: finalEvents.length,
    itemsPerPage,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    currentEventsLength: currentEvents.length,
  })

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // 간단한 페이지네이션 컴포넌트
  const renderPagination = () => {
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        {/* 이전 버튼 */}
        <Button
          plain
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 cursor-pointer hover:!text-black transition-colors duration-200"
        >
          이전
        </Button>

        {/* 페이지 번호들 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              plain
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 min-w-[40px] cursor-pointer transition-colors duration-200 ${
                page === currentPage
                  ? "bg-zinc-950 !text-white dark:bg-white dark:!text-zinc-950"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>

        {/* 다음 버튼 */}
        <Button
          plain
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 cursor-pointer hover:!text-black transition-colors duration-200"
        >
          다음
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <Text className="text-zinc-500 mt-4">공연 목록을 불러오는 중...</Text>
        </div>
      </div>
    )
  }

  if (error && !useMockData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Text className="text-red-500 mb-4">{error}</Text>
          <Button
            onClick={() => window.location.reload()}
            className="cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
          >
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Mock 데이터 사용 시 경고 메시지 */}
        {useMockData && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* 헤더 */}
        <div className="mb-8">
          <div>
            <Heading level={1} className="text-2xl font-bold text-zinc-900">
              예매 현황
            </Heading>
            <p className="text-sm text-zinc-500 mt-1">공연별 예매 현황을 확인하세요.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
          <Input
            type="search"
            placeholder="Search events..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="!w-100"
          />

          <Listbox value={sortBy} onChange={setSortBy} placeholder="Sort by name" className="!w-36">
            {sortOptions.map((option) => (
              <ListboxOption key={option.value} value={option.value}>
                {option.label}
              </ListboxOption>
            ))}
          </Listbox>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {currentEvents.length > 0 ? (
            currentEvents.map((event: EventType, index: number) => (
              <EventCard
                event={event}
                key={`${event.eventId}-${index}`}
                showStatus={false}
                onClick={() =>
                  navigate(`/bookings/schedule/${event.eventScheduleId}`, {
                    state: { eventInfo: event },
                  })
                }
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-zinc-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <Text className="text-zinc-500">
                {searchValue ? "검색 결과가 없습니다." : "표시할 공연이 없습니다."}
              </Text>
            </div>
          )}
        </div>

        {/* Pagination */}
        {renderPagination()}

        {/* 총 개수 표시 */}
        {finalEvents.length > 0 && (
          <div className="mt-4 text-center text-sm text-zinc-500">
            총 {finalEvents.length}개의 공연 중 {startIndex + 1}-
            {Math.min(endIndex, finalEvents.length)}번째 표시
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingListPage
