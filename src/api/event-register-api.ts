import { PLACEHOLDER_IMAGE } from "@/constants/default-images"

import { EventFormData, EventRequestData, EventType, PriceGrade } from "@/types/event"
import { ScheduleFormData } from "@/types/schedule"

import { client } from "./client"

// DB 응답 타입 정의 (JOIN 결과)
interface DbEventResponse {
  // tb_event
  eventId: number
  title: string
  thumbnailUrl: string
  status: string
  ageLimit?: number
  genre?: string
  description?: string

  // tb_event_schedule
  eventDate: string
  ticketOpenAt?: string
  eventScheduleId?: number

  // tb_venue
  venueName: string
  venueId?: number

  // tb_price와 tb_seat_class 조인 결과
  prices: Array<{
    priceId?: number
    seatClassId: number
    price: number
    seatClassName?: string // tb_seat_class에서 가져온 등급명
  }>
}

// 좌석 등급 ID를 등급명으로 변환
export const convertSeatClassIdToGrade = (seatClassId: number): string => {
  switch (seatClassId) {
    case 1:
      return "VIP"
    case 2:
      return "R"
    case 3:
      return "A"
    case 4:
      return "B"
    default:
      return "VIP"
  }
}

// DB 응답을 EventType으로 변환
const convertDbResponseToEventType = (dbResponse: DbEventResponse): EventType => {
  return {
    eventId: dbResponse.eventId,
    title: dbResponse.title,
    ageLimit: dbResponse.ageLimit || 0,
    venueName: dbResponse.venueName,
    venueId: dbResponse.venueId || 1, // venueId 추가
    eventDate: dbResponse.eventDate,
    ticketOpenAt: dbResponse.ticketOpenAt || "",
    genre: dbResponse.genre || "",
    description: dbResponse.description || "",
    eventScheduleId: dbResponse.eventScheduleId || 1,
    thumbnailUrl: dbResponse.thumbnailUrl,
    status: dbResponse.status as "PENDING" | "APPROVED" | "REJECTED",
    prices: dbResponse.prices.map((price) => ({
      priceId: price.priceId || 1, // priceId 추가
      grade: price.seatClassName || convertSeatClassIdToGrade(price.seatClassId),
      price: price.price,
      seatClassId: price.seatClassId,
    })),
  }
}

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
    case "A":
      return 3
    case "B":
      return 4
    default:
      return 1
  }
}

export const createEventRequestData = (
  eventData: EventFormData, // ExtendedEventData 대신 EventFormData 사용
  scheduleForm: ScheduleFormData,
  accountId: number,
  isEditMode: boolean = false
): EventRequestData => {
  console.log("=== createEventRequestData 디버깅 ===")
  console.log("isEditMode:", isEditMode)
  console.log("eventData:", eventData)
  console.log("scheduleForm:", scheduleForm)
  console.log("accountId:", accountId)
  console.log("==========================")

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

  const result = {
    accountId: accountId, // 로그인된 사용자의 accountId 추가
    title: eventData.title,
    ageLimit: convertAgeLimitToNumber(eventData.ageLimit),
    description: eventData.description,
    genre: eventData.genre,
    thumbnailUrl: "", // todo:실제로는 업로드된 이미지 URL
    schedules: [
      {
        venueId: isEditMode && scheduleForm.venueId ? scheduleForm.venueId : 1, // 수정 모드에서는 기존 venueId 사용
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
        prices: eventData.priceGrades.map((grade: PriceGrade, index: number) => ({
          seatClassId: convertGradeToSeatClassId(grade.grade),
          price: grade.price,
          // 수정 모드에서는 기존 priceId 사용
          priceId:
            isEditMode && scheduleForm.priceIds && scheduleForm.priceIds[index]
              ? scheduleForm.priceIds[index]
              : 1,
        })),
      },
    ],
  }

  console.log("=== 생성된 결과 ===")
  console.log("result:", result)
  console.log("==========================")

  return result
}

export const submitEvent = async (
  requestData: EventRequestData,
  accountId: number
): Promise<void> => {
  console.log("=== 공연 등록 API 호출 ===")
  console.log("URL:", `/api/events/tenant`)
  console.log("accountId:", accountId)
  console.log("requestData:", JSON.stringify(requestData, null, 2))
  console.log("==========================")

  const response = await client.post(`/api/events/tenant`, requestData, {
    params: { accountId },
  })

  if (!response.data.success) {
    throw new Error("공연 등록에 실패했습니다.")
  }
}

