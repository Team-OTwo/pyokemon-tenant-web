import React from "react"
import { event } from "@/constants/event"
import { format } from "date-fns"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

import Button from "@/components/ui/button"
import GenreBadge from "@/components/ui/genre-badge"
import Dashboard from "@/components/dashboard/dashboard"
import Sidebar from "@/components/sidebar/sidebar"

interface SeatPrice {
  seatGrade: string
  price: number
  remainingSeats?: number
}

const EvenDetailPage = () => {
  const navigation = useNavigate()
  const prices: SeatPrice[] = [
    { seatGrade: "VIP", price: 198000 },
    { seatGrade: "R", price: 178000 },
    { seatGrade: "A", price: 148000 },
    { seatGrade: "B", price: 0 },
  ]
  const handleGoBack = () => {
    navigation(-1)
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
                      .filter((price: SeatPrice) => price.price != 0)
                      .map((price: SeatPrice) => {
                        return (
                          <li key={price.seatGrade}>
                            {price.seatGrade}{" "}
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
            <Button text="수정" small border />
            <Button text="예매/결제 현황" small border />
          </div>
        </Dashboard>
      </div>
    </div>
  )
}

export default EvenDetailPage
