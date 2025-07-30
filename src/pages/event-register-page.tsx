import React, { ChangeEvent, useRef, useState } from "react"
import { mockVenues } from "@/mock/venue-mock"
import { useNavigate } from "react-router-dom"

import Button from "@/components/ui/button/button"
import Select from "@/components/ui/select/select"
import Dashboard from "@/components/dashboard/dashboard"
import Sidebar from "@/components/sidebar/sidebar"

import { ageLimit, genreOptions, gradeOptions } from "../constants/event-register-options"
import { EventFormData, initialEventFormData, PriceGrade } from "../types/event"

function EventRegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<EventFormData>(initialEventFormData)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleAddPriceGrade = () => {
    setFormData((prev) => ({
      ...prev,
      priceGrades: [...prev.priceGrades, { grade: "", price: "", genre: "" }],
    }))
  }

  const handlePriceGradeChange = (index: number, field: keyof PriceGrade, value: string) => {
    const newPriceGrades = [...formData.priceGrades]
    newPriceGrades[index][field] = value
    setFormData((prev) => ({
      ...prev,
      priceGrades: newPriceGrades,
    }))
  }

  const handleNext = () => {
    // 필수 필드 검증
    if (!formData.title || !formData.venue || !formData.ageLimit || !formData.description) {
      alert("모든 필수 필드를 입력해주세요.")
      return
    }

    // 다음 페이지로 데이터 전달
    navigate("/schedules-register", {
      state: { eventData: formData },
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white">
        <Dashboard>
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-[30px] font-bold mb-20">공연 정보 등록</h1>

            <div className="space-y-6">
              {/* 공연명 */}
              <div>
                <div className="text-[16px] font-medium text-black mb-8">공연명</div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
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
                  value={formData.venue || undefined}
                  onChange={handleSelectChange("venue")}
                  placeholder="공연장을 선택하세요"
                />
              </div>

              {/* 장르 */}
              <div>
                <div className="text-[16px] font-medium text-black mt-24 mb-8">장르 선택</div>
                <Select
                  options={genreOptions}
                  value={formData.genre || undefined}
                  onChange={handleSelectChange("genre")}
                  placeholder="장르를 선택하세요"
                />
              </div>

              {/* 연령 제한 */}
              <div>
                <div className="text-[16px] font-medium text-black mt-24 mb-8">연령 제한</div>
                <Select
                  options={ageLimit}
                  value={formData.ageLimit || undefined}
                  onChange={handleSelectChange("ageLimit")}
                  placeholder="연령 제한을 선택하세요"
                />
              </div>

              {/* 공연 상세정보 */}
              <div>
                <div className="text-[16px] font-medium text-black mt-24 mb-8">공연 상세정보</div>
                <textarea
                  name="description"
                  value={formData.description}
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
                    value={formData.thumbnail?.name || ""}
                    readOnly
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                  <Button
                    text="추가"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-[60px]"
                  />
                </div>
                {formData.thumbnailPreview && (
                  <div className="mt-4">
                    <img
                      src={formData.thumbnailPreview}
                      alt="썸네일 미리보기"
                      className="max-w-[300px] rounded-[12px] shadow-md"
                    />
                  </div>
                )}
              </div>

              {/* 등급별 가격 설정 */}
              <div>
                <div className="text-[16px] font-medium text-black mt-24 mb-8">
                  등급별 가격 설정
                </div>
                <div className="space-y-4">
                  {formData.priceGrades.map((grade, index) => (
                    <div key={index} className="grid grid-cols-[1fr_1fr_1fr] gap-10 items-center">
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
                        onChange={(e) => handlePriceGradeChange(index, "price", e.target.value)}
                        className="w-320 h-50 px-16 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="가격을 입력하세요"
                        step="1000"
                      />
                      {index === formData.priceGrades.length - 1 && (
                        <Button text="추가" onClick={handleAddPriceGrade} className="w-[60px]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Dashboard>
        {/* 등록 버튼 */}
        <div className="pt-5 pb-24 ml-620">
          <Button text="다음" onClick={handleNext} />
        </div>
      </main>
    </div>
  )
}

export default EventRegisterPage
