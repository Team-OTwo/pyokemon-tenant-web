import React from "react"
import { event } from "@/constants/event"
import { mockEventStats, mockRecentOrders } from "@/mock/booking-mock"
import EventCard from "@/pages/events-page/_components/event-card"
import { useScheduleFormStore } from "@/store/schedule-form-store"
import { convertEventToScheduleFormData } from "@/util/convertEventToScheduleFormData"
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"
import { format } from "date-fns"
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
      priceGrades: event.prices || [],
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
      <div className="p-5 w-full">
        {/* Header */}
        <div className="flex gap-6 items-center mb-16">
          <ArrowUturnLeftIcon
            color="#686764"
            onClick={handleGoBack}
            className="cursor-pointer w-5 h-5"
          />
          <h1 className="text-2xl font-bold">공연 상세 조회</h1>
        </div>

        {/* Event Card with Edit Button */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">공연 정보</h2>
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <EventCard event={event} key={`${event.eventId}-detail`} disableClick={true} />
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <CatalystButton outline onClick={() => navigate(`/user/event/detail/${event.eventId}`)}>
              예매 페이지로 이동
            </CatalystButton>
            <div className="flex gap-2">
              <CatalystButton outline onClick={handleEdit}>
                수정
              </CatalystButton>
              <CatalystButton>삭제</CatalystButton>
            </div>
          </div>
        </div>
        {/* Recent Orders Table */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-5">등급 및 가격</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>좌석 등급</TableHeader>
                <TableHeader>가격</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.prices
                .filter((price) => price.price > 0)
                .map((price, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{price.grade}</TableCell>
                    <TableCell>{formatCurrency(price.price)}</TableCell>
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
