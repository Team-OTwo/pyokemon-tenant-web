import { create } from "zustand"

import { EventFormData, initialEventFormData } from "@/types/event"

interface EventStore {
  eventFormData: EventFormData
  setEventFormData: (data: EventFormData) => void
  updateEventFormData: (updates: Partial<EventFormData>) => void
  resetEventFormData: () => void
}

export const useEventStore = create<EventStore>((set) => ({
  eventFormData: initialEventFormData,

  setEventFormData: (data) => set({ eventFormData: data }),

  updateEventFormData: (updates) =>
    set((state) => ({
      eventFormData: { ...state.eventFormData, ...updates },
    })),

  resetEventFormData: () => set({ eventFormData: initialEventFormData }),
}))
