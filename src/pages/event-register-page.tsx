import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { useEventStore } from "@/store/eventStore"
import { useScheduleFormStore } from "@/store/schedule-form-store"
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/catalyst-ui/button"
import { Input } from "@/components/catalyst-ui/input"
import { Select } from "@/components/catalyst-ui/select"
import ReactQuillEditor from "@/components/rich-text-editor/react-quill"

import { ageLimit, genreOptions, gradeOptions } from "../constants/event-register-options"
import { VENUE_OPTIONS } from "../constants/venue"
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
      { priceId: undefined, grade: "", price: 0, seatClassId: undefined },
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
    // 다음 페이지로 데이터 전달
    navigate("/schedules-register", {
      state: { eventData: eventFormData, mode, eventId },
    })
  }

  const { resetScheduleFormData } = useScheduleFormStore()
  const { resetEventFormData } = useEventStore()

  const [content, setContent] = useState("")

  const handleEditorChange = (value: string) => {
    setContent(value)
    updateEventFormData({ description: value })
  }

  useEffect(() => {
    if (eventFormData.description) {
      setContent(eventFormData.description)
    }
  }, [eventFormData.description])

  useEffect(() => {
    if (mode === "edit" && eventData) {
      setEventFormData(eventData)
      if (eventData.description) {
        setContent(eventData.description)
      }
    } else if (mode === "create") {
      resetEventFormData()
      resetScheduleFormData()
    } else if (mode === "back" || (mode === "edit" && !eventData)) {
      if (eventData) {
        setEventFormData(eventData)
        if (eventData.description) {
          setContent(eventData.description)
        }
      }
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

        {/* Form Container */}
        <div className="w-full lg:w-[70%]">
          <div className="space-y-8">
            {/* 공연명 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                공연명 <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="title"
                value={eventFormData.title}
                onChange={handleInputChange}
                placeholder="공연명을 입력하세요"
                className="w-full max-w-md"
              />
            </div>

            {/* 공연장 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                공연장 <span className="text-red-500">*</span>
              </label>
              <Select
                value={eventFormData.venue || ""}
                onChange={handleSelectChange("venue")}
                className="w-full max-w-md"
              >
                <option value="">공연장을 선택하세요</option>
                {VENUE_OPTIONS.map((venue) => (
                  <option key={venue.value} value={venue.value}>
                    {venue.label}
                  </option>
                ))}
              </Select>
            </div>

            {/* 장르 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                장르 선택 <span className="text-red-500">*</span>
              </label>
              <Select
                value={eventFormData.genre || ""}
                onChange={handleSelectChange("genre")}
                className="w-full max-w-md"
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
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연령 제한 <span className="text-red-500">*</span>
              </label>
              <Select
                value={eventFormData.ageLimit || ""}
                onChange={handleSelectChange("ageLimit")}
                className="w-full max-w-md"
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
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                공연 상세정보 <span className="text-red-500">*</span>
              </label>
              <div className="w-full mb-16">
                <ReactQuillEditor
                  value={content}
                  onChange={handleEditorChange}
                  style={{
                    width: "100%",
                    height: "200px",
                    minHeight: "200px",
                  }}
                />
              </div>
            </div>

            {/* 썸네일 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-2">썸네일</label>
              <div className="flex items-center gap-4 flex-wrap">
                <Input
                  type="text"
                  placeholder="썸네일 불러오기"
                  value={eventFormData.thumbnail?.name || ""}
                  readOnly
                  className="flex-1 max-w-md"
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
                  className="cursor-pointer hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-200 whitespace-nowrap"
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
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                등급별 가격 설정
              </label>
              <div className="space-y-4">
                {eventFormData.priceGrades.map((grade, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-center"
                  >
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
                    <div className="w-full md:w-20">
                      {index === eventFormData.priceGrades.length - 1 && (
                        <Button
                          outline
                          onClick={handleAddPriceGrade}
                          className="cursor-pointer hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-200 w-full md:w-auto"
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
