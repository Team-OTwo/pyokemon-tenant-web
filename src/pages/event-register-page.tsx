import React, { ChangeEvent, useEffect, useRef } from "react"
import { mockVenues } from "@/mock/venue-mock"
import { useEventStore } from "@/store/eventStore"
import { useScheduleFormStore } from "@/store/schedule-form-store"
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/catalyst-ui/button"
import { Input } from "@/components/catalyst-ui/input"
import { Select } from "@/components/catalyst-ui/select"

import { ageLimit, genreOptions, gradeOptions } from "../constants/event-register-options"
import { PriceGrade } from "../types/event"

function EventRegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { eventData, mode = "create", eventId } = location.state || {}

  const { eventFormData, setEventFormData, updateEventFormData } = useEventStore()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGoBack = () => {
    navigate("/events")
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateEventFormData({ [name]: value })
  }

  const handleSelectChange = (name: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    updateEventFormData({ [name]: e.target.value })
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
    const newPriceGrades = [
      ...eventFormData.priceGrades,
      { grade: "", price: 0, seatClassId: undefined },
    ]
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
      state: { eventData: eventFormData, mode, eventId },
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
    } else if (mode === "back") {
      // 이전 페이지에서 돌아왔을 때는 상태를 보존
      // eventFormData와 scheduleFormData가 이미 Zustand에 저장되어 있음
      // eventId도 유지됨
    }
  }, [mode, eventData, setEventFormData, resetScheduleFormData, resetEventFormData])

  return (
    <div className="flex">
      <div className="p-5 w-full">
        {/* Header */}
        <div className="flex gap-6 items-center mb-16">
          <ArrowUturnLeftIcon
            className="text-gray-700 cursor-pointer w-5 h-5"
            onClick={handleGoBack}
          />
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? "공연 정보 수정" : "공연 정보 등록"}
          </h1>
        </div>

        <div className="space-y-8">
          {/* 공연명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">공연명</label>
            <Input
              type="text"
              name="title"
              value={eventFormData.title}
              onChange={handleInputChange}
              placeholder="공연명을 입력하세요"
              className="max-w-md"
            />
          </div>

          {/* 공연장 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">공연장</label>
            <Select
              value={eventFormData.venue || ""}
              onChange={handleSelectChange("venue")}
              className="max-w-md"
            >
              <option value="">공연장을 선택하세요</option>
              {mockVenues.map((venue) => (
                <option key={venue.value} value={venue.value}>
                  {venue.label}
                </option>
              ))}
            </Select>
          </div>

          {/* 장르 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">장르 선택</label>
            <Select
              value={eventFormData.genre || ""}
              onChange={handleSelectChange("genre")}
              className="max-w-md"
            >
              <option value="">장르를 선택하세요</option>
              {genreOptions.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </Select>
          </div>

          {/* 연령 제한 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">연령 제한</label>
            <Select
              value={eventFormData.ageLimit || ""}
              onChange={handleSelectChange("ageLimit")}
              className="max-w-md"
            >
              <option value="">연령 제한을 선택하세요</option>
              {ageLimit.map((age) => (
                <option key={age.value} value={age.value}>
                  {age.label}
                </option>
              ))}
            </Select>
          </div>

          {/* 공연 상세정보 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">공연 상세정보</label>
            <textarea
              name="description"
              value={eventFormData.description}
              onChange={handleInputChange}
              className="w-[70%] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-none"
              placeholder="공연 상세정보를 입력하세요"
            />
          </div>

          {/* 썸네일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">썸네일</label>
            <div className="flex items-center gap-4">
              <Input
                type="text"
                placeholder="썸네일 불러오기"
                value={eventFormData.thumbnail?.name || ""}
                readOnly
                className="max-w-md"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
              <Button
                outline
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-200"
              >
                썸네일 업로드
              </Button>
            </div>
            {eventFormData.thumbnailPreview && (
              <div className="mt-4">
                <img
                  src={eventFormData.thumbnailPreview}
                  alt="썸네일 미리보기"
                  className="max-w-[200px] rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* 등급별 가격 설정 */}
          <div className="w-[70%]">
            <label className="block text-sm font-medium text-gray-700 mb-4">등급별 가격 설정</label>
            <div className="space-y-4">
              {eventFormData.priceGrades.map((grade, index) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center">
                  <div className="w-full">
                    <Select
                      value={grade.grade || ""}
                      onChange={(e) => handlePriceGradeChange(index, "grade", e.target.value)}
                      className="w-full"
                    >
                      <option value="">등급을 선택하세요</option>
                      {gradeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="w-full">
                    <Input
                      type="number"
                      value={grade.price}
                      onChange={(e) =>
                        handlePriceGradeChange(index, "price", parseInt(e.target.value))
                      }
                      placeholder="가격을 입력하세요"
                      step="1000"
                      className="w-full"
                    />
                  </div>
                  <div className="w-20">
                    {index === eventFormData.priceGrades.length - 1 && (
                      <Button
                        outline
                        onClick={handleAddPriceGrade}
                        className="cursor-pointer hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-200"
                      >
                        추가
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className="pt-8 pb-6 flex justify-end w-full">
          <Button
            onClick={handleNext}
            className="cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventRegisterPage
