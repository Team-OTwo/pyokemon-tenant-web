import React from "react"

import { BookingFilters } from "@/types/booking"
import { Badge } from "@/components/catalyst-ui/badge"
import { Button } from "@/components/catalyst-ui/button"
import { Input } from "@/components/catalyst-ui/input"
import { Listbox, ListboxOption } from "@/components/catalyst-ui/listbox"
import { Text } from "@/components/catalyst-ui/text"

interface BookingFiltersProps {
  filters: BookingFilters & { total?: number }
  onFiltersChange: (filters: BookingFilters) => void
  onReset: () => void
}

const BookingFiltersComponent: React.FC<BookingFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const paymentStatusOptions = [
    { value: "", label: "전체 결제상태" },
    { value: "PENDING", label: "결제대기" },
    { value: "COMPLETED", label: "결제완료" },
    { value: "REFUNDED", label: "환불됨" },
  ]

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value, page: 1 })
  }

  const handlePaymentStatusChange = (value: string) => {
    onFiltersChange({ ...filters, paymentStatus: value || undefined, page: 1 })
  }

  const handleDateFromChange = (value: string) => {
    onFiltersChange({ ...filters, dateFrom: value || undefined, page: 1 })
  }

  const handleDateToChange = (value: string) => {
    onFiltersChange({ ...filters, dateTo: value || undefined, page: 1 })
  }

  const handleReset = () => {
    onReset()
  }

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Text className="text-lg font-semibold text-zinc-900">예매 관리</Text>
          <Text className="text-sm text-zinc-500">총 {filters.total || 0}개의 예매 내역</Text>
        </div>
        <Button
          onClick={handleReset}
          color="zinc"
          className="px-4 py-2 text-sm cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors duration-200"
        >
          초기화
        </Button>
      </div>

      {/* 검색 및 필터 컨트롤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full mb-10">
        {/* 검색 */}
        <div className="w-full lg:col-span-2">
          <Input
            type="search"
            placeholder="고객명, 공연명 검색..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 결제 상태 */}
        <div className="w-full">
          <Listbox
            value={filters.paymentStatus || ""}
            onChange={handlePaymentStatusChange}
            placeholder="결제 상태"
            className="w-full"
          >
            {paymentStatusOptions.map((option) => (
              <ListboxOption key={option.value} value={option.value}>
                {option.label}
              </ListboxOption>
            ))}
          </Listbox>
        </div>

        {/* 날짜 범위 - 시작일 */}
        <div className="w-full">
          <Input
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) => handleDateFromChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 날짜 범위 - 종료일 */}
        <div className="w-full">
          <Input
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) => handleDateToChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* 활성 필터 표시 */}
      {(filters.search || filters.paymentStatus || filters.dateFrom || filters.dateTo) && (
        <div className="flex items-center gap-2 flex-wrap">
          <Text className="text-sm text-zinc-500">활성 필터:</Text>
          {filters.search && (
            <Badge color="zinc" className="text-xs">
              검색: {filters.search}
            </Badge>
          )}
          {filters.paymentStatus && (
            <Badge color="zinc" className="text-xs">
              결제: {paymentStatusOptions.find((opt) => opt.value === filters.paymentStatus)?.label}
            </Badge>
          )}
          {(filters.dateFrom || filters.dateTo) && (
            <Badge color="zinc" className="text-xs">
              날짜: {filters.dateFrom || "시작일"} ~ {filters.dateTo || "종료일"}
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

export default BookingFiltersComponent
