export interface PriceGrade {
  grade: string
  price: string
  genre: string
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

export const genreOptions = [
  { label: "콘서트", value: "콘서트" },
  { label: "뮤지컬", value: "뮤지컬" },
  { label: "클래식", value: "클래식" },
  { label: "행사", value: "행사" },
  { label: "연극", value: "연극" },
  { label: "스포츠", value: "스포츠" },
]