export const updateEvent = async (
  requestData: EventRequestData,
  eventId: number,
  accountId: number
): Promise<void> => {
  console.log("=== 공연 수정 API 호출 ===")
  console.log("URL:", `/api/events/tenant/${eventId}`)
  console.log("eventId:", eventId)
  console.log("accountId:", accountId)
  console.log("requestData:", JSON.stringify(requestData, null, 2))
  console.log("==========================")

  const response = await client.put(
    `/api/events/tenant/${eventId}`,
    {
      eventId: eventId,
      title: requestData.title,
      ageLimit: requestData.ageLimit,
      description: requestData.description,
      genre: requestData.genre,
      thumbnailUrl: requestData.thumbnailUrl,
      status: "PENDING",
      schedules: requestData.schedules.map((schedule) => ({
        eventScheduleId: schedule.eventScheduleId || 1, // requestData에서 전달받은 실제 스케줄 ID 사용
        venueId: schedule.venueId,
        ticketOpenAt: schedule.ticketOpenAt,
        eventDate: schedule.eventDate,
        prices: schedule.prices.map((price) => ({
          priceId: price.priceId || 1, // requestData에서 전달받은 실제 가격 ID 사용
          seatClassId: price.seatClassId,
          price: price.price,
        })),
      })),
    },
    {
      params: { accountId },
    }
  )

  if (!response.data.success) {
    throw new Error("공연 수정에 실패했습니다.")
  }
}

export const getEvents = async (accountId: number): Promise<EventType[]> => {
  try {
    const response = await client.get(`/api/events?accountId=${accountId}`)

    console.log("API 응답 상태:", response.status)
    console.log("API 응답 헤더:", response.headers)

    if (!response.data.success) {
      console.error("API 에러 응답:", response.data)
      throw new Error(`공연 목록 조회에 실패했습니다. (${response.status})`)
    }

    const data = response.data.data

    // DB 응답을 EventType 배열로 변환
    let events: EventType[] = []

    if (Array.isArray(data)) {
      // 같은 eventId를 가진 항목들을 그룹화
      const eventGroups = new Map<number, DbEventResponse[]>()

      data.forEach((item: DbEventResponse) => {
        const eventId = item.eventId
        if (!eventGroups.has(eventId)) {
          eventGroups.set(eventId, [])
        }
        eventGroups.get(eventId)!.push(item)
      })

      // 그룹화된 데이터를 EventType으로 변환
      events = Array.from(eventGroups.values()).map((group) => {
        // 첫 번째 항목을 기준으로 기본 정보 설정
        const firstItem = group[0]

        // status가 없으면 기본값 설정
        const eventWithStatus = {
          ...firstItem,
          status: firstItem.status || "PENDING", // 기본값으로 PENDING 설정
          thumbnailUrl: firstItem.thumbnailUrl || PLACEHOLDER_IMAGE, // 기본 이미지 설정
        }

        // 이미 EventType 형식인 경우 그대로 사용
        if (eventWithStatus.title && eventWithStatus.venueName) {
          return eventWithStatus as unknown as EventType
        }
        // DB 응답 형식인 경우 변환
        return convertDbResponseToEventType(eventWithStatus as DbEventResponse)
      })
    } else if (data.content && Array.isArray(data.content)) {
      // 페이징된 응답인 경우도 동일하게 처리
      const eventGroups = new Map<number, DbEventResponse[]>()

      data.content.forEach((item: DbEventResponse) => {
        const eventId = item.eventId
        if (!eventGroups.has(eventId)) {
          eventGroups.set(eventId, [])
        }
        eventGroups.get(eventId)!.push(item)
      })

      events = Array.from(eventGroups.values()).map((group) => {
        const firstItem = group[0]
        const eventWithStatus = {
          ...firstItem,
          status: firstItem.status || "PENDING",
          thumbnailUrl: firstItem.thumbnailUrl || PLACEHOLDER_IMAGE,
        }

        if (eventWithStatus.title && eventWithStatus.venueName) {
          return eventWithStatus as unknown as EventType
        }
        return convertDbResponseToEventType(eventWithStatus as DbEventResponse)
      })
    }

    return events
  } catch (error) {
    console.error("API 호출 중 에러:", error)
    throw error
  }
}

export const getEventById = async (eventId: number, accountId: number): Promise<EventType> => {
  try {
    const response = await client.get(`/api/events/${eventId}`, {
      params: { accountId },
    })

    console.log("API 응답 상태:", response.status)
    console.log("API 응답 데이터:", response.data)

    if (!response.data.success) {
      console.error("API 에러 응답:", response.data)
      throw new Error(`공연 상세 조회에 실패했습니다. (${response.status})`)
    }

    // API 응답에서 data 필드 추출
    const eventData = response.data.data || response.data
    console.log("이벤트 상세 데이터:", eventData)

    // status와 thumbnailUrl에 기본값 설정
    const eventWithDefaults = {
      ...eventData,
      status: eventData.status || "PENDING",
      thumbnailUrl: eventData.thumbnailUrl || PLACEHOLDER_IMAGE,
    }

    // 이미 EventType 형식인 경우 그대로 사용
    if (eventWithDefaults.title && eventWithDefaults.venueName) {
      return eventWithDefaults as unknown as EventType
    }
    const event = convertDbResponseToEventType(eventWithDefaults as DbEventResponse)
    return event
  } catch (error) {
    console.error("API 호출 중 에러:", error)
    throw error
  }
}

