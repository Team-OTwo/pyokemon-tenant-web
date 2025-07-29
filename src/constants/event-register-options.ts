export interface PriceGrade {
  grade: string
  price: string
}

export const ageLimit = [
  { label: "전체관람가", value: "전체관람가" },
  { label: "12세 이상", value: "12세 이상" },
  { label: "15세 이상", value: "15세 이상" },
  { label: "19세 이상", value: "19세 이상" },
]

export const gradeOptions = [
  { label: "VIP", value: "VIP" },
  { label: "R", value: "R" },
  { label: "S", value: "S" },
  { label: "A", value: "A" },
]
