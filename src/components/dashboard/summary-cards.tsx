import React from "react"
import { CurrencyDollarIcon, ShoppingCartIcon, TicketIcon } from "@heroicons/react/20/solid"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst-ui/table"
import { Text } from "@/components/catalyst-ui/text"

import { Event } from "../../mock/dashboard-mock"
import { SkeletonMain } from "../ui/skeleton"

interface SummaryCardsProps {
  events: Event[]
  loading: boolean
  className?: string
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ events, loading, className = "" }) => {
  const calculateTotalRevenue = () => {
    return events.reduce((total, event) => {
      const avgTicketPrice = 50000
      return total + event.bookingCount * avgTicketPrice
    }, 0)
  }

  const calculateAverageOrderValue = () => {
    const totalRevenue = calculateTotalRevenue()
    const totalBookings = events.reduce((total, event) => total + event.bookingCount, 0)
    return totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0
  }

  const getTotalTicketsSold = () => {
    return events.reduce((total, event) => total + event.bookingCount, 0)
  }

  if (loading) {
    return (
      <div className={`flex gap-6 mb-8 ${className}`}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex-1 bg-white rounded-lg p-6 border border-zinc-200">
            <div className="flex items-center justify-between">
              <div>
                <SkeletonMain variant="text" width={100} className="mb-2" />
                <SkeletonMain variant="text" width={80} className="text-2xl font-bold" />
              </div>
              <SkeletonMain variant="rectangular" width={40} height={40} />
            </div>
            <div className="mt-4">
              <SkeletonMain variant="text" width={120} height={24} />
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
              ₩{(calculateTotalRevenue() / 1000000).toFixed(1)}M
            </Text>
          </div>
        </div>
      </div>

      {/* Average Order Value */}
      <div className="flex-1 bg-white p-6 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-sm font-medium text-zinc-500">Average order value</Text>
            <Text className="text-2xl font-bold text-zinc-900">
              ₩{calculateAverageOrderValue().toLocaleString()}
            </Text>
          </div>
        </div>
      </div>

      {/* Tickets Sold */}
      <div className="flex-1 bg-white p-6 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-sm font-medium text-zinc-500">Tickets sold</Text>
            <Text className="text-2xl font-bold text-zinc-900">
              {getTotalTicketsSold().toLocaleString()}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards
