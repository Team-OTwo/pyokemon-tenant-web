import React, { useMemo, useState } from "react"
import { eventList } from "@/constants/event"
import { getFilteredEvents } from "@/utils/search"

import { EventType } from "@/types/event"
import Badge from "@/components/ui/badge"
import SearchBox from "@/components/ui/search/search-box"
import Dashboard from "@/components/dashboard/dashboard"
import Sidebar from "@/components/sidebar/sidebar"

import EventCard from "./_components/event-card"

const EventsPage = () => {
  const status = ["전체", "진행 완료", "진행중"]
  const [activeStatus, setActiveStatus] = useState(0)
  const [searchValue, setSearchValue] = useState("")

  // 검색과 상태 필터링을 모두 적용
  const finalEvents = useMemo(() => {
    return getFilteredEvents(eventList, searchValue, activeStatus)
  }, [searchValue, activeStatus])

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white">
        <div>
          <Dashboard>
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">공연 리스트 조회</h1>
              <SearchBox
                placeholder="공연명을 검색하세요"
                value={searchValue}
                onChange={setSearchValue}
                className="w-300"
              />
            </div>

            <div className="py-24 flex justify-end gap-8">
              {status.map((s, i) => {
                return (
                  <div key={i} onClick={() => setActiveStatus(i)}>
                    <Badge
                      text={s}
                      textColor={i === activeStatus ? "white" : undefined}
                      bgColor={i === activeStatus ? "#FFD800" : undefined}
                      borderColor={i === activeStatus ? "#FFD800" : undefined}
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col gap-16">
              {finalEvents.length > 0 ? (
                finalEvents.map((event: EventType, index: number) => {
                  return <EventCard event={event} key={`${event.eventId}-${index}`} />
                })
              ) : (
                <div className="text-center py-40 text-gray-500">
                  {searchValue ? "검색 결과가 없습니다." : "표시할 공연이 없습니다."}
                </div>
              )}
            </div>
          </Dashboard>
        </div>
      </main>
    </div>
  )
}

export default EventsPage
