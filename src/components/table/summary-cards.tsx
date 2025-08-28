import React from "react"

import { Text } from "@/components/catalyst-ui/text"

import { SkeletonMain } from "../skeleton"

interface SummaryCardsProps {
  totalRevenue: number
  activeEventCount: number
  totalTicketsSold: number
  loading: boolean
  className?: string
  summaryEventCount?: number // summary의 activeEventCount 추가
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalRevenue,
  activeEventCount,
  totalTicketsSold,
  loading,
  className = "",
  summaryEventCount,
}) => {
  if (loading) {
    return (
      <div className={`flex gap-6 mb-8 ${className}`}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex-1 bg-white p-6 border-t border-zinc-200">
            <div className="flex items-center justify-between">
              <div>
                <SkeletonMain variant="text" width={120} height={16} className="mb-2" />
                <SkeletonMain variant="text" width={100} height={32} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex gap-6 mb-8 ${className}`}>
      {/* Total Revenue */}
      <div className="flex-1 bg-white p-6 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-sm font-medium text-zinc-500">Total revenue</Text>
            <Text className="text-2xl font-bold text-zinc-900">
              ₩{(totalRevenue / 1000000).toFixed(1)}M
            </Text>
          </div>
        </div>
      </div>

      {/* Ongoing Events */}
      <div className="flex-1 bg-white p-6 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-sm font-medium text-zinc-500">진행중인 공연</Text>
            <Text className="text-2xl font-bold text-zinc-900">{activeEventCount}개</Text>
            {/* events 개수가 summary와 일치하지 않을 때만 표시 */}
            {summaryEventCount !== undefined && activeEventCount !== summaryEventCount}
          </div>
        </div>
      </div>

      {/* Tickets Sold */}
      <div className="flex-1 bg-white p-6 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-sm font-medium text-zinc-500">Tickets sold</Text>
            <Text className="text-2xl font-bold text-zinc-900">
              {totalTicketsSold.toLocaleString()}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards
