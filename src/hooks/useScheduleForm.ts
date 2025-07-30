import { useState } from "react"

import { ScheduleFormData } from "@/types/schedule"

export const useScheduleForm = () => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTicketCalendar, setShowTicketCalendar] = useState(false)
  const [scheduleForm, setScheduleForm] = useState<ScheduleFormData>({
    date: null,
    ticketDate: null,
    eventStartTime: { hour: "", minute: "" },
    ticketStartTime: { hour: "", minute: "" },
  })

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setScheduleForm((prev) => ({ ...prev, date: value }))
      setShowCalendar(false)
    }
  }

  const handleTicketDateChange = (value: Date | Date[]) => {
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
