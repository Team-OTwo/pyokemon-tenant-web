// src/pages/event-register-page.tsx
import React, { ChangeEvent, useRef, useState } from "react"
import { mockVenues } from "@/mock/venue-mock"

import Button from "@/components/ui/button/button"
import Select from "@/components/ui/select/select"
import Dashboard from "@/components/dashboard/dashboard"
import Sidebar from "@/components/sidebar/sidebar"

interface PriceGrade {
  grade: string
  price: string
}

function EventRegisterPage() {
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("")
  const [priceGrades, setPriceGrades] = useState<PriceGrade[]>([{ grade: "", price: "" }])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ageRestrictions = [
    { label: "전체관람가", value: "전체관람가" },
    { label: "12세 이상", value: "12세 이상" },
    { label: "15세 이상", value: "15세 이상" },
    { label: "19세 이상", value: "19세 이상" },
  ]
  const gradeOptions = [
    { label: "VIP", value: "VIP" },
    { label: "R", value: "R" },
    { label: "S", value: "S" },
    { label: "A", value: "A" },
  ]

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddPriceGrade = () => {
    setPriceGrades([...priceGrades, { grade: "", price: "" }])
  }

  const handlePriceGradeChange = (index: number, field: keyof PriceGrade, value: string) => {
    const newPriceGrades = [...priceGrades]
    newPriceGrades[index][field] = value
    setPriceGrades(newPriceGrades)
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
                  type="text-[16px]"
                  className="w-full h-50 px-16 py-2 mb-24 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="공연명을 입력하세요"
                />
              </div>

              {/* 공연장 */}
              <div>
                <div className="text-[16px] font-medium text-black mb-8">공연장</div>
                <Select
                  options={mockVenues}
                  onChange={(value) => console.log(value)}
                  placeholder="공연장을 선택하세요"
                />
              </div>

              {/* 연령 제한 */}
              <div>
                <div className="text-[16px] font-medium text-black mt-24 mb-8">연령 제한</div>
                <Select
                  options={ageRestrictions}
                  onChange={(value) => console.log(value)}
                  placeholder="연령 제한을 선택하세요"
                />
              </div>

              {/* 공연 상세정보 */}
              <div>
                <div className="text-[16px] font-medium text-black mt-24 mb-8">공연 상세정보</div>
                <textarea
                  className="w-full px-16 py-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px]"
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
                    value={thumbnail?.name || ""}
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
                {thumbnailPreview && (
                  <div className="mt-4">
                    <img
                      src={thumbnailPreview}
                      alt="썸네일 미리보기"
                      className="max-w-[300px] rounded-lg shadow-md"
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
                  {priceGrades.map((grade, index) => (
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
                      {index === priceGrades.length - 1 && (
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
          <Button text="다음" onClick={() => console.log()} />
        </div>
      </main>
    </div>
  )
}

export default EventRegisterPage
