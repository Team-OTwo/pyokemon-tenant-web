import { PriceGrade } from "@/constants/event-register-options"

import { ExtendedEventData, ScheduleFormData } from "@/types/schedule"

// 연령 제한 문자열을 숫자로 변환하는 함수
const convertAgeLimitToNumber = (ageLimit: string): number => {
  switch (ageLimit) {
    case "전체관람가":
      return 0
    case "12세 이상":
      return 12
    case "15세 이상":
      return 15
    case "19세 이상":
      return 19
    default:
      return 0
  }
}

// 등급 문자열을 숫자 ID로 변환하는 함수
const convertGradeToSeatClassId = (grade: string): number => {
  switch (grade) {
    case "VIP":
      return 1
    case "R":
      return 2
    case "S":
      return 3
    case "A":
      return 4
    default:
      return 1
  }
}

export interface EventRequestData {
  tenantId: number
  title: string
  ageLimit: number
  description: string
  genre: string
  thumbnailUrl: string
  schedules: Array<{
    venueId: number
    ticketOpenAt: string
    eventDate: string
    prices: Array<{
      seatClassId: number
      price: number
    }>
  }>
}

export const createEventRequestData = (
  eventData: ExtendedEventData,
  scheduleForm: ScheduleFormData
): EventRequestData => {
  return {
    tenantId: 1, // todo: 실제로는 로그인된 테넌트 ID를 사용
    title: eventData.title,
    ageLimit: convertAgeLimitToNumber(eventData.ageLimit),
    description: eventData.description,
    genre: eventData.genre,
    thumbnailUrl: "", // todo:실제로는 업로드된 이미지 URL
    schedules: [
      {
        venueId: 1, // 실제로는 선택된 공연장 ID
        ticketOpenAt: scheduleForm.ticketDate
          ? `${scheduleForm.ticketDate.toISOString().split("T")[0]}T${scheduleForm.ticketStartTime.hour}:${scheduleForm.ticketStartTime.minute}:00`
          : "",
        eventDate: scheduleForm.date
          ? `${scheduleForm.date.toISOString().split("T")[0]}T${scheduleForm.eventStartTime.hour}:${scheduleForm.eventStartTime.minute}:00`
          : "",
        prices: eventData.priceGrades.map((grade: PriceGrade) => ({
          seatClassId: convertGradeToSeatClassId(grade.grade),
          price: parseInt(grade.price),
        })),
      },
    ],
  }
}

export const submitEvent = async (requestData: EventRequestData): Promise<void> => {
  console.log("API 요청 데이터:", requestData)

  const response = await fetch("http://localhost:8080/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })

  console.log("API 응답 상태:", response.status)
  console.log("API 응답:", await response.text())

  if (!response.ok) {
    throw new Error("공연 등록에 실패했습니다.")
  }
}
