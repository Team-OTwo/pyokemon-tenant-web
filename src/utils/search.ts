import { EventType } from "@/types/event"

// 공연명으로 검색하는 함수
export const searchEventsByTitle = (events: EventType[], searchTerm: string) => {
  if (!searchTerm.trim()) {
    return events
  }

  const term = searchTerm.toLowerCase().trim()
  return events.filter((event) => {
    return event.title.toLowerCase().includes(term)
  })
}

// 오늘 날짜 기준으로 공연 상태를 판단하는 함수
export const getEventStatus = (eventDate: string) => {
  const today = new Date()
  const eventDateObj = new Date(eventDate)

  // 시간 정보를 제거하고 날짜만 비교
  today.setHours(0, 0, 0, 0)
  eventDateObj.setHours(0, 0, 0, 0)

  if (eventDateObj < today) {
    return "진행 완료"
  } else {
    return "진행중"
  }
}

// 상태별로 공연을 필터링하는 함수
export const filterEventsByStatus = (events: EventType[], activeStatus: number) => {
  if (activeStatus === 0) {
    return events
  }

  const statusMap = {
    1: "진행 완료",
    2: "진행중",
  }

  const targetStatus = statusMap[activeStatus as keyof typeof statusMap]

  return events.filter((event) => {
    const eventStatus = getEventStatus(event.eventDate)
    return eventStatus === targetStatus
  })
}

// 검색과 상태 필터링을 모두 적용하는 함수
export const getFilteredEvents = (
  events: EventType[],
  searchTerm: string,
  activeStatus: number
) => {
  // 1. 먼저 검색 필터링
  const searchFiltered = searchEventsByTitle(events, searchTerm)

  // 2. 상태 필터링 적용
  return filterEventsByStatus(searchFiltered, activeStatus)
}
