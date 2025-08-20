import React, { useEffect } from "react"
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"
import Calendar from "react-calendar"
import { IoCalendarOutline } from "react-icons/io5"

import "@/components/calander/calander.css"

import { createEventRequestData, submitEvent, updateEvent } from "@/api/event-register-api"
import { hourOptions, minuteOptions } from "@/constants/event-register-options"
import { useEventStore } from "@/store/eventStore"
import { useScheduleFormStore } from "@/store/schedule-form-store"
import { getAccountId } from "@/utils/auth"
import { useLocation, useNavigate } from "react-router-dom"

import { ExtendedEventData } from "@/types/schedule"
import { useScheduleForm } from "@/hooks/useScheduleForm"
import { Button } from "@/components/catalyst-ui/button"
import { Select } from "@/components/catalyst-ui/select"

function SchedulesRegisterPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { eventData, mode = "create", eventId } = location.state || {}
  const { resetEventFormData } = useEventStore()
  const { scheduleFormData, resetScheduleFormData } = useScheduleFormStore()

  const {
    scheduleForm,
    showCalendar,
    showTicketCalendar,
    setScheduleForm,
    setShowCalendar,
    setShowTicketCalendar,
    handleDateChange,
    handleTicketDateChange,
    handleTimeChange,
  } = useScheduleForm()

  const handleGoBack = () => {
    // 현재 입력된 일정 데이터를 Zustand에 저장
    const { setScheduleFormData } = useScheduleFormStore.getState()
    setScheduleFormData(scheduleForm)

    navigate("/event-register", { state: { mode: "back", eventId } })
  }

  useEffect(() => {
    if (mode === "edit" && scheduleFormData) {
      setScheduleForm(scheduleFormData)
    }
  }, [mode, scheduleFormData, setScheduleForm])

  if (!eventData) {
    navigate("/event-register")
    return null
  }

  const handleSubmit = async () => {
    // 날짜와 시간 유효성 검사
    if (!scheduleForm.date || !scheduleForm.ticketDate) {
      alert("공연 날짜와 티켓 오픈일을 모두 선택해주세요.")
      return
    }

    if (!scheduleForm.eventStartTime.hour || !scheduleForm.eventStartTime.minute) {
      alert("공연 시작 시간을 선택해주세요.")
      return
    }

    if (!scheduleForm.ticketStartTime.hour || !scheduleForm.ticketStartTime.minute) {
      alert("티켓 오픈 시간을 선택해주세요.")
      return
    }

    // 로그인된 사용자의 accountId 사용
    const accountId = getAccountId()

    // 디버깅을 위한 로그 추가
    console.log("=== 공연 수정 디버깅 ===")
    console.log("mode:", mode)
    console.log("eventData:", eventData)
    console.log("scheduleForm:", scheduleForm)
    console.log("eventId:", eventId)
    console.log("accountId:", accountId)
    console.log("==========================")

    // API 요청 데이터 구성 및 제출
    const requestData = createEventRequestData(eventData, scheduleForm, accountId, mode === "edit")
    
    console.log("=== 생성된 요청 데이터 ===")
    console.log("requestData:", requestData)
    console.log("==========================")

    try {
      if (mode === "edit") {
        await updateEvent(requestData, eventId, accountId)
        alert("공연이 성공적으로 수정되었습니다.")
      } else {
        await submitEvent(requestData, accountId)
        alert("공연이 성공적으로 등록되었습니다.")
      }

      // Zustand store 초기화
      resetEventFormData()
      resetScheduleFormData()
      // 성공 시 다른 페이지로 이동
      navigate("/events")
    } catch (error) {
      console.error("Error:", error)
      alert(`공연 ${mode === "edit" ? "수정" : "등록"}에 실패했습니다: ${error}`)
    }
  }

  return (
    <div className="p-5 w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex gap-6 items-center mb-5">
        <ArrowUturnLeftIcon
          className="text-gray-700 cursor-pointer w-5 h-5"
          onClick={handleGoBack}
        />
        <h1 className="text-2xl font-bold">
          {mode === "edit" ? "공연 일정 수정" : "공연 일정 등록"}
        </h1>
      </div>

      <div className="bg-white p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8">
          {/* 공연 정보 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">공연 정보</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{eventData.title}</h3>
                <p className="text-gray-600">{eventData.venue}</p>
              </div>
              {eventData.thumbnailPreview && (
                <div className="mt-4">
                  <img
                    src={eventData.thumbnailPreview}
                    alt="공연 썸네일"
                    className="w-full max-w-sm rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 구분선 */}
          <div className="hidden lg:block">
            <div className="h-full w-px bg-gray-200 mx-auto"></div>
          </div>

          {/* 일정 등록 폼 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">일정 설정</h2>

            <div className="space-y-6">
              {/* 공연 날짜 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">공연 날짜</label>
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={`flex items-center w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      !scheduleForm.date ? "text-gray-500" : "text-gray-900"
                    }`}
                  >
                    <IoCalendarOutline className="mr-3 w-5 h-5" />
                    {scheduleForm.date
                      ? scheduleForm.date.toLocaleDateString()
                      : "날짜를 선택하세요"}
                  </button>
                  {showCalendar && (
                    <div className="absolute z-10 mt-2">
                      <Calendar
                        onChange={handleDateChange}
                        value={scheduleForm.date}
                        minDate={new Date()}
                        className="border rounded-lg shadow-lg bg-white"
                        locale="en-US"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">시</label>
                    <Select
                      value={scheduleForm.eventStartTime.hour || ""}
                      onChange={(e) => handleTimeChange("eventStartTime", "hour", e.target.value)}
                      className="w-full"
                    >
                      <option value="">시 </option>
                      {hourOptions.map((hour) => (
                        <option key={hour.value} value={hour.value}>
                          {hour.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">분</label>
                    <Select
                      value={scheduleForm.eventStartTime.minute || ""}
                      onChange={(e) => handleTimeChange("eventStartTime", "minute", e.target.value)}
                      className="w-full"
                    >
                      <option value="">분 </option>
                      {minuteOptions.map((minute) => (
                        <option key={minute.value} value={minute.value}>
                          {minute.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              {/* 티켓팅 오픈 일정 */}
              <div className="mt-20">
                <label className="block text-sm font-medium text-gray-700 mb-2">티켓 오픈일</label>
                <div className="relative">
                  <button
                    onClick={() => setShowTicketCalendar(!showTicketCalendar)}
                    className={`flex items-center w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      !scheduleForm.ticketDate ? "text-gray-500" : "text-gray-900"
                    }`}
                  >
                    <IoCalendarOutline className="mr-3 w-5 h-5" />
                    {scheduleForm.ticketDate
                      ? scheduleForm.ticketDate.toLocaleDateString()
                      : "날짜를 선택하세요"}
                  </button>
                  {showTicketCalendar && (
                    <div className="absolute z-10 mt-2">
                      <Calendar
                        onChange={handleTicketDateChange}
                        value={scheduleForm.ticketDate}
                        minDate={new Date()}
                        className="border rounded-lg shadow-lg bg-white"
                        locale="en-US"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">시</label>
                    <Select
                      value={scheduleForm.ticketStartTime.hour || ""}
                      onChange={(e) => handleTimeChange("ticketStartTime", "hour", e.target.value)}
                      className="w-full"
                    >
                      <option value="">시</option>
                      {hourOptions.map((hour) => (
                        <option key={hour.value} value={hour.value}>
                          {hour.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">분</label>
                    <Select
                      value={scheduleForm.ticketStartTime.minute || ""}
                      onChange={(e) =>
                        handleTimeChange("ticketStartTime", "minute", e.target.value)
                      }
                      className="w-full"
                    >
                      <option value="">분</option>
                      {minuteOptions.map((minute) => (
                        <option key={minute.value} value={minute.value}>
                          {minute.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 등록 버튼 */}
      <div className="flex justify-between items-center pt-8 pb-6">
        <Button
          outline
          onClick={handleGoBack}
          className="cursor-pointer hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-200"
        >
          이전
        </Button>
        <Button
          onClick={handleSubmit}
          className="cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
        >
          {mode === "edit" ? "공연 정보 수정" : "공연 정보 등록"}
        </Button>
      </div>
    </div>
  )
}

export default SchedulesRegisterPage