import { create } from "zustand"

import { initialScheduleFormData, ScheduleFormData } from "@/types/schedule"

interface ScheduleFormStore {
  scheduleFormData: ScheduleFormData
  setScheduleFormData: (data: ScheduleFormData) => void
  resetScheduleFormData: () => void
}

export const useScheduleFormStore = create<ScheduleFormStore>((set) => ({
  scheduleFormData: initialScheduleFormData,
  setScheduleFormData: (data) => set({ scheduleFormData: data }),
  resetScheduleFormData: () => set({ scheduleFormData: initialScheduleFormData }),
}))
