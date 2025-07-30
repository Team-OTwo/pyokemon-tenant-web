export interface PriceGrade {
  grade: string
  price: string
  genre: string
}

export interface EventFormData {
  title: string
  venue: string
  ageLimit: string
  genre: string
  description: string
  thumbnail: File | null
  thumbnailPreview: string
  priceGrades: PriceGrade[]
}

// 초기 상태
export const initialEventFormData: EventFormData = {
  title: "",
  venue: "",
  ageLimit: "",
  genre: "",
  description: "",
  thumbnail: null,
  thumbnailPreview: "",
  priceGrades: [{ grade: "", price: "", genre: "" }],
}