export const getTenantSchedules = async (accountId: number): Promise<EventType[]> => {
  try {
    const response = await client.get(`/api/events/tenant?account_id=${accountId}`)

    if (!response.data.success) {
      console.error("API 에러 응답:", response.data)
      throw new Error(`테넌트 스케줄 조회에 실패했습니다. (${response.status})`)
    }

    // API 응답에서 data 필드 추출
    const eventsData = response.data.data

    // DB 응답을 EventType 배열로 변환
    let events: EventType[] = []

    if (Array.isArray(eventsData)) {
      // 같은 eventId를 가진 항목들을 그룹화
      const eventGroups = new Map<number, DbEventResponse[]>()

      eventsData.forEach((item: DbEventResponse) => {
        const eventId = item.eventId
        if (!eventGroups.has(eventId)) {
          eventGroups.set(eventId, [])
        }
        eventGroups.get(eventId)!.push(item)
      })

      // 그룹화된 데이터를 EventType으로 변환
      events = Array.from(eventGroups.values()).map((group) => {
        // 첫 번째 항목을 기준으로 기본 정보 설정
        const firstItem = group[0]

        // status가 없으면 기본값 설정
        const eventWithStatus = {
          ...firstItem,
          status: firstItem.status || "PENDING", // 기본값으로 PENDING 설정
          thumbnailUrl: firstItem.thumbnailUrl || PLACEHOLDER_IMAGE, // 기본 이미지 설정
        }

        // 이미 EventType 형식인 경우 그대로 사용
        if (eventWithStatus.title && eventWithStatus.venueName) {
          return eventWithStatus as unknown as EventType
        }
        // DB 응답 형식인 경우 변환
        return convertDbResponseToEventType(eventWithStatus as DbEventResponse)
      })
    } else if (eventsData.content && Array.isArray(eventsData.content)) {
      // 페이징된 응답인 경우도 동일하게 처리
      const eventGroups = new Map<number, DbEventResponse[]>()

      eventsData.content.forEach((item: DbEventResponse) => {
        const eventId = item.eventId
        if (!eventGroups.has(eventId)) {
          eventGroups.set(eventId, [])
        }
        eventGroups.get(eventId)!.push(item)
      })

      events = Array.from(eventGroups.values()).map((group) => {
        const firstItem = group[0]
        const eventWithStatus = {
          ...firstItem,
          status: firstItem.status || "PENDING",
          thumbnailUrl: firstItem.thumbnailUrl || PLACEHOLDER_IMAGE,
        }

        if (eventWithStatus.title && eventWithStatus.venueName) {
          return eventWithStatus as unknown as EventType
        }
        return convertDbResponseToEventType(eventWithStatus as DbEventResponse)
      })
    }

    return events
  } catch (error) {
    console.error("API 호출 중 에러:", error)
    throw error
  }
}

export const getTenantEventDetail = async (
  eventId: number,
  accountId: number
): Promise<EventType> => {
  try {
    const response = await client.get(`/api/events/tenant/${eventId}/detail`, {
      params: { accountId },
    })

    console.log("API 응답 상태:", response.status)
    console.log("API 응답 데이터:", response.data)

    if (!response.data.success) {
      console.error("API 에러 응답:", response.data)
      throw new Error(`테넌트 이벤트 상세 조회에 실패했습니다. (${response.status})`)
    }

    // API 응답에서 data 필드 추출
    const eventData = response.data.data || response.data
    console.log("이벤트 상세 데이터:", eventData)

    // status와 thumbnailUrl에 기본값 설정
    const eventWithDefaults = {
      ...eventData,
      status: eventData.status || "PENDING",
      thumbnailUrl: eventData.thumbnailUrl || PLACEHOLDER_IMAGE,
    }

    // 이미 EventType 형식인 경우 그대로 사용
    if (eventWithDefaults.title && eventWithDefaults.venueName) {
      return eventWithDefaults as unknown as EventType
    }
    const event = convertDbResponseToEventType(eventWithDefaults as DbEventResponse)
    return event
  } catch (error) {
    console.error("API 호출 중 에러:", error)
    throw error
  }
}

export const deleteEvent = async (eventId: number): Promise<void> => {
  try {
    const response = await client.delete(`/api/events/tenant/${eventId}`)

    if (!response.data.success) {
      throw new Error(`Failed to delete event: ${response.status}`)
    }
  } catch (error) {
    console.error("Error deleting event:", error)
    throw error
  }
}
