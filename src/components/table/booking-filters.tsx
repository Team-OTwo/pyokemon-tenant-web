import React from "react"

import { BookingFilters } from "@/types/booking"
import { Button } from "@/components/catalyst-ui/button"
import { Input } from "@/components/catalyst-ui/input"
import { Listbox, ListboxOption } from "@/components/catalyst-ui/listbox"
import { Text } from "@/components/catalyst-ui/text"

interface BookingFiltersComponentProps {
  filters: BookingFilters & { total?: number }
  onFiltersChange: (filters: BookingFilters) => void
  onReset: () => void
  onBulkRefund?: () => void
}

const BookingFiltersComponent: React.FC<BookingFiltersComponentProps> = ({
  filters,
  onFiltersChange,
  onReset,
  onBulkRefund,
}) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value, page: 1 })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value, page: 1 })
  }

  const statusOptions = [
    { label: "전체", value: "" },
    { label: "결제 완료", value: "결제 완료" },
    { label: "결제 대기", value: "결제 대기" },
    { label: "결제 취소", value: "결제 취소" },
  ]

  return (
    <div className="space-y-4">
      {/* 필터 및 버튼들 */}
      <div className="flex items-center gap-4">
        {/* 검색 */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder="예매자명, 예매번호, 좌석으로 검색..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 결제 상태 */}
        <div className="w-32">
          <Listbox
            value={filters.status || ""}
            onChange={handleStatusChange}
            placeholder="결제 상태"
          >
            {statusOptions.map((option) => (
              <ListboxOption key={option.value} value={option.value}>
                {option.label}
              </ListboxOption>
            ))}
          </Listbox>
        </div>

        {/* 초기화 버튼 */}
        <Button
          plain
          onClick={onReset}
          className="px-4 py-2 text-sm border border-zinc-300 hover:bg-zinc-50 cursor-pointer"
        >
          초기화
        </Button>

        {/* 일괄 환불 버튼 */}
        <Button
          onClick={onBulkRefund}
          className="px-4 py-2 text-sm bg- text-white hover:bg-zinc-800 cursor-pointer"
        >
          일괄 환불
        </Button>
      </div>

      {/* 결과 개수 */}
      {filters.total !== undefined && (
        <div className="text-sm text-zinc-500">총 {filters.total}건의 예매 내역</div>
      )}
    </div>
  )
}

export default BookingFiltersComponent
