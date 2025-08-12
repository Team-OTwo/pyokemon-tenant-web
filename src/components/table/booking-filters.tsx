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

  const handlePaymentStatusChange = (value: string) => {
    onFiltersChange({ ...filters, paymentStatus: value, page: 1 })
  }

  const handleDateFromChange = (value: string) => {
    onFiltersChange({ ...filters, dateFrom: value || undefined, page: 1 })
  }

  const handleDateToChange = (value: string) => {
    onFiltersChange({ ...filters, dateTo: value || undefined, page: 1 })
  }

  const statusOptions = [
    { label: "전체", value: "" },
    { label: "예매완료", value: "BOOKED" },
    { label: "예매대기", value: "PENDING" },
    { label: "취소됨", value: "CANCELED" },
  ]

  const paymentStatusOptions = [
    { label: "전체", value: "" },
    { label: "결제완료", value: "COMPLETED" },
    { label: "결제대기", value: "PENDING" },
    { label: "환불됨", value: "REFUNDED" },
  ]

  return (
    <div className="space-y-4">
      {/* 필터 및 버튼들 */}
      <div className="flex items-center gap-4">
        {/* 검색 */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder="예매자명, 공연장명으로 검색..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 예매 상태 */}
        <div className="w-32">
          <Listbox
            value={filters.status || ""}
            onChange={handleStatusChange}
            placeholder="예매 상태"
          >
            {statusOptions.map((option) => (
              <ListboxOption key={option.value} value={option.value}>
                {option.label}
              </ListboxOption>
            ))}
          </Listbox>
        </div>

        {/* 결제 상태 */}
        <div className="w-32">
          <Listbox
            value={filters.paymentStatus || ""}
            onChange={handlePaymentStatusChange}
            placeholder="결제 상태"
          >
            {paymentStatusOptions.map((option) => (
              <ListboxOption key={option.value} value={option.value}>
                {option.label}
              </ListboxOption>
            ))}
          </Listbox>
        </div>

        {/* 날짜 범위 - 시작일 */}
        <div className="w-40">
          <Input
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) => handleDateFromChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 날짜 범위 - 종료일 */}
        <div className="w-40">
          <Input
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) => handleDateToChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 초기화 버튼 */}
        <Button
          plain
          onClick={onReset}
          className="px-4 py-2 text-sm border border-zinc-300 hover:bg-zinc-50 cursor-pointer"
        >
          초기화
        </Button>
      </div>

      {/* 일괄 환불 버튼 */}
      <div className="flex justify-end">
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
