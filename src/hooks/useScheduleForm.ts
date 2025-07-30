import React, { useState } from "react"

import { ScheduleFormData } from "@/types/schedule"

// React Calendar의 Value 타입을 직접 정의
type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export const useScheduleForm = () => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTicketCalendar, setShowTicketCalendar] = useState(false)
  const [scheduleForm, setScheduleForm] = useState<ScheduleFormData>({
    date: null,
    ticketDate: null,
    eventStartTime: { hour: "", minute: "" },
    ticketStartTime: { hour: "", minute: "" },
  })

  const handleDateChange = (value: Value, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (value instanceof Date) {
      setScheduleForm((prev) => ({ ...prev, date: value }))
      setShowCalendar(false)
    }
  }

  const handleTicketDateChange = (value: Value, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (value instanceof Date) {
      setScheduleForm((prev) => ({ ...prev, ticketDate: value }))
      setShowTicketCalendar(false)
    }
  }

  const handleTimeChange = (
    type: "eventStartTime" | "ticketStartTime",
    field: "hour" | "minute",
    value: string
  ) => {
    setScheduleForm((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }))
  }

  return {
    scheduleForm,
    showCalendar,
    showTicketCalendar,
    setShowCalendar,
    setShowTicketCalendar,
    handleDateChange,
    handleTicketDateChange,
    handleTimeChange,
  }
}
