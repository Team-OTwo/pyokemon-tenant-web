import React from "react"

import { BookingDisplay } from "@/types/booking"

import Badge from "../ui/badge"
import { SkeletonMain } from "../ui/skeleton"

interface BookingsTableProps {
  bookings: BookingDisplay[]
  loading: boolean
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings, loading }) => {
  const getPaymentStatusBadge = (status: BookingDisplay["paymentStatus"]) => {
    switch (status) {
      case "결제완료":
        return {
          text: status,
          bgColor: "rgba(68, 203, 143, 0.2)",
          borderColor: "#44CB8F",
          textColor: "#44CB8F",
        }
      case "결제대기":
        return {
          text: status,
          bgColor: "rgba(255, 207, 54, 0.2)",
          borderColor: "#FFD800",
          textColor: "#FFD800",
        }
      case "결제취소":
        return {
          text: status,
          bgColor: "rgba(255, 59, 48, 0.2)",
          borderColor: "#FF3B30",
          textColor: "#FF3B30",
        }
      default:
        return {
          text: status,
          bgColor: "rgba(255, 207, 54, 0.2)",
          borderColor: "#FFD800",
          textColor: "#FFD800",
        }
    }
  }

  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString()} 원`
  }

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                예매자
              </th>
              <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                예매PID
              </th>
              <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                예매좌석
              </th>
              <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                결제 금액
              </th>
              <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                결제 방식
              </th>
              <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
                결제 상태
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={80} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={120} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={100} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={100} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={80} />
                  </div>
                </td>
                <td className="px-6 py-15">
                  <div className="flex justify-center">
                    <SkeletonMain variant="text" width={80} height={32} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">예매자</th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">예매PID</th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
              예매좌석
            </th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
              결제 금액
            </th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
              결제 방식
            </th>
            <th className="px-6 py-[17px] text-center text-[16px] font-bold text-black">
              결제 상태
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bookings.map((booking) => {
            const statusBadge = getPaymentStatusBadge(booking.paymentStatus)
            return (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-15">
                  <div className="font-medium text-black text-center">{booking.purchaser}</div>
                </td>
                <td className="px-6 py-15">
                  <div className="text-gray-700 text-center">{booking.bookingPid}</div>
                </td>
                <td className="px-6 py-15 text-gray-700 text-center">{booking.seat}</td>
                <td className="px-6 py-15 text-center">
                  <div className="font-semibold text-black">{formatAmount(booking.amount)}</div>
                </td>
                <td className="px-6 py-15 text-gray-700 text-center">{booking.paymentMethod}</td>
                <td className="px-6 py-15 text-center">
                  <Badge
                    text={statusBadge.text}
                    bgColor={statusBadge.bgColor}
                    borderColor={statusBadge.borderColor}
                    textColor={statusBadge.textColor}
                    cursor="default"
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {bookings.length === 0 && (
        <div className="text-center py-12 mb-[30px]">
          <div className="mx-auto mt-[20px] mb-[15px] h-[24px] w-[24px] text-gray-400">📋</div>
          <h3 className="mt-2 text-[16px] font-bold text-black">예매 내역이 없습니다.</h3>
          <p className="mt-1 text-[16px] text-gray-500">예매 정보를 확인해보세요.</p>
        </div>
      )}
    </div>
  )
}

export default BookingsTable
