export interface Event {
  id: number
  name: string
  venue: string
  date: string
  status: "진행중" | "마감"
  bookingCount: number
}

export const mockEvents: Event[] = [
  {
    id: 1,
    name: "콘서트 IU",
    venue: "올림픽공원",
    date: "2025-07-18",
    status: "진행중",
    bookingCount: 356,
  },
  {
    id: 2,
    name: "연극 햄릿",
    venue: "예술의 전당",
    date: "2025-06-18",
    status: "마감",
    bookingCount: 156,
  },
  {
    id: 3,
    name: "뮤지컬 라이온킹",
    venue: "샤롯데씨어터",
    date: "2025-08-15",
    status: "진행중",
    bookingCount: 842,
  },
  {
    id: 4,
    name: "클래식 콘서트",
    venue: "세종문화회관",
    date: "2025-07-22",
    status: "진행중",
    bookingCount: 234,
  },
]
