import React, { useMemo, useState } from "react"
import { eventList, STATUS_FILTER_OPTIONS } from "@/constants/event"
import { searchEventsByTitle } from "@/utils/search"
import { PlusIcon } from "@heroicons/react/16/solid"
import { useNavigate } from "react-router-dom"

import { EventType } from "@/types/event"
import { Badge } from "@/components/catalyst-ui/badge"
import { Button } from "@/components/catalyst-ui/button"
import { Heading } from "@/components/catalyst-ui/heading"
import { Input } from "@/components/catalyst-ui/input"
import { Listbox, ListboxOption } from "@/components/catalyst-ui/listbox"
import { Text } from "@/components/catalyst-ui/text"

import EventCard from "./_components/event-card"

const EventsPage = () => {
  const [activeStatus, setActiveStatus] = useState("ALL")
  const [searchValue, setSearchValue] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const navigate = useNavigate()
  const sortOptions = [
    { value: "name", label: "이름순" },
    { value: "date", label: "날짜순" },
  ]

  // 검색과 상태 필터링을 모두 적용
  const finalEvents = useMemo(() => {
    let filteredEvents = eventList

    // 상태 필터링
    if (activeStatus !== "ALL") {
      filteredEvents = filteredEvents.filter((event) => event.status === activeStatus)
    }

    // 검색 필터링
    if (searchValue) {
      filteredEvents = searchEventsByTitle(filteredEvents, searchValue)
    }

    // 정렬
    if (sortBy === "name") {
      filteredEvents = [...filteredEvents].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "date") {
      filteredEvents = [...filteredEvents].sort(
        (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      )
    }

    return filteredEvents
  }, [searchValue, activeStatus, sortBy])

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div>
            <Heading level={1} className="text-2xl font-bold text-zinc-900">
              Events
            </Heading>
            <p className="text-sm text-zinc-500 mt-1">등록된 공연 목록을 확인하고 관리하세요</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
          <Input
            type="search"
            placeholder="Search events..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="!w-100"
          />

          <Listbox value={sortBy} onChange={setSortBy} placeholder="Sort by name" className="!w-36">
            {sortOptions.map((option) => (
              <ListboxOption key={option.value} value={option.value}>
                {option.label}
              </ListboxOption>
            ))}
          </Listbox>

          <Button
            color="dark/zinc"
            className="ml-auto cursor-pointer"
            onClick={() => navigate("/event-register")}
          >
            <PlusIcon data-slot="icon" />
            공연 등록
          </Button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 mb-6">
          {STATUS_FILTER_OPTIONS.map((option) => (
            <Badge
              key={option.value}
              color={activeStatus === option.value ? "zinc" : "zinc"}
              className={`cursor-pointer transition-colors duration-200 ${
                activeStatus === option.value
                  ? "!bg-black !text-white hover:!bg-gray-800"
                  : "hover:!bg-gray-100 hover:!text-gray-700"
              }`}
              onClick={() => setActiveStatus(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {finalEvents.length > 0 ? (
            finalEvents.map((event: EventType, index: number) => (
              <EventCard event={event} key={`${event.eventId}-${index}`} />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="text-zinc-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <Text className="text-zinc-500">
                {searchValue ? "검색 결과가 없습니다." : "표시할 공연이 없습니다."}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventsPage
