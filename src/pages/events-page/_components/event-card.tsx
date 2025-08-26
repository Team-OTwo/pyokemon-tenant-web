import React from "react"
import { EVENT_STATUS_COLORS, EVENT_STATUS_LABELS } from "@/constants/event"
import { useNavigate } from "react-router-dom"

import { EventType } from "@/types/event"
import { Text } from "@/components/catalyst-ui/text"

interface EventCardProps {
  event: EventType
  disableClick?: boolean
  showStatus?: boolean
  onClick?: () => void
}

const EventCard = ({ event, disableClick = false, showStatus = true, onClick }: EventCardProps) => {
  const navigation = useNavigate()

  const handleClick = () => {
    if (disableClick) return

    if (onClick) {
      onClick() //예매현황 페이지에서는
    } else {
      // 기본은 event-detail-page로 이동함
      navigation(`/events/${event.eventId}`)
    }
  }

  // 날짜 형식 개선 함수
  const formatDateTime = (dateTimeString: string): string => {
    if (!dateTimeString) return ""

    // T를 공백으로 변환
    const formatted = dateTimeString.replace("T", " ")

    // 날짜와 시간을 분리하여 더 읽기 쉽게 표시
    const [datePart, timePart] = formatted.split(" ")
    if (datePart && timePart) {
      const date = new Date(datePart)
      const formattedDate = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      const formattedTime = timePart.substring(0, 5) // HH:MM 형식으로 자르기
      return `${formattedDate} ${formattedTime}`
    }

    return formatted
  }

  // status에 대한 색상과 라벨 가져오기
  const getStatusInfo = (status: string) => {
    const statusColors = {
      APPROVED: "bg-green-100 text-green-800",
      PENDING: "bg-yellow-100 text-yellow-800",
      REJECTED: "bg-red-100 text-red-800",
    }

    const statusLabels = {
      APPROVED: "승인완료",
      PENDING: "승인대기",
      REJECTED: "반려",
      CANCELED: "공연취소",
    }

    return {
      color: statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800",
      label: statusLabels[status as keyof typeof statusLabels] || status,
    }
  }

  const statusInfo = getStatusInfo(event.status)

  return (
    <div
      className={`group relative flex items-center space-x-4 bg-white p-4 border-b border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 last:border-b-0 ${
        !disableClick
          ? "cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-200"
          : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className="h-16 w-16 rounded-lg object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Text className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
          {event.title}
        </Text>
        <div className="space-y-1">
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">
            {formatDateTime(event.eventDate)}
          </Text>
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">{event.venueName}</Text>
        </div>
      </div>

      {showStatus && (
        <div className="flex-shrink-0">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
          >
            {statusInfo.label}
          </span>
        </div>
      )}
    </div>
  )
}

export default EventCard
