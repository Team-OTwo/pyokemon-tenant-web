import {
  Booking,
  BookingDisplay,
  BookingFilters,
  BookingListResponse,
  BookingSummary,
  BookingWithDetails,
  Event,
  EventSchedule,
  Payment,
  Seat,
  SeatClass,
  User,
  Venue,
} from "@/types/booking"

// Mock 데이터 생성
const mockUsers: User[] = [
  {
    userId: 1,
    accountId: 1,
    name: "가나다",
    phone: "010-1234-5678",
    birth: "1990-01-01",
    isVerified: true,
  },
  {
    userId: 2,
    accountId: 2,
    name: "라마바",
    phone: "010-2345-6789",
    birth: "1991-02-02",
    isVerified: true,
  },
  {
    userId: 3,
    accountId: 3,
    name: "사아자",
    phone: "010-3456-7890",
    birth: "1992-03-03",
    isVerified: true,
  },
  {
    userId: 4,
    accountId: 4,
    name: "차카타",
    phone: "010-4567-8901",
    birth: "1993-04-04",
    isVerified: true,
  },
  {
    userId: 5,
    accountId: 5,
    name: "파하가",
    phone: "010-5678-9012",
    birth: "1994-05-05",
    isVerified: true,
  },
  {
    userId: 6,
    accountId: 6,
    name: "김철수",
    phone: "010-6789-0123",
    birth: "1995-06-06",
    isVerified: true,
  },
  {
    userId: 7,
    accountId: 7,
    name: "이영희",
    phone: "010-7890-1234",
    birth: "1996-07-07",
    isVerified: true,
  },
  {
    userId: 8,
    accountId: 8,
    name: "박민수",
    phone: "010-8901-2345",
    birth: "1997-08-08",
    isVerified: true,
  },
  {
    userId: 9,
    accountId: 9,
    name: "정수진",
    phone: "010-9012-3456",
    birth: "1998-09-09",
    isVerified: true,
  },
  {
    userId: 10,
    accountId: 10,
    name: "한지민",
    phone: "010-0123-4567",
    birth: "1999-10-10",
    isVerified: true,
  },
]

