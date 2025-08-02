import React, { ChangeEvent, useEffect, useRef } from "react"
import { mockVenues } from "@/mock/venue-mock"
import { useEventStore } from "@/store/eventStore"
import { useScheduleFormStore } from "@/store/schedule-form-store"
import { useLocation, useNavigate } from "react-router-dom"

import Button from "@/components/ui/button/button"
import Select from "@/components/ui/select/select"
import { Heading } from "@/components/catalyst-ui/heading"
import Dashboard from "@/components/dashboard/dashboard"

import { ageLimit, genreOptions, gradeOptions } from "../constants/event-register-options"
import { EventFormData, PriceGrade } from "../types/event"

function EventRegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { eventData, mode = "create" } = location.state || {}

  const { eventFormData, setEventFormData, updateEventFormData } = useEventStore()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateEventFormData({ [name]: value })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    updateEventFormData({ [name]: value })
  }

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateEventFormData({
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      })
    }
  }

  const handleAddPriceGrade = () => {
    const newPriceGrades = [...eventFormData.priceGrades, { grade: "", price: 0 }]
    updateEventFormData({ priceGrades: newPriceGrades })
  }

  const handlePriceGradeChange = (
    index: number,
    field: keyof PriceGrade,
    value: string | number
  ) => {
    const newPriceGrades = [...eventFormData.priceGrades]

    if (field === "grade" && typeof value === "string") {
      newPriceGrades[index].grade = value
    } else if (field === "price" && typeof value === "number") {
      newPriceGrades[index].price = value
    }
    updateEventFormData({ priceGrades: newPriceGrades })
  }

  const handleNext = () => {
    // 필수 필드 검증
    if (
      !eventFormData.title ||
      !eventFormData.venue ||
      !eventFormData.ageLimit ||
      !eventFormData.description
    ) {
      alert("모든 필수 필드를 입력해주세요.")
      return
    }
    console.log(eventFormData)
    // 다음 페이지로 데이터 전달
    navigate("/schedules-register", {
      state: { eventData: eventFormData, mode },
    })
  }

  const { resetScheduleFormData } = useScheduleFormStore()
  const { resetEventFormData } = useEventStore()

  useEffect(() => {
    if (mode === "edit" && eventData) {
      setEventFormData(eventData)
    } else if (mode === "create") {
      resetEventFormData()
      resetScheduleFormData()
    }
  }, [mode, eventData, setEventFormData, resetScheduleFormData, resetEventFormData])

  return (
    <Dashboard>
      <Heading level={1} className="text-2xl font-bold mb-20">
        공연 정보 등록
      </Heading>

      <div className="space-y-6">
        {/* 공연명 */}
        <div>
          <div className="text-[16px] font-medium text-black mb-8">공연명</div>
          <input
            type="text"
            name="title"
            value={eventFormData.title}
            onChange={handleInputChange}
            className="w-full h-50 px-16 py-2 mb-24 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="공연명을 입력하세요"
          />
        </div>

        {/* 공연장 */}
        <div>
          <div className="text-[16px] font-medium text-black mb-8">공연장</div>
          <Select
            options={mockVenues}
            value={eventFormData.venue || undefined}
            onChange={handleSelectChange("venue")}
            placeholder="공연장을 선택하세요"
          />
        </div>

        {/* 장르 */}
        <div>
          <div className="text-[16px] font-medium text-black mt-24 mb-8">장르 선택</div>
          <Select
            options={genreOptions}
            value={eventFormData.genre || undefined}
            onChange={handleSelectChange("genre")}
            placeholder="장르를 선택하세요"
          />
        </div>

        {/* 연령 제한 */}
        <div>
          <div className="text-[16px] font-medium text-black mt-24 mb-8">연령 제한</div>
          <Select
            options={ageLimit}
            value={eventFormData.ageLimit || undefined}
            onChange={handleSelectChange("ageLimit")}
            placeholder="연령 제한을 선택하세요"
          />
        </div>

        {/* 공연 상세정보 */}
        <div>
          <div className="text-[16px] font-medium text-black mt-24 mb-8">공연 상세정보</div>
          <textarea
            name="description"
            value={eventFormData.description}
            onChange={handleInputChange}
            className="w-full px-16 py-16 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px]"
            placeholder="공연 상세정보를 입력하세요"
          />
        </div>

        {/* 썸네일 */}
        <div>
          <div className="text-[16px] font-medium text-black mt-24 mb-8">썸네일</div>
          <div className="flex items-center space-x-10">
            <input
              type="text"
              className="w-650 h-50 px-16 border border-gray-300 rounded-[12px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="썸네일 불러오기"
              value={eventFormData.thumbnail?.name || ""}
              readOnly
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            <Button small text="추가" onClick={() => fileInputRef.current?.click()} />
          </div>
          {eventFormData.thumbnailPreview && (
            <div className="mt-4">
              <img
                src={eventFormData.thumbnailPreview}
                alt="썸네일 미리보기"
                className="max-w-[300px] rounded-[12px] shadow-md"
              />
            </div>
          )}
        </div>

        {/* 등급별 가격 설정 */}
        <div>
          <div className="text-[16px] font-medium text-black mt-24 mb-8">등급별 가격 설정</div>
          <div className="space-y-4">
            {eventFormData.priceGrades.map((grade, index) => (
              <div
                key={index}
                className="max-w-300 grid grid-cols-[1fr_1fr_1fr] gap-10 items-center"
              >
                <Select
                  options={gradeOptions}
                  value={grade.grade || undefined}
                  onChange={(value) => handlePriceGradeChange(index, "grade", value)}
                  placeholder="등급을 선택하세요"
                  className="w-320"
                />
                <input
                  type="number"
                  value={grade.price}
                  onChange={(e) => handlePriceGradeChange(index, "price", parseInt(e.target.value))}
                  className="w-320 h-50 px-16 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="가격을 입력하세요"
                  step="1000"
                />
                {index === eventFormData.priceGrades.length - 1 && (
                  <Button small text="추가" onClick={handleAddPriceGrade} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 등록 버튼 */}
      <div className="pt-10 pb-24 flex justify-end">
        <Button text="다음" onClick={handleNext} />
      </div>
    </Dashboard>
  )
}

export default EventRegisterPage
