import React, { useState } from "react"
import { eventList } from "@/constants/event"

import Badge from "@/components/ui/badge"
import Dashboard from "@/components/dashboard/dashboard"
import Sidebar from "@/components/sidebar/sidebar"

import EventCard from "./_components/event-card"

const EventsPage = () => {
  const status = ["전체", "진행 완료", "진행중", "진행 취소"]
  const [activeStatus, setActiveStatus] = useState(0)

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-32 w-full">
        <Dashboard>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">공연 리스트 조회</h1>
            <div>공연 검색</div>
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
            {eventList.map((event) => {
              return <EventCard event={event} key={event.eventId} />
            })}
          </div>
        </Dashboard>
      </div>
    </div>
  )
}

export default EventsPage
