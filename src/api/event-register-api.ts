import { EventRequestData, PriceGrade } from "@/types/event"
import { ExtendedEventData, ScheduleFormData } from "@/types/schedule"

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

export const createEventRequestData = (
  eventData: ExtendedEventData,
  scheduleForm: ScheduleFormData
): EventRequestData => {
  const isValidTime = (hour: string, minute: string) => {
    return hour && minute && hour !== "" && minute !== ""
  }

  const createDateTimeString = (date: Date | null, hour: string, minute: string) => {
    if (!date || !isValidTime(hour, minute)) {
      return ""
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const timeHour = hour.padStart(2, "0")
    const timeMinute = minute.padStart(2, "0")

    return `${year}-${month}-${day}T${timeHour}:${timeMinute}:00`
  }

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
        ticketOpenAt: createDateTimeString(
          scheduleForm.ticketDate,
          scheduleForm.ticketStartTime.hour,
          scheduleForm.ticketStartTime.minute
        ),
        eventDate: createDateTimeString(
          scheduleForm.date,
          scheduleForm.eventStartTime.hour,
          scheduleForm.eventStartTime.minute
        ),
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

  const response = await fetch("http://localhost:8081/event/api/events", {
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

export const updateEvent = async (requestData: EventRequestData) => {}
