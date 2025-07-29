import { ExtendedEventData, ScheduleFormData } from "@/types/schedule"

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
    tenantId: 1, // 실제로는 로그인된 테넌트 ID를 사용
    title: eventData.title,
    ageLimit: eventData.ageLimit,
    description: eventData.description,
    genre: eventData.genre,
    thumbnailUrl: "", // 실제로는 업로드된 이미지 URL
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
          seatClassId: parseInt(grade.grade), // 실제로는 등급 ID 매핑 필요
          price: parseInt(grade.price),
        })),
      },
    ],
  }
}

export const submitEvent = async (requestData: EventRequestData): Promise<void> => {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })

  if (!response.ok) {
    throw new Error("공연 등록에 실패했습니다.")
  }
}