const mockEvents: Event[] = [
  {
    id: 1,
    eventId: 1,
    title: "오아시스 내한",
    description: "오아시스 내한",
    totalSeatCount: 500,
    status: "ACTIVE",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    eventId: 2,
    title: "콜드플레이 내한",
    description: "콜드플레이 내한",
    totalSeatCount: 300,
    status: "ACTIVE",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    eventId: 3,
    title: "트래비스 스캇 내한",
    description: "트래비스 스캇 내한",
    totalSeatCount: 800,
    status: "ACTIVE",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: 4,
    eventId: 4,
    title: "오케스트라 앙상블",
    description: "소규모 앙상블의 정교하고 섬세한 연주",
    totalSeatCount: 200,
    status: "ACTIVE",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: 5,
    eventId: 5,
    title: "합창단 정기공연",
    description: "아름다운 하모니를 선보이는 합창 공연",
    totalSeatCount: 600,
    status: "ACTIVE",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
]

const mockVenues: Venue[] = [
  {
    venueId: 1,
    venueName: "서울예술의전당",
    address: "서울특별시 서초구 남부순환로 2406",
    city: "서울",
    state: "서초구",
    zipcode: "06579",
    country: "대한민국",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    venueId: 2,
    venueName: "예술의전당 IBK챔버홀",
    address: "서울특별시 서초구 남부순환로 2406",
    city: "서울",
    state: "서초구",
    zipcode: "06579",
    country: "대한민국",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    venueId: 3,
    venueName: "롯데콘서트홀",
    address: "서울특별시 송파구 올림픽로 240",
    city: "서울",
    state: "송파구",
    zipcode: "05564",
    country: "대한민국",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    venueId: 4,
    venueName: "세종문화회관",
    address: "서울특별시 종로구 세종로 175",
    city: "서울",
    state: "종로구",
    zipcode: "03141",
    country: "대한민국",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

const mockSeatClasses: SeatClass[] = [
  {
    seatClassId: 1,
    className: "VIP",
    seatCount: 50,
  },
  {
    seatClassId: 2,
    className: "R",
    seatCount: 100,
  },
  {
    seatClassId: 3,
    className: "A",
    seatCount: 150,
  },
  {
    seatClassId: 4,
    className: "B",
    seatCount: 200,
  },
]

const generateSeat = (seatClassId: number): Seat => {
  const floors = ["1층", "2층", "3층"]
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

  return {
    seatId: Math.floor(Math.random() * 1000) + 1,
    seatClassId,
    floor: floors[Math.floor(Math.random() * floors.length)],
    row: rows[Math.floor(Math.random() * rows.length)],
    column: columns[Math.floor(Math.random() * columns.length)],
    seatNumber: `${Math.floor(Math.random() * 100) + 1}번`,
    isAvailable: true,
  }
}

// 고정된 mock 데이터 생성
const generateMockBookings = (): BookingWithDetails[] => {
  const bookings: BookingWithDetails[] = []

  // 고정된 패턴으로 데이터 생성
  const patterns = [
    {
      userIndex: 0,
      eventIndex: 0,
      venueIndex: 0,
      seatClassIndex: 0,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "신용카드",
    },
    {
      userIndex: 1,
      eventIndex: 1,
      venueIndex: 1,
      seatClassIndex: 1,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "계좌이체",
    },
    {
      userIndex: 2,
      eventIndex: 2,
      venueIndex: 2,
      seatClassIndex: 2,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "신용카드",
    },
    {
      userIndex: 3,
      eventIndex: 0,
      venueIndex: 3,
      seatClassIndex: 3,
      status: "PENDING" as const,
      paymentStatus: "PENDING" as const,
      method: "신용카드",
    },
    {
      userIndex: 4,
      eventIndex: 1,
      venueIndex: 0,
      seatClassIndex: 0,
      status: "BOOKED" as const,
      paymentStatus: "REFUNDED" as const,
      method: "계좌이체",
    },
    {
      userIndex: 5,
      eventIndex: 2,
      venueIndex: 1,
      seatClassIndex: 1,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "신용카드",
    },
    {
      userIndex: 6,
      eventIndex: 3,
      venueIndex: 2,
      seatClassIndex: 2,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "계좌이체",
    },
    {
      userIndex: 7,
      eventIndex: 4,
      venueIndex: 3,
      seatClassIndex: 3,
      status: "PENDING" as const,
      paymentStatus: "PENDING" as const,
      method: "신용카드",
    },
    {
      userIndex: 8,
      eventIndex: 0,
      venueIndex: 0,
      seatClassIndex: 0,
      status: "BOOKED" as const,
      paymentStatus: "REFUNDED" as const,
      method: "계좌이체",
    },
    {
      userIndex: 9,
      eventIndex: 1,
      venueIndex: 1,
      seatClassIndex: 1,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "신용카드",
    },
    {
      userIndex: 0,
      eventIndex: 2,
      venueIndex: 2,
      seatClassIndex: 2,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "계좌이체",
    },
    {
      userIndex: 1,
      eventIndex: 3,
      venueIndex: 3,
      seatClassIndex: 3,
      status: "PENDING" as const,
      paymentStatus: "PENDING" as const,
      method: "신용카드",
    },
    {
      userIndex: 2,
      eventIndex: 4,
      venueIndex: 0,
      seatClassIndex: 0,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "계좌이체",
    },
    {
      userIndex: 3,
      eventIndex: 0,
      venueIndex: 1,
      seatClassIndex: 1,
      status: "BOOKED" as const,
      paymentStatus: "REFUNDED" as const,
      method: "신용카드",
    },
    {
      userIndex: 4,
      eventIndex: 1,
      venueIndex: 2,
      seatClassIndex: 2,
      status: "BOOKED" as const,
      paymentStatus: "COMPLETED" as const,
      method: "계좌이체",
    },
  ]

  for (let i = 1; i <= 15; i++) {
    const pattern = patterns[i - 1]
    const user = mockUsers[pattern.userIndex]
    const event = mockEvents[pattern.eventIndex]
    const venue = mockVenues[pattern.venueIndex]
    const seatClass = mockSeatClasses[pattern.seatClassIndex]
    const seat = generateSeat(seatClass.seatClassId)

    // 좌석 등급별 기본 가격 설정
    const basePrice =
      seatClass.className === "VIP"
        ? 150000
        : seatClass.className === "R"
          ? 100000
          : seatClass.className === "A"
            ? 80000
            : 60000

    // 고정된 날짜 계산 (현재 날짜 기준으로 일정한 간격)
    const daysOffset = (i - 1) * 2 // 2일씩 간격
    const eventDate = new Date()
    eventDate.setDate(eventDate.getDate() + daysOffset)

    const booking: BookingWithDetails = {
      booking: {
        bookingId: i,
        eventScheduleId: i,
        accountId: user.accountId,
        seatClassId: seatClass.seatClassId,
        paymentId: i,
        status: pattern.status,
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      payment: {
        paymentId: i,
        bookingId: i,
        eventScheduleId: i,
        totalPrice: basePrice + i * 1000, // 고정된 가격 증가
        method: pattern.method,
        status: pattern.paymentStatus,
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      eventSchedule: {
        eventScheduleId: i,
        eventId: event.id,
        eventDate: eventDate.toISOString().split("T")[0],
        eventTime: "19:30",
        ticketOpenAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        ticketCloseAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      event,
      venue,
      seatClass,
      seat,
      price: {
        priceId: i,
        eventScheduleId: i,
        seatClassId: seatClass.seatClassId,
        price: basePrice,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      account: {
        accountId: user.accountId,
        role: "USER",
        username: `user${user.userId}`,
        isActiveDeleted: "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      user,
    }

    bookings.push(booking)
  }

  return bookings
}

// Mock API 함수들
export const mockGetBookings = async (
  filters: BookingFilters = {}
): Promise<BookingListResponse> => {
  const allBookings = generateMockBookings()

  let filteredBookings = allBookings

  // 검색 필터링
  if (filters.search) {
    filteredBookings = filteredBookings.filter(
      (booking) =>
        booking.user.name.includes(filters.search!) ||
        booking.event.title.includes(filters.search!) ||
        booking.venue.venueName.includes(filters.search!)
    )
  }

  // 결제 상태 필터링
  if (filters.paymentStatus) {
    filteredBookings = filteredBookings.filter(
      (booking) => booking.payment.status === filters.paymentStatus
    )
  }

  // 날짜 필터링
  if (filters.dateFrom || filters.dateTo) {
    filteredBookings = filteredBookings.filter((booking) => {
      const eventDate = new Date(booking.eventSchedule.eventDate)
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null

      if (fromDate && eventDate < fromDate) return false
      if (toDate && eventDate > toDate) return false
      return true
    })
  }

  const page = filters.page || 1
  const pageSize = filters.pageSize || 10
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    bookings: filteredBookings.slice(startIndex, endIndex),
    total: filteredBookings.length,
    page,
    pageSize,
    totalPages: Math.ceil(filteredBookings.length / pageSize),
  }
}

export const mockGetBookingsByEvent = async (
  eventId: number,
  filters: BookingFilters = {}
): Promise<BookingListResponse> => {
  const allBookings = generateMockBookings().filter((booking) => booking.event.id === eventId)

  let filteredBookings = allBookings

  // 검색 필터링
  if (filters.search) {
    filteredBookings = filteredBookings.filter(
      (booking) =>
        booking.user.name.includes(filters.search!) ||
        booking.venue.venueName.includes(filters.search!)
    )
  }

  // 결제 상태 필터링
  if (filters.paymentStatus) {
    filteredBookings = filteredBookings.filter(
      (booking) => booking.payment.status === filters.paymentStatus
    )
  }

  const page = filters.page || 1
  const pageSize = filters.pageSize || 10
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    bookings: filteredBookings.slice(startIndex, endIndex),
    total: filteredBookings.length,
    page,
    pageSize,
    totalPages: Math.ceil(filteredBookings.length / pageSize),
  }
}

export const mockGetBookingSummary = async (): Promise<BookingSummary> => {
  const allBookings = generateMockBookings()

  const totalBookings = allBookings.length
  const totalRevenue = allBookings.reduce((sum, booking) => sum + booking.payment.totalPrice, 0)
  const completedPayments = allBookings.filter(
    (booking) => booking.payment.status === "COMPLETED"
  ).length
  const pendingPayments = allBookings.filter(
    (booking) => booking.payment.status === "PENDING"
  ).length
  const canceledBookings = allBookings.filter(
    (booking) => booking.booking.status === "CANCELED"
  ).length
  const averageTicketPrice = totalRevenue / totalBookings

  return {
    totalBookings,
    totalRevenue,
    completedPayments,
    pendingPayments,
    canceledBookings,
    averageTicketPrice,
  }
}

// BookingDisplay로 변환하는 함수
export const convertToBookingDisplay = (bookingWithDetails: BookingWithDetails): BookingDisplay => {
  const { booking, payment, event, eventSchedule, venue, seatClass, seat, user } =
    bookingWithDetails

  const getPaymentStatusDisplay = (status: string): "결제완료" | "결제대기" | "환불됨" => {
    switch (status) {
      case "COMPLETED":
        return "결제완료"
      case "PENDING":
        return "결제대기"
      case "REFUNDED":
        return "환불됨"
      default:
        return "결제대기"
    }
  }

  return {
    id: booking.bookingId.toString(),
    orderNumber: `BK${booking.bookingId.toString().padStart(6, "0")}`,
    purchaseDate: booking.createdAt,
    customer: user.name,
    event: {
      name: event.title,
      thumbnailUrl: event.id <= 3 ? `/src/mock/img/${event.id}.png` : "/placeholder.jpg",
    },
    amount: payment.totalPrice,
    paymentStatus: getPaymentStatusDisplay(payment.status),
    paymentMethod: payment.method,
    seatClass: seatClass.className,
    seatInfo: `${seat.floor} ${seat.seatNumber}`,
    venue: venue.venueName,
    eventDate: eventSchedule.eventDate,
  }
}
