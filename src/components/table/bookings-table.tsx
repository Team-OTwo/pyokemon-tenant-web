import React from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

import { BookingDisplay } from "@/types/booking"
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
  bookings: BookingDisplay[]
  loading: boolean
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings, loading }) => {
  const getPaymentStatusBadge = (status: BookingDisplay["paymentStatus"]) => {
    switch (status) {
      case "결제완료":
        return <Badge color="green">결제완료</Badge>
      case "결제대기":
        return <Badge color="amber">결제대기</Badge>
      case "환불됨":
        return <Badge color="red">환불됨</Badge>
      default:
        return <Badge color="zinc">{status}</Badge>
    }
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
            <TableHeader>공연</TableHeader>
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
                <div className="flex items-center gap-3">
                  <SkeletonMain variant="rectangular" width={40} height={40} className="rounded" />
                  <div>
                    <SkeletonMain variant="text" width={150} height={20} />
                    <SkeletonMain variant="text" width={100} height={16} />
                  </div>
                </div>
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
          <TableHeader>공연</TableHeader>
          <TableHeader>예매좌석</TableHeader>
          <TableHeader>결제금액</TableHeader>
          <TableHeader>결제상태</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id} href={`/bookings/${booking.id}`}>
            <TableCell>
              <Text className="font-medium">{booking.customer}</Text>
            </TableCell>
            <TableCell>
              <Text className="font-medium">{booking.orderNumber}</Text>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <img
                  src={booking.event.thumbnailUrl}
                  alt={booking.event.name}
                  className="h-10 w-10 rounded object-cover"
                />
                <div>
                  <Text className="font-medium">{booking.event.name}</Text>
                  <Text className="text-sm text-zinc-500">{formatDate(booking.eventDate)}</Text>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <Text className="font-medium">{booking.seatClass}</Text>
                <Text className="text-sm text-zinc-500">{booking.seatInfo}</Text>
              </div>
            </TableCell>
            <TableCell>
              <Text className="font-semibold">{formatCurrency(booking.amount)}</Text>
            </TableCell>
            <TableCell>{getPaymentStatusBadge(booking.paymentStatus)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default BookingsTable
