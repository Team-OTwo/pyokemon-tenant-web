import React, { useEffect, useState } from "react"
import { IoCalendarOutline, IoLocationOutline, IoPeopleOutline } from "react-icons/io5"

import Dashboard from "../components/dashboard/dashboard"
import Sidebar from "../components/sidebar/sidebar"
import { Event, mockEvents } from "../mock/dashboard-mock"

const DashboardTable: React.FC = () => {
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

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-6 py-3 rounded-[12px] text-sm font-medium"
    if (status === "진행중") {
      return `${baseClasses} bg-success/10 text-success`
    }
    return `${baseClasses} bg-error/10 text-error`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR")
  }

  if (loading) {
    return (
      <Dashboard>
        <div className="flex flex-col items-center justify-center h-[620px]">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary"></div>
          <span className="mt-4 text-gray-500 text-lg">로딩 중...</span>
        </div>
      </Dashboard>
    )
  }

  return (
    <Dashboard>
      <>
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-primary rounded-full p-6 mr-[10px]">
              <IoCalendarOutline className="w-30 h-30 text-white" />
            </div>
            <h1 className="text-[30px] font-bold text-black">최근 공연 현황</h1>
          </div>
          <p className="text-gray-700 mt-[15px] mb-[30px]">
            최근 1년 간 공연들의 예매 현황을 확인하세요
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                  공연명
                </th>
                <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                  공연장
                </th>
                <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                  공연일
                </th>
                <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                  상태
                </th>
                <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                  예매수
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-15">
                    <div className="font-medium text-black text-center">{event.name}</div>
                  </td>
                  <td className="px-6 py-15">
                    <div className="flex items-center justify-center text-gray-700">
                      <IoLocationOutline size={16} className="text-gray-700 mr-1" />
                      <span className="text-center">{event.venue}</span>
                    </div>
                  </td>
                  <td className="px-6 py-15 text-gray-700 text-center">{formatDate(event.date)}</td>
                  <td className="px-6 py-15 text-center">
                    <span className={getStatusBadge(event.status)}>{event.status}</span>
                  </td>
                  <td className="px-6 py-15">
                    <div className="flex items-center justify-center space-x-2">
                      <IoPeopleOutline size={16} className="text-gray-400" />
                      <span className="font-semibold text-black text-center">
                        {event.bookingCount.toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {events.length === 0 && (
          <div className="text-center py-12 mb-[30px]">
            <IoCalendarOutline className="mx-auto mt-[20px] mb-[15px] h-[24px] w-[24px] text-gray-400" />
            <h3 className="mt-2 text-[16px] font-bold text-black">등록된 공연이 없습니다.</h3>
            <p className="mt-1 text-[16px] text-gray-500">새로운 공연을 등록해보세요.</p>
          </div>
        )}
      </>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-[30px]">
        <div className="bg-white rounded-lg shadow-md p-9 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <IoCalendarOutline className="h-[24px] w-[24px] text-primary ml-[10px] mr-[10px]" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">총 공연 수</dt>
                <dd className="text-2xl font-bold text-black">{events.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-9 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <IoPeopleOutline className="h-[24px] w-[24px] text-primary ml-[10px] mr-[10px]" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">총 예매 수</dt>
                <dd className="text-2xl font-bold text-black">
                  {events.reduce((total, p) => total + p.bookingCount, 0).toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-9 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <IoLocationOutline className="h-[24px] w-[24px] text-primary ml-[10px] mr-[10px]" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">진행 중인 공연</dt>
                <dd className="text-2xl font-bold text-black">
                  {events.filter((e) => e.status === "진행중").length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

function MainPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white">
        <DashboardTable />
      </main>
    </div>
  )
}

export default MainPage
