import React from "react"
import { event } from "@/constants/event"
import { mockEventStats, mockRecentOrders } from "@/mock/booking-mock"
import EventCard from "@/pages/events-page/_components/event-card"
import { useScheduleFormStore } from "@/store/schedule-form-store"
import { convertEventToScheduleFormData } from "@/util/convertEventToScheduleFormData"
import { format } from "date-fns"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

import { EventFormData, EventType, PriceGrade } from "@/types/event"
import Button from "@/components/ui/button"
import { Button as CatalystButton } from "@/components/catalyst-ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst-ui/table"

const EventDetailPage = () => {
  const navigate = useNavigate()
  const prices: PriceGrade[] = [
    { grade: "VIP", price: 198000 },
    { grade: "R", price: 178000 },
    { grade: "A", price: 148000 },
    { grade: "B", price: 0 },
  ]

  const handleGoBack = () => {
    navigate(-1)
  }

  function convertEventToFormData(event: EventType): EventFormData {
    return {
      title: event.title,
      venue: event.venueName,
      ageLimit: event.ageLimit.toString(),
      genre: event.genre,
      description: event.description,
      thumbnail: null,
      thumbnailPreview: event.thumbnailUrl || "",
      priceGrades: prices || [],
    }
  }

  const handleEdit = () => {
    const scheduleData = convertEventToScheduleFormData(event)
    useScheduleFormStore.getState().setScheduleFormData(scheduleData)

    navigate("/event-register", {
      state: { mode: "edit", eventData: convertEventToFormData(event) },
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  return (
    <div className="flex">
      <div className="p-32 w-full">
        {/* Header */}
        <div className="flex gap-12 items-center mb-16">
          <IoChevronBackOutline color="#686764" onClick={handleGoBack} className="cursor-pointer" />
          <h1 className="text-2xl font-bold">공연 상세 조회</h1>
        </div>

        {/* Event Card with Edit Button */}
        <div className="mb-32">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">공연 정보</h2>
            <CatalystButton outline onClick={handleEdit}>
              수정
            </CatalystButton>
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <EventCard event={event} key={`${event.eventId}-detail`} disableClick={true} />
          </div>
        </div>
        {/* Recent Orders Table */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-16">Recent orders</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Order number</TableHeader>
                <TableHeader>Purchase date</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Amount</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockRecentOrders.map((order) => (
                <TableRow key={order.orderNumber} href={`/orders/${order.orderNumber}`}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{formatDate(order.purchaseDate)}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{formatCurrency(order.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
