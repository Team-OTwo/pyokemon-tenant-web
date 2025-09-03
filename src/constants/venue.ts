// 공연장 관련 상수
export const VENUE_OPTIONS = [
  { label: "올림픽공원", value: "올림픽공원" },
  { label: "잠실실내체육관", value: "잠실실내체육관" },
  { label: "고척스카이돔", value: "고척스카이돔" },
  { label: "KSPO DOME", value: "KSPO DOME" },
  { label: "고양 스타디움", value: "고양 스타디움" },
  { label: "서울월드컵경기장", value: "서울월드컵경기장" },
] as const

// 공연장 타입 정의
export type VenueValue = (typeof VENUE_OPTIONS)[number]["value"]

// 공연장 인터페이스
export interface VenueOption {
  label: string
  value: VenueValue
}
