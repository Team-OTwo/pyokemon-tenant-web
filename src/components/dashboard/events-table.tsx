import React from "react"
import { IoCalendarOutline, IoLocationOutline, IoPeopleOutline } from "react-icons/io5"

import { Event } from "../../mock/dashboard-mock"
import { SkeletonMain } from "../ui/skeleton"

interface EventsTableProps {
  events: Event[]
  loading: boolean
}

const EventsTable: React.FC<EventsTableProps> = ({ events, loading }) => {
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
              <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">상태</th>
              <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                예매수
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={120} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={100} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={80} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={60} height={32} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={60} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">공연명</th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">공연장</th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">공연일</th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">상태</th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">예매수</th>
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
      {events.length === 0 && (
        <div className="text-center py-12 mb-[30px]">
          <IoCalendarOutline className="mx-auto mt-[20px] mb-[15px] h-[24px] w-[24px] text-gray-400" />
          <h3 className="mt-2 text-[16px] font-bold text-black">등록된 공연이 없습니다.</h3>
          <p className="mt-1 text-[16px] text-gray-500">새로운 공연을 등록해보세요.</p>
        </div>
      )}
    </div>
  )
}

export default EventsTable
