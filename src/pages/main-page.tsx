import React, { useCallback, useState } from "react"
import { startOfDay } from "date-fns"

import { useGetMonthlySummaryQuery } from "../api/event/queries/use-get-monthly-summary-query"
import { Heading } from "../components/catalyst-ui/heading"
import { Text } from "../components/catalyst-ui/text"
import EventsTable from "../components/table/events-table"
import SummaryCards from "../components/table/summary-cards"
import { MonthlyEvent } from "../types/event"

const DashboardContent: React.FC = () => {
  const [allEvents, setAllEvents] = useState<MonthlyEvent[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { data, isLoading, error } = useGetMonthlySummaryQuery()

  // 초기 데이터 로드
  React.useEffect(() => {
    if (data?.events && page === 1) {
      setAllEvents(data.events)
    }
  }, [data?.events, page])

  // 더 많은 데이터 로드 함수
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)

    // 실제 API에서는 페이지네이션 파라미터를 추가해야 합니다
    // 현재는 Mock 데이터를 사용하므로 간단히 처리
    setTimeout(() => {
      if (data?.events) {
        setAllEvents((prev) => [...prev, ...data.events])
        setPage((prev) => prev + 1)

        // Mock 데이터이므로 3페이지 후 더 이상 데이터가 없다고 가정
        if (page >= 3) {
          setHasMore(false)
        }
      }
      setIsLoadingMore(false)
    }, 1000)
  }, [isLoadingMore, hasMore, data?.events, page])

  // events 개수를 세어서 summary의 activeEventCount와 비교
  const getActiveEventCount = () => {
    if (!data?.events) return 0

    const actualEventCount = data.events.length
    const summaryEventCount = data.summary?.activeEventCount || 0

    // events 개수와 summary의 activeEventCount가 일치하지 않으면
    // 프론트에서 센 개수를 사용
    return actualEventCount !== summaryEventCount ? actualEventCount : summaryEventCount
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Text className="text-lg font-semibold text-red-600">
            데이터를 불러오는데 실패했습니다.
          </Text>
          <Text className="text-zinc-500 mt-2">잠시 후 다시 시도해주세요.</Text>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div>
            <Heading level={1} className="text-2xl font-bold text-zinc-900">
              최근 공연 현황
            </Heading>
            <p className="text-sm text-zinc-500 mt-1">
              이번 달 진행되는 공연들의 현황을 확인하세요
            </p>
          </div>
        </div>

        {/* 대시보드 콘텐츠 */}
        <div className="space-y-6">
          <SummaryCards
            totalRevenue={data?.summary?.totalRevenue || 0}
            activeEventCount={getActiveEventCount()}
            totalTicketsSold={data?.summary?.totalTicketsSold || 0}
            loading={isLoading}
            summaryEventCount={data?.summary?.activeEventCount}
          />
          <EventsTable events={allEvents} loading={isLoading || isLoadingMore} />
        </div>
      </div>
    </div>
  )
}

function MainPage() {
  return <DashboardContent />
}

export default MainPage
