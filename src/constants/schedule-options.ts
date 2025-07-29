// 시간과 분 옵션 생성
export const hourOptions = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}시`,
  value: i.toString().padStart(2, "0"),
}))

export const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
  label: `${i}분`,
  value: i.toString().padStart(2, "0"),
}))
