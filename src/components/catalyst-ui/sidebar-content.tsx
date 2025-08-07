import React from "react"
import { eventList } from "@/constants/event"
import { HomeIcon, Square2StackIcon, TicketIcon } from "@heroicons/react/20/solid"
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { isAfter, parseISO } from "date-fns"
import { useLocation, useNavigate } from "react-router-dom"

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

  // 날짜가 지나지 않은 이벤트 중에서 임박한 순으로 5개 정렬
  const upcomingEvents = eventList
    .filter((event) => {
      const eventDate = parseISO(event.eventDate)
      return isAfter(eventDate, new Date())
    })
    .sort((a, b) => {
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
          {upcomingEvents.map((event) => (
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
          ))}
        </SidebarSection>

        <SidebarSpacer />

        <SidebarSection>
          <SidebarItem href="/login">
            <ArrowRightStartOnRectangleIcon data-slot="icon" />
            <SidebarLabel>Log out</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}
