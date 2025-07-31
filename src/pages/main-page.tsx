import React, { useEffect, useState } from "react"
import { IoCalendarOutline } from "react-icons/io5"

import Dashboard from "../components/dashboard/dashboard"
import EventsTable from "../components/dashboard/events-table"
import SummaryCards from "../components/dashboard/summary-cards"
import Sidebar from "../components/sidebar/sidebar"
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
    <Dashboard>
      <>
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-primary rounded-full p-6 mr-[10px]">
              <IoCalendarOutline className="w-30 h-30 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-black">최근 공연 현황</h1>
          </div>
          <p className="text-gray-700 mt-[15px] mb-[30px]">
            최근 1년 간 공연들의 예매 현황을 확인하세요
          </p>
        </div>

        <EventsTable events={events} loading={loading} />
        <SummaryCards events={events} loading={loading} />
      </>
    </Dashboard>
  )
}

function MainPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-32 w-full">
        <DashboardContent />
      </main>
    </div>
  )
}

export default MainPage
