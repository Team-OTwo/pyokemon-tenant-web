// 공연 등록 관련 모든 옵션들
export const ageLimit = [
  { label: "전체관람가", value: "전체관람가" },
  { label: "12세 이상", value: "12세 이상" },
  { label: "15세 이상", value: "15세 이상" },
  { label: "19세 이상", value: "19세 이상" },
]

// 등급 옵션
export const gradeOptions = [
  { label: "VIP", value: "VIP" },
  { label: "R", value: "R" },
  { label: "A", value: "A" },
  { label: "B", value: "B" },
]

// 장르 옵션
export const genreOptions = [
  { label: "콘서트", value: "콘서트" },
  { label: "뮤지컬", value: "뮤지컬" },
  { label: "클래식", value: "클래식" },
  { label: "전시회", value: "전시회" },
  { label: "연극", value: "연극" },
  { label: "스포츠", value: "스포츠" },
]

// 시간과 분 옵션
export const hourOptions = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}시`,
  value: i.toString().padStart(2, "0"),
}))

export const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
  label: `${i}분`,
  value: i.toString().padStart(2, "0"),
}))
