// 이벤트 상태 관련 상수
export const EVENT_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const

export const EVENT_STATUS_LABELS = {
  [EVENT_STATUS.PENDING]: "승인대기",
  [EVENT_STATUS.APPROVED]: "승인완료",
  [EVENT_STATUS.REJECTED]: "반려",
} as const

export const EVENT_STATUS_COLORS = {
  [EVENT_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
  [EVENT_STATUS.APPROVED]: "bg-green-100 text-green-800",
  [EVENT_STATUS.REJECTED]: "bg-red-100 text-red-800",
} as const

// 필터 옵션
export const STATUS_FILTER_OPTIONS = [
  { value: "ALL", label: "전체" },
  { value: EVENT_STATUS.APPROVED, label: "승인완료" },
  { value: EVENT_STATUS.PENDING, label: "승인대기" },
  { value: EVENT_STATUS.REJECTED, label: "반려" },
] as const

export const eventList = [
  {
    eventId: 2,
    title: "HEELO 2025 WORLD TOUR IN SEOUL",
    ageLimit: 9,
    venueName: "고척스카이돔",
    venueId: 2, // venueId 추가
    eventDate: "2025-08-23",
    ticketOpenAt: "2025-07-28 10:00",
    genre: "콘서트",
    description: "상세 설명입니다.",
    eventScheduleId: 1,
    thumbnailUrl: "https://ticketimage.interpark.com/Play/image/large/25/25009246_p.gif",
    status: "PENDING" as const,
    prices: [
      { priceId: 5, grade: "VIP", price: 198000 },
      { priceId: 6, grade: "R", price: 178000 },
      { priceId: 7, grade: "A", price: 148000 },
      { priceId: 8, grade: "B", price: 118000 },
    ],
  },
  {
    eventId: 3,
    title: "IU CONCERT 2025",
    ageLimit: 9,
    venueName: "올림픽공원",
    venueId: 3, // venueId 추가
    eventDate: "2025-08-23",
    ticketOpenAt: "2025-07-28 10:00",
    genre: "콘서트",
    description: "상세 설명입니다.",
    eventScheduleId: 1,
    thumbnailUrl: "https://ticketimage.interpark.com/Play/image/large/25/25009134_p.gif",
    status: "APPROVED" as const,
    prices: [
      { priceId: 9, grade: "VIP", price: 198000 },
      { priceId: 10, grade: "R", price: 178000 },
      { priceId: 11, grade: "A", price: 148000 },
      { priceId: 12, grade: "B", price: 118000 },
    ],
  },
  {
    eventId: 4,
    title: "BTS WORLD TOUR 2025",
    ageLimit: 9,
    venueName: "고양 스타디움",
    venueId: 1, // venueId 추가
    eventDate: "2025-08-10",
    ticketOpenAt: "2025-07-28 10:00",
    genre: "콘서트",
    description: "상세 설명입니다.",
    eventScheduleId: 1,
    thumbnailUrl: "https://ticketimage.interpark.com/Play/image/large/25/25009134_p.gif",
    status: "PENDING" as const,
    prices: [
      { priceId: 13, grade: "VIP", price: 198000 },
      { priceId: 14, grade: "R", price: 178000 },
      { priceId: 15, grade: "A", price: 148000 },
      { priceId: 16, grade: "B", price: 118000 },
    ],
  },
  {
    eventId: 5,
    title: "BLACKPINK WORLD TOUR",
    ageLimit: 9,
    venueName: "고양 스타디움",
    venueId: 1, // venueId 추가
    eventDate: "2025-08-11",
    ticketOpenAt: "2025-07-28 10:00",
    genre: "콘서트",
    description: "상세 설명입니다.",
    eventScheduleId: 1,
    thumbnailUrl: "https://ticketimage.interpark.com/Play/image/large/25/25008170_p.gif",
    status: "REJECTED" as const,
    prices: [
      { priceId: 17, grade: "VIP", price: 198000 },
      { priceId: 18, grade: "R", price: 178000 },
      { priceId: 19, grade: "A", price: 148000 },
      { priceId: 20, grade: "B", price: 118000 },
    ],
  },
  {
    eventId: 6,
    title: "NEWJEANS CONCERT",
    ageLimit: 9,
    venueName: "고양 스타디움",
    venueId: 1, // venueId 추가
    eventDate: "2025-08-12",
    ticketOpenAt: "2025-07-28 10:00",
    genre: "콘서트",
    description: "상세 설명입니다.",
    eventScheduleId: 1,
    thumbnailUrl: "https://ticketimage.interpark.com/Play/image/large/25/25009134_p.gif",
    status: "APPROVED" as const,
    prices: [
      { priceId: 21, grade: "VIP", price: 198000 },
      { priceId: 22, grade: "R", price: 178000 },
      { priceId: 23, grade: "A", price: 148000 },
      { priceId: 24, grade: "B", price: 118000 },
    ],
  },
  {
    eventId: 7,
    title: "LE SSERAFIM CONCERT",
    ageLimit: 9,
    venueName: "고양 스타디움",
    venueId: 1, // venueId 추가
    eventDate: "2025-08-13",
    ticketOpenAt: "2025-07-28 10:00",
    genre: "콘서트",
    description: "상세 설명입니다.",
    eventScheduleId: 1,
    thumbnailUrl: "https://ticketimage.interpark.com/Play/image/large/25/25009134_p.gif",
    status: "PENDING" as const,
    prices: [
      { priceId: 25, grade: "VIP", price: 198000 },
      { priceId: 26, grade: "R", price: 178000 },
      { priceId: 27, grade: "A", price: 148000 },
      { priceId: 28, grade: "B", price: 118000 },
    ],
  },
]

export const event = {
  eventId: 1,
  title: "HEELO 2025 WORLD TOUR IN GOYANG",
  ageLimit: 9,
  venueName: "고양 스타디움",
  venueId: 1, // venueId 추가
  eventDate: "2025-08-14",
  ticketOpenAt: "2025-07-28 10:00",
  genre: "콘서트",
  thumbnailUrl: "https://ticketimage.interpark.com/Play/image/large/25/25009134_p.gif",
  description: "상세 설명입니다.",
  eventScheduleId: 1,
  status: "APPROVED" as const,
  prices: [
    { priceId: 1, grade: "VIP", price: 198000 },
    { priceId: 2, grade: "R", price: 178000 },
    { priceId: 3, grade: "A", price: 148000 },
    { priceId: 4, grade: "B", price: 118000 },
  ],
}
