import React, { useEffect, useState } from "react"
import { getTenantSchedules } from "@/api/event-register-api"
import { clearAuth, getAccountId } from "@/utils/auth"
import { HomeIcon, Square2StackIcon, TicketIcon } from "@heroicons/react/20/solid"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { isAfter, parseISO, startOfDay } from "date-fns"
import { useLocation, useNavigate } from "react-router-dom"

import { EventType } from "@/types/event"
import Logo from "@/assets/images/logo.svg"

import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "./sidebar"
import { Text } from "./text"

interface SidebarContentProps {
  className?: string
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ className = "" }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)

  // 로그아웃할 때 인증 정보 삭제
  const handleLogout = () => {
    clearAuth()
    navigate("/login", { replace: true })
  }

  // 테넌트별 이벤트 데이터 가져오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const accountId = getAccountId()
        const eventsData = await getTenantSchedules(accountId)
        setEvents(eventsData)
      } catch (error) {
        console.error("이벤트 데이터 가져오기 실패:", error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const menuItems = [
    {
      icon: HomeIcon,
      label: "대시보드",
      path: "/main",
      current: location.pathname === "/main",
    },
    {
      icon: Square2StackIcon,
      label: "공연 리스트 조회",
      path: "/events",
      current: location.pathname === "/events" || location.pathname.startsWith("/events/"),
    },

    {
      icon: TicketIcon,
      label: "예매 현황",
      path: "/bookinglist",
      current:
        location.pathname === "/bookinglist" || location.pathname.startsWith("/bookinglist/"),
    },
  ]

  // 날짜가 지나지 않은 이벤트 중에서 임박한 순으로 최대 5개 표시.
  const upcomingEvents = events
    .filter((event: EventType) => {
      const eventDate = parseISO(event.eventDate)
      const today = startOfDay(new Date())
      return isAfter(eventDate, today) && event.status === "APPROVED"
    })
    .sort((a: EventType, b: EventType) => {
      const dateA = parseISO(a.eventDate)
      const dateB = parseISO(b.eventDate)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 5)

  const formatEventDate = (dateString: string) => {
    const date = parseISO(dateString)
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Sidebar className={`w-64 bg-zinc-100 ${className}`}>
      <SidebarHeader>
        <div className="flex items-center justify-center">
          <img
            src={Logo}
            alt="logo"
            className="h-6 w-1/2 cursor-pointer"
            onClick={() => navigate("/main")}
          />
        </div>
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection>
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <SidebarItem
                key={index}
                href={item.path}
                current={item.current}
                onClick={() => navigate(item.path)}
              >
                <Icon data-slot="icon" />
                <SidebarLabel>{item.label}</SidebarLabel>
              </SidebarItem>
            )
          })}
        </SidebarSection>

        <SidebarSection>
          <SidebarHeading className="text-xs">Upcoming Events</SidebarHeading>
          {loading ? (
            <div className="px-2 py-1">
              <Text className="text-xs text-zinc-500">로딩 중...</Text>
            </div>
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map((event: EventType) => (
              <SidebarItem
                key={event.eventId}
                href={`/events/${event.eventId}`}
                onClick={() => navigate(`/events/${event.eventId}`)}
                className="px-0.5 py-0.5"
              >
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <Text className="text-[10px] font-medium text-zinc-900 dark:text-white truncate w-full">
                    {event.title}
                  </Text>
                  <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatEventDate(event.eventDate)}
                  </Text>
                </div>
              </SidebarItem>
            ))
          ) : (
            <div className="px-2 py-1">
              <Text className="text-xs text-zinc-500">예정된 공연이 없습니다</Text>
            </div>
          )}
        </SidebarSection>

        <SidebarSpacer />

        <SidebarSection>
          <SidebarItem onClick={handleLogout}>
            <ArrowRightStartOnRectangleIcon data-slot="icon" />
            <SidebarLabel>Log out</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}
