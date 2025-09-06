import React, { useEffect, useState } from "react"
import {
  convertSeatClassIdToGrade,
  deleteEvent,
  getTenantEventDetail,
} from "@/api/event-register-api"
import { getImageServerUrl } from "@/constants/env"
import { event } from "@/constants/event"
import EventCard from "@/pages/events-page/_components/event-card"
import { useScheduleFormStore } from "@/store/schedule-form-store"
import { convertEventToScheduleFormData } from "@/util/convertEventToScheduleFormData"
import { getAccountId } from "@/utils/auth"
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { EventFormData, EventStatus, EventType } from "@/types/event"
import { Button } from "@/components/catalyst-ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst-ui/table"

// HTML 내용에서 이미지 경로를 게이트웨이를 통해 완전한 URL로 변환하는 함수
const convertImageUrlsInHtml = (htmlContent: string): string => {
  if (!htmlContent) return htmlContent

  // src="/event/uploads/..." 패턴을 찾아서 게이트웨이를 통해 올바른 경로로 변환
  const imageServerUrl = getImageServerUrl()

  console.log("이미지 서버 URL:", imageServerUrl)
  console.log("원본 HTML:", htmlContent)

  // 다양한 이미지 URL 패턴을 처리
  const convertedHtml = htmlContent
    // /event/uploads/... 패턴
    .replace(/src="\/event\/uploads\/([^"]+)"/g, `src="${imageServerUrl}/event/uploads/$1"`)
    // /uploads/... 패턴 (이미 /event가 없는 경우)
    .replace(/src="\/uploads\/([^"]+)"/g, `src="${imageServerUrl}/event/uploads/$1"`)
    // 상대 경로 패턴
    .replace(/src="\.\.\/uploads\/([^"]+)"/g, `src="${imageServerUrl}/event/uploads/$1"`)
    // 절대 경로가 아닌 경우
    .replace(/src="uploads\/([^"]+)"/g, `src="${imageServerUrl}/event/uploads/$1"`)

  console.log("변환된 HTML:", convertedHtml)

  return convertedHtml
}

const EventDetailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { eventId } = useParams<{ eventId: string }>()
  const [eventData, setEventData] = useState<EventType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [useMockData, setUseMockData] = useState(false)

  // 이전 페이지에서 전달받은 상태 정보
  const previousState = location.state as {
    status?: string
    title?: string
    venueName?: string
    eventDate?: string
  } | null

  // API에서 이벤트 상세 정보 가져오기
  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        setError("이벤트 ID가 없습니다.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const accountId = getAccountId()

        const data = await getTenantEventDetail(parseInt(eventId), accountId)

        // 이전 페이지에서 전달받은 status가 있으면 사용
        if (previousState?.status) {
          data.status = previousState.status as EventStatus
        }

        setEventData(data)
        setUseMockData(false)
      } catch (err) {
        console.warn("API 호출 실패, mock 데이터 사용:", err)
        // mock 데이터 사용 (eventId가 1인 경우에만)
        if (parseInt(eventId) === 1) {
          setEventData(event)
          setUseMockData(true)
          setError("백엔드 API에 연결할 수 없어 샘플 데이터를 표시합니다.")
        } else {
          setError("공연 정보를 불러오는데 실패했습니다.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  const handleGoBack = () => {
    navigate("/events")
  }

  function convertEventToFormData(event: EventType): EventFormData {
    // 연령제한 숫자를 문자열로 변환하는 함수
    const convertAgeLimitToString = (ageLimit: number): string => {
      switch (ageLimit) {
        case 0:
          return "전체관람가"
        case 12:
          return "12세 이상"
        case 15:
          return "15세 이상"
        case 19:
          return "19세 이상"
        default:
          return "전체관람가" // 기본값
      }
    }

    return {
      title: event.title,
      venue: event.venueName?.trim() || "", // venueName을 venue 필드에 설정하고 공백 제거
      ageLimit: convertAgeLimitToString(event.ageLimit),
      genre: event.genre,
      description: event.description,
      thumbnail: null,
      thumbnailPreview: event.thumbnailUrl || "",
      priceGrades:
        event.seatPrice?.map((price) => ({
          priceId: undefined,
          grade: price.className,
          price: price.price,
          seatClassId: undefined,
        })) ||
        event.prices?.map((price) => ({
          priceId: price.priceId,
          grade: price.grade,
          price: price.price,
          seatClassId: price.seatClassId,
        })) ||
        [],
    }
  }

  const handleEdit = () => {
    if (!eventData) return

    // 기존 공연의 실제 데이터를 스케줄 폼에 설정
    const scheduleData = convertEventToScheduleFormData(eventData)

    useScheduleFormStore.getState().setScheduleFormData(scheduleData)

    // 기존 공연의 실제 데이터를 이벤트 폼에 설정
    const eventFormData = convertEventToFormData(eventData)

    navigate("/event-register", {
      state: {
        mode: "edit",
        eventData: eventFormData,
        eventId: eventData.eventId,
      },
    })
  }

  const handleDelete = async () => {
    if (!eventData) return

    const isConfirmed = window.confirm("공연을 삭제하시겠습니까?")
    if (!isConfirmed) return

    try {
      await deleteEvent(eventData.eventId)
      alert("공연이 성공적으로 삭제되었습니다.")
      navigate("/events") // 이벤트 목록 페이지로 이동
    } catch (error) {
      console.error("공연 삭제 실패:", error)
      alert("공연 삭제에 실패했습니다. 다시 시도해주세요.")
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-500 mt-4">공연 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error && !useMockData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => navigate("/events")}
            className="cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  if (!eventData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">공연 정보를 찾을 수 없습니다.</p>
          <Button
            onClick={() => navigate("/events")}
            className="cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <div className="p-5 w-full">
        {/* Mock 데이터 사용 시 경고 메시지 */}
        {useMockData && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex gap-6 items-center mb-16">
          <ArrowUturnLeftIcon
            className="text-gray-700 cursor-pointer w-5 h-5"
            onClick={handleGoBack}
          />
          <h1 className="text-2xl font-bold">공연 상세 조회</h1>
        </div>

        {/* Event Card with Edit Button */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">공연 정보</h2>
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <EventCard event={eventData} key={`${eventData.eventId}-detail`} disableClick={true} />
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <Button
              outline
              onClick={() => navigate(`/user/event/detail/${eventData.eventId}`)}
              className="cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
            >
              예매 페이지로 이동
            </Button>
            <div className="flex gap-2">
              <Button
                outline
                className="cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
                onClick={handleEdit}
              >
                수정
              </Button>
              <Button
                onClick={handleDelete}
                className="cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
        {/* Recent Orders Table */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">등급 및 가격</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>좌석 등급</TableHeader>
                <TableHeader>가격</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {(eventData.seatPrice || eventData.prices)
                ?.filter((price) => price.price > 0)
                .map((price, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {"className" in price
                        ? price.className
                        : price.seatClassId
                          ? convertSeatClassIdToGrade(price.seatClassId)
                          : price.grade}
                    </TableCell>
                    <TableCell>{formatCurrency(price.price)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* 상세정보 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-5">상세정보</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {eventData.description ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: convertImageUrlsInHtml(eventData.description) }}
              />
            ) : (
              <p className="text-gray-500">상세정보가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
