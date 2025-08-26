import React from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

import { BookingApiItem } from "@/types/booking"
import { Badge } from "@/components/catalyst-ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst-ui/table"
import { Text } from "@/components/catalyst-ui/text"

import { SkeletonMain } from "../skeleton"

interface BookingsTableProps {
  bookings: BookingApiItem[]
  loading: boolean
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings, loading }) => {
  const getPaymentStatusBadge = (status: string) => {
    // 결제 상태를 한국어로 변환
    let displayStatus: string
    let badgeColor: "green" | "amber" | "red"

    switch (status) {
      case "결제 완료":
        displayStatus = "결제완료"
        badgeColor = "green"
        break
      case "결제 대기":
        displayStatus = "결제대기"
        badgeColor = "amber"
        break
      case "결제 취소":
      case "결제 실패":
        displayStatus = "결제취소"
        badgeColor = "red"
        break
      default:
        console.warn("알 수 없는 결제 상태:", status)
        displayStatus = status || "알 수 없음"
        badgeColor = "amber"
    }

    return <Badge color={badgeColor}>{displayStatus}</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy", { locale: ko })
  }

  if (loading) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>예매자</TableHeader>
            <TableHeader>예매번호</TableHeader>
            <TableHeader>예매좌석</TableHeader>
            <TableHeader>결제금액</TableHeader>
            <TableHeader>결제상태</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <SkeletonMain variant="text" width={80} height={20} />
              </TableCell>
              <TableCell>
                <SkeletonMain variant="text" width={100} height={20} />
              </TableCell>

              <TableCell>
                <div>
                  <SkeletonMain variant="text" width={80} height={20} />
                  <SkeletonMain variant="text" width={120} height={16} />
                </div>
              </TableCell>
              <TableCell>
                <SkeletonMain variant="text" width={80} height={20} />
              </TableCell>
              <TableCell>
                <SkeletonMain variant="text" width={60} height={20} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto h-16 w-16 text-zinc-400 mb-6">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <Text className="text-lg font-semibold text-zinc-900 mb-2">예매 내역이 없습니다.</Text>
        <Text className="text-zinc-500">예매 정보를 확인해보세요.</Text>
      </div>
    )
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>예매자</TableHeader>
          <TableHeader>예매번호</TableHeader>
          <TableHeader>예매좌석</TableHeader>
          <TableHeader>결제금액</TableHeader>
          <TableHeader>결제상태</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow
            key={booking.bookingId}
            className="hover:bg-zinc-50 transition-colors duration-150"
          >
            <TableCell>
              <Text className="font-medium">{booking.userName}</Text>
            </TableCell>
            <TableCell>
              <Text className="font-medium">#{booking.bookingId.toString().padStart(4, "0")}</Text>
            </TableCell>
            <TableCell>
              <div>
                <Text className="font-medium">{booking.seat.className}</Text>
                <Text className="text-sm text-zinc-500">
                  {`${booking.seat.floor} ${booking.seat.row} ${booking.seat.col}`
                    .split(" ")
                    .map((part: string, index: number) => {
                      if (index === 0) return `${part}층`
                      if (index === 1) return `${part}열`
                      if (index === 2) return `${part}석`
                      return part
                    })
                    .join(" ")}
                </Text>
              </div>
            </TableCell>
            <TableCell>
              <Text className="font-semibold">
                {formatCurrency(
                  typeof booking.totalPrice === "string"
                    ? parseInt(booking.totalPrice)
                    : booking.totalPrice
                )}
              </Text>
            </TableCell>
            <TableCell>{getPaymentStatusBadge(booking.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default BookingsTable
