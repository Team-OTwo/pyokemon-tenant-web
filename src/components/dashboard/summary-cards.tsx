import React from "react"
import { IoCalendarOutline, IoLocationOutline, IoPeopleOutline } from "react-icons/io5"

import { Event } from "../../mock/dashboard-mock"
import { SkeletonMain } from "../ui/skeleton"

interface SummaryCardsProps {
  events: Event[]
  loading: boolean
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ events, loading }) => {
  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-[30px]">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-9 border border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <SkeletonMain variant="circular" width={24} height={24} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    <SkeletonMain variant="text" width={80} />
                  </dt>
                  <dd className="text-2xl font-bold text-black mt-2">
                    <SkeletonMain variant="text" width={60} />
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
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
  )
}

export default SummaryCards
