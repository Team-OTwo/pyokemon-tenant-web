import React from "react"
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid"

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

import { Event } from "../../mock/dashboard-mock"
import { SkeletonMain } from "../skeleton"

interface EventsTableProps {
  events: Event[]
  loading: boolean
}

const EventsTable: React.FC<EventsTableProps> = ({ events, loading }) => {
  const getStatusBadge = (status: string) => {
    if (status === "진행중") {
      return <Badge color="green">{status}</Badge>
    }
    return <Badge color="amber">{status}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR")
  }

  if (loading) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>공연명</TableHeader>
            <TableHeader>공연장</TableHeader>
            <TableHeader>공연일</TableHeader>
            <TableHeader>상태</TableHeader>
            <TableHeader>예매수</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <SkeletonMain variant="text" width={140} height={20} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <SkeletonMain variant="text" width={16} height={16} />
                  <SkeletonMain variant="text" width={100} height={20} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <SkeletonMain variant="text" width={16} height={16} />
                  <SkeletonMain variant="text" width={80} height={20} />
                </div>
              </TableCell>
              <TableCell>
                <SkeletonMain variant="text" width={60} height={24} className="rounded-full" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <SkeletonMain variant="text" width={16} height={16} />
                  <SkeletonMain variant="text" width={50} height={20} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>공연명</TableHeader>
          <TableHeader>공연장</TableHeader>
          <TableHeader>공연일</TableHeader>
          <TableHeader>상태</TableHeader>
          <TableHeader>예매수</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>
              <Text className="font-medium">{event.name}</Text>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-zinc-500" />
                <Text>{event.venue}</Text>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-zinc-500" />
                <Text>{formatDate(event.date)}</Text>
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(event.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-zinc-500" />
                <Text className="font-semibold">{event.bookingCount.toLocaleString()}</Text>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {events.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
          <Text className="text-lg font-semibold text-zinc-900">등록된 공연이 없습니다.</Text>
          <Text className="text-zinc-500">새로운 공연을 등록해보세요.</Text>
        </div>
      )}
    </Table>
  )
}

export default EventsTable
