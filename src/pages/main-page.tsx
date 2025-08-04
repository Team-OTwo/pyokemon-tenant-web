import React, { useEffect, useState } from "react"

import { Heading } from "../components/catalyst-ui/heading"
import { Text } from "../components/catalyst-ui/text"
import EventsTable from "../components/table/events-table"
import SummaryCards from "../components/table/summary-cards"
import { Event, mockEvents } from "../mock/dashboard-mock"

const DashboardContent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  // Mock API 데이터 시뮬레이션
  useEffect(() => {
    const fetchPerformances = async () => {
      // 실제 환경에서는 백엔드 API 호출
      const mockData: Event[] = mockEvents

      // API 호출 시뮬레이션
      setTimeout(() => {
        setEvents(mockData)
        setLoading(false)
      }, 1000)
    }

    fetchPerformances()
  }, [])

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
          <SummaryCards events={events} loading={loading} />
          <EventsTable events={events} loading={loading} />
        </div>
      </div>
    </div>
  )
}

function MainPage() {
  return <DashboardContent />
}

export default MainPage
