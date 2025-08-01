import React from "react"
import { event } from "@/constants/event"
import { useScheduleFormStore } from "@/store/schedule-form-store"
import { convertEventToScheduleFormData } from "@/util/convertEventToScheduleFormData"
import { format } from "date-fns"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

import { EventFormData, EventType, PriceGrade } from "@/types/event"
import Button from "@/components/ui/button"
import GenreBadge from "@/components/ui/genre-badge"
import Dashboard from "@/components/dashboard/dashboard"
import Sidebar from "@/components/sidebar/sidebar"

const EvenDetailPage = () => {
  const navigate = useNavigate()
  const prices: PriceGrade[] = [
    { grade: "VIP", price: 198000 },
    { grade: "R", price: 178000 },
    { grade: "A", price: 148000 },
    { grade: "B", price: 0 },
  ]
  const handleGoBack = () => {
    navigate(-1)
  }

  function convertEventToFormData(event: EventType): EventFormData {
    return {
      title: event.title,
      venue: event.venueName,
      ageLimit: event.ageLimit.toString(),
      genre: event.genre,
      description: event.description,
      thumbnail: null, // 수정 시 파일은 사용자가 새로 업로드해야 함
      thumbnailPreview: event.thumbnailUrl || "", // 이미지 URL에서 미리보기
      priceGrades: prices || [], // null일 경우 []로 처리
    }
  }

  const handleEdit = () => {
    const scheduleData = convertEventToScheduleFormData(event)
    useScheduleFormStore.getState().setScheduleFormData(scheduleData)

    navigate("/event-register", {
      state: { mode: "edit", eventData: convertEventToFormData(event) },
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-32 w-full">
        <Dashboard>
          <div className="flex gap-12 items-center mb-16">
            <IoChevronBackOutline
              color="#686764"
              onClick={handleGoBack}
              className="cursor-pointer"
            />
            <h1 className="text-2xl font-bold">공연 상세 조회</h1>
          </div>
          <div>
            <div className="py-12">
              <GenreBadge genre={event.genre} />

              <h1 className="head2 pt-8">{event.title}</h1>
            </div>
          </div>

          {/* event */}
          {/* info */}
          <div className="flex gap-24 mb-36">
            <img
              src={event.thumbnailUrl}
              alt="thumbnail"
              width="320"
              height="420"
              className="rounded-lg object-cover"
            />
            <div className="flex gap-12">
              <ul className="w-90 flex flex-col gap-16">
                <li>장소</li>
                <li>일시</li>
                <li>연령</li>
                <li>등급 및 가격</li>
              </ul>

              <ul className="flex flex-col gap-16">
                <li>{event.venueName}</li>
                <li>{format(new Date(event.eventDate), "yyyy.MM.dd")}</li>
                <li>{event.ageLimit}세</li>
                <li>
                  <ul className="text-gray-700">
                    {prices
                      .filter((price: PriceGrade) => price.price != 0)
                      .map((price: PriceGrade) => {
                        return (
                          <li key={price.grade}>
                            {price.grade}{" "}
                            <span className="font-bold text-black">
                              {price.price.toLocaleString()}원
                            </span>
                          </li>
                        )
                      })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-16">
            <Button text="수정" small border onClick={handleEdit} />
            <Button
              text="예매/결제 현황"
              small
              border
              onClick={() => navigation(`/bookings/${event.eventId}`)}
            />

          </div>
        </Dashboard>
      </div>
    </div>
  )
}

export default EvenDetailPage
