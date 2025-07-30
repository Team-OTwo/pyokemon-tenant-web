import React from "react"
import Calendar from "react-calendar"
import { IoCalendarOutline } from "react-icons/io5"

import "@/components/calander/calander.css"

import { createEventRequestData, submitEvent } from "@/api/event-register-api"
import { hourOptions, minuteOptions } from "@/constants/event-register-options"
import { useLocation, useNavigate } from "react-router-dom"

import { ExtendedEventData } from "@/types/schedule"
import { useScheduleForm } from "@/hooks/useScheduleForm"
import Button from "@/components/ui/button/button"
import Select from "@/components/ui/select/select"
import Dashboard from "@/components/dashboard/dashboard"
import Sidebar from "@/components/sidebar/sidebar"

function SchedulesRegisterPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const eventData: ExtendedEventData = location.state?.eventData

  const {
    scheduleForm,
    showCalendar,
    showTicketCalendar,
    setShowCalendar,
    setShowTicketCalendar,
    handleDateChange,
    handleTicketDateChange,
    handleTimeChange,
  } = useScheduleForm()

  if (!eventData) {
    navigate("/event-register")
    return null
  }

  const handleSubmit = async () => {
    try {
      if (!scheduleForm.date || !scheduleForm.ticketDate) {
        alert("공연 날짜와 티켓 오픈일을 모두 선택해주세요.")
        return
      }

      // API 요청 데이터 구성 및 제출
      const requestData = createEventRequestData(eventData, scheduleForm)
      console.log("생성된 requestData:", requestData)

      await submitEvent(requestData)

      alert("공연이 성공적으로 등록되었습니다.")
      // 성공 시 다른 페이지로 이동
      navigate("/main")
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white">
        <div className="[&>div]:!w-[1100px]">
          <Dashboard>
            <div className="flex gap-50">
              <div className="w-500 p-8">
                <div className="rounded-lg bg-white p-6">
                  <div className="w-[350px] text-[25px] font-bold mb-4 break-words">
                    {eventData.title}
                  </div>
                  <p className="text-[20px] font-medium text-gray-700 mt-9 mb-14">
                    {eventData.venue}
                  </p>
                  {eventData.thumbnailPreview && (
                    <img
                      src={eventData.thumbnailPreview}
                      alt="공연 썸네일"
                      className="w-full rounded-lg shadow-md"
                    />
                  )}
                </div>
              </div>

              {/* 일정 등록 폼 */}
              <div className="w-400 p-8">
                <h1 className="text-[30px] font-bold  mb-20">공연 일정 등록</h1>

                <div className="space-y-6">
                  {/* 공연 날짜 */}
                  <div className="w-410">
                    <div className="text-[16px] font-medium text-black mt-50 mb-8">공연 날짜</div>
                    <div className="flex items-center">
                      <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className={`flex items-center w-full h-50 px-16 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary ${
                          !scheduleForm.date ? "text-[#a19f9a]" : "text-[#222222]"
                        }`}
                      >
                        <IoCalendarOutline className="mr-10" />
                        {scheduleForm.date
                          ? scheduleForm.date.toLocaleDateString()
                          : "날짜를 선택하세요"}
                      </button>
                    </div>
                    {showCalendar && (
                      <div className="absolute z-10 mt-2">
                        <Calendar
                          onChange={handleDateChange}
                          value={scheduleForm.date}
                          minDate={new Date()}
                          className="border rounded-lg shadow-lg"
                          locale="en-US"
                        />
                      </div>
                    )}
                    <div className="flex gap-10 mt-15 ">
                      <Select
                        options={hourOptions}
                        value={scheduleForm.eventStartTime.hour || undefined}
                        onChange={(value) => handleTimeChange("eventStartTime", "hour", value)}
                        placeholder="시"
                        className="w-200"
                      />
                      <Select
                        options={minuteOptions}
                        value={scheduleForm.eventStartTime.minute || undefined}
                        onChange={(value) => handleTimeChange("eventStartTime", "minute", value)}
                        placeholder="분"
                        className="w-200"
                      />
                    </div>
                  </div>

                  {/* 티켓팅 오픈 일정 */}
                  <div>
                    <div className="text-[16px] font-medium text-black mt-35 mb-8">티켓 오픈일</div>
                    <div className="w-410">
                      <div className="flex items-center mb-15">
                        <button
                          onClick={() => setShowTicketCalendar(!showTicketCalendar)}
                          className={`flex items-center w-full h-50 px-16 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary ${
                            !scheduleForm.ticketDate ? "text-[#a19f9a]" : "text-[#222222]"
                          }`}
                        >
                          <IoCalendarOutline className="mr-10" />
                          {scheduleForm.ticketDate
                            ? scheduleForm.ticketDate.toLocaleDateString()
                            : "날짜를 선택하세요"}
                        </button>
                      </div>
                      {showTicketCalendar && (
                        <div className="absolute z-10 mt-2">
                          <Calendar
                            onChange={handleTicketDateChange}
                            value={scheduleForm.ticketDate}
                            minDate={new Date()}
                            className="border rounded-lg shadow-lg"
                            locale="en-US"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-10 mt-4">
                      <Select
                        options={hourOptions}
                        value={scheduleForm.ticketStartTime.hour || undefined}
                        onChange={(value) => handleTimeChange("ticketStartTime", "hour", value)}
                        placeholder="시"
                        className="w-200"
                      />
                      <Select
                        options={minuteOptions}
                        value={scheduleForm.ticketStartTime.minute || undefined}
                        onChange={(value) => handleTimeChange("ticketStartTime", "minute", value)}
                        placeholder="분"
                        className="w-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dashboard>
        </div>
        {/* 등록 버튼 */}
        <div className="flex gap-800 pt-5 pb-24">
          <Button small text="이전" onClick={() => navigate("/event-register")} />
          <Button small text="공연 일정 등록" onClick={handleSubmit} />
        </div>
      </main>
    </div>
  )
}

export default SchedulesRegisterPage
