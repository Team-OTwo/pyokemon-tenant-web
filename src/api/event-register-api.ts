import { EventRequestData, EventType, PriceGrade } from "@/types/event"
import { ExtendedEventData, ScheduleFormData } from "@/types/schedule"

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
    eventDate: dbResponse.eventDate,
    ticketOpenAt: dbResponse.ticketOpenAt || "",
    genre: dbResponse.genre || "",
    description: dbResponse.description || "",
    eventScheduleId: dbResponse.eventScheduleId || 1,
    thumbnailUrl: dbResponse.thumbnailUrl,
    status: dbResponse.status as "PENDING" | "APPROVED" | "REJECTED",
    prices: dbResponse.prices.map((price) => ({
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
          price: grade.price,
        })),
      },
    ],
  }
}

export const submitEvent = async (
  requestData: EventRequestData,
  accountId: number = 1
): Promise<void> => {
  console.log("API 요청 데이터:", requestData)
  console.log("Account ID:", accountId)

  const response = await fetch(`/event/api/events?account_id=${accountId}`, {
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

export const updateEvent = async (
  requestData: EventRequestData,
  eventId: number,
  accountId: number = 1
): Promise<void> => {
  console.log("이벤트 수정 API 요청 데이터:", requestData)
  console.log("Account ID:", accountId)

  const response = await fetch(`/event/api/events/${eventId}?account_id=${accountId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId: eventId,
      title: requestData.title,
      ageLimit: requestData.ageLimit,
      description: requestData.description,
      genre: requestData.genre,
      thumbnailUrl: requestData.thumbnailUrl,
      status: "PENDING",
      schedules: requestData.schedules.map((schedule) => ({
        eventScheduleId: 1, // 실제로는 기존 스케줄 ID를 사용해야 함
        venueId: schedule.venueId,
        ticketOpenAt: schedule.ticketOpenAt,
        eventDate: schedule.eventDate,
        prices: schedule.prices.map((price) => ({
          priceId: 1, // 실제로는 기존 가격 ID를 사용해야 함
          seatClassId: price.seatClassId,
          price: price.price,
        })),
      })),
    }),
  })

  console.log("이벤트 수정 API 응답 상태:", response.status)
  console.log("이벤트 수정 API 응답:", await response.text())

  if (!response.ok) {
    throw new Error("공연 수정에 실패했습니다.")
  }
}

export const getEvents = async (accountId: number = 1): Promise<EventType[]> => {
  console.log(`공연 목록 조회 API 호출 시작 - accountId: ${accountId}`)

  try {
    const response = await fetch(`/event/api/events?account_id=${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("API 응답 상태:", response.status)
    console.log("API 응답 헤더:", response.headers)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API 에러 응답:", errorText)
      throw new Error(`공연 목록 조회에 실패했습니다. (${response.status})`)
    }

    const data = await response.json()
    console.log("API 응답 데이터:", data)

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
          thumbnailUrl:
            firstItem.thumbnailUrl || "https://via.placeholder.com/300x200?text=No+Image", // 기본 이미지 설정
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
          thumbnailUrl:
            firstItem.thumbnailUrl || "https://via.placeholder.com/300x200?text=No+Image",
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

export const getEventById = async (eventId: number, accountId: number = 1): Promise<EventType> => {
  console.log(`공연 상세 조회 API 호출 시작 - eventId: ${eventId}, accountId: ${accountId}`)

  try {
    const response = await fetch(`/event/api/events/${eventId}?account_id=${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("API 응답 상태:", response.status)
    console.log("API 응답 헤더:", response.headers)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API 에러 응답:", errorText)
      throw new Error(`공연 상세 조회에 실패했습니다. (${response.status})`)
    }

    const responseText = await response.text()
    console.log("API 응답 텍스트:", responseText)

    // JSON 파싱 시도
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON 파싱 실패:", parseError)
      console.error("응답이 JSON이 아닙니다:", responseText)
      throw new Error("서버에서 유효하지 않은 JSON 응답을 받았습니다.")
    }
    console.log("API 응답 데이터:", data)

    // API 응답에서 data 필드 추출
    const eventData = data.data || data
    console.log("이벤트 상세 데이터:", eventData)

    // status와 thumbnailUrl에 기본값 설정
    const eventWithDefaults = {
      ...eventData,
      status: eventData.status || "PENDING",
      thumbnailUrl: eventData.thumbnailUrl || "https://via.placeholder.com/300x200?text=No+Image",
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

export const getTenantSchedules = async (accountId: number = 1): Promise<EventType[]> => {
  console.log(`테넌트별 공연 리스트 API 호출 시작 - accountId: ${accountId}`)

  try {
    const response = await fetch(`/event/api/events/tenant?account_id=${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("API 응답 상태:", response.status)
    console.log("API 응답 헤더:", response.headers)

    // 응답 텍스트를 먼저 확인
    const responseText = await response.text()
    console.log("API 응답 텍스트:", responseText)

    if (!response.ok) {
      console.error("API 에러 응답:", responseText)
      throw new Error(`테넌트 스케줄 조회에 실패했습니다. (${response.status})`)
    }

    // JSON 파싱 시도
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON 파싱 실패:", parseError)
      console.error("응답이 JSON이 아닙니다:", responseText)
      throw new Error("서버에서 유효하지 않은 JSON 응답을 받았습니다.")
    }
    console.log("API 응답 데이터:", data)

    // API 응답에서 data 필드 추출
    const eventsData = data.data || data
    console.log("이벤트 데이터:", eventsData)

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
          thumbnailUrl:
            firstItem.thumbnailUrl || "https://via.placeholder.com/300x200?text=No+Image", // 기본 이미지 설정
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
          thumbnailUrl:
            firstItem.thumbnailUrl || "https://via.placeholder.com/300x200?text=No+Image",
        }

        if (eventWithStatus.title && eventWithStatus.venueName) {
          return eventWithStatus as unknown as EventType
        }
        return convertDbResponseToEventType(eventWithStatus as DbEventResponse)
      })
    }

    console.log("변환된 이벤트:", events)

    return events
  } catch (error) {
    console.error("API 호출 중 에러:", error)
    throw error
  }
}

export const getTenantEventDetail = async (
  eventId: number,
  accountId: number = 1
): Promise<EventType> => {
  console.log(
    `테넌트 이벤트 상세 조회 API 호출 시작 - eventId: ${eventId}, accountId: ${accountId}`
  )

  try {
    const response = await fetch(
      `/event/api/events/tenant/${eventId}/detail?account_id=${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    console.log("API 응답 상태:", response.status)
    console.log("API 응답 헤더:", response.headers)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API 에러 응답:", errorText)
      throw new Error(`테넌트 이벤트 상세 조회에 실패했습니다. (${response.status})`)
    }

    const responseText = await response.text()
    console.log("API 응답 텍스트:", responseText)

    // JSON 파싱 시도
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON 파싱 실패:", parseError)
      console.error("응답이 JSON이 아닙니다:", responseText)
      throw new Error("서버에서 유효하지 않은 JSON 응답을 받았습니다.")
    }
    console.log("API 응답 데이터:", data)

    // API 응답에서 data 필드 추출
    const eventData = data.data || data
    console.log("이벤트 상세 데이터:", eventData)

    // status와 thumbnailUrl에 기본값 설정
    const eventWithDefaults = {
      ...eventData,
      status: eventData.status || "PENDING",
      thumbnailUrl: eventData.thumbnailUrl || "https://via.placeholder.com/300x200?text=No+Image",
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
