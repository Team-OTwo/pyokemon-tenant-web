import React from "react"
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid"
import { format, isAfter, isBefore, startOfDay } from "date-fns"

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

import { MonthlyEvent } from "../../types/event"
import { SkeletonMain } from "../skeleton"

interface EventsTableProps {
  events: MonthlyEvent[]
  loading: boolean
}

const EventsTable: React.FC<EventsTableProps> = ({ events, loading }) => {
  const getStatusBadge = (eventDate: string) => {
    const today = startOfDay(new Date())
    const eventDay = startOfDay(new Date(eventDate))

    if (isBefore(eventDay, today)) {
      return <Badge color="amber">마감</Badge>
    } else {
      return <Badge color="green">진행중</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "yyyy년 MM월 dd일")
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

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <CalendarIcon className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
          <Text className="text-lg font-semibold text-zinc-900">등록된 공연이 없습니다.</Text>
          <Text className="text-zinc-500">새로운 공연을 등록해보세요.</Text>
        </div>
      </div>
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
        {events.map((event, index) => (
          <TableRow key={index}>
            <TableCell>
              <Text className="font-medium">{event.title}</Text>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-zinc-500" />
                <Text>{event.venueName}</Text>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-zinc-500" />
                <Text>{formatDate(event.eventDate)}</Text>
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(event.eventDate)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-zinc-500" />
                <Text className="font-semibold">{event.ticketCount.toLocaleString()}</Text>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EventsTable
