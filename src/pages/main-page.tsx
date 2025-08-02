import React, { useEffect, useState } from "react"

import { Heading } from "../components/catalyst-ui/heading"
import { Text } from "../components/catalyst-ui/text"
import EventsTable from "../components/dashboard/events-table"
import SummaryCards from "../components/dashboard/summary-cards"
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
    <>
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Heading level={1} className="text-2xl font-bold text-black">
            최근 공연 현황
          </Heading>
        </div>
        <Text className="text-gray-700 mt-[15px] mb-[30px]">
          이번 달 진행되는 공연들의 현황을 확인하세요
        </Text>
      </div>

      <SummaryCards className="mt-10 mb-10" events={events} loading={loading} />
      <EventsTable events={events} loading={loading} />
    </>
  )
}

function MainPage() {
  return <DashboardContent />
}

export default MainPage
