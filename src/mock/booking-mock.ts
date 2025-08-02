export interface BookingOrder {
  orderNumber: string
  purchaseDate: string
  customer: string
  amount: number
}

export const mockRecentOrders: BookingOrder[] = [
  {
    orderNumber: "3000",
    purchaseDate: "2024-05-09",
    customer: "Leslie Alexander",
    amount: 80000,
  },
  {
    orderNumber: "3003",
    purchaseDate: "2024-04-23",
    customer: "Lindsay Walton",
    amount: 80000,
  },
  {
    orderNumber: "3007",
    purchaseDate: "2024-04-06",
    customer: "Leonard Krasner",
    amount: 80000,
  },
  {
    orderNumber: "3008",
    purchaseDate: "2024-04-03",
    customer: "Floyd Miles",
    amount: 80000,
  },
  {
    orderNumber: "3011",
    purchaseDate: "2024-03-21",
    customer: "Emma Dorsey",
    amount: 80000,
  },
  {
    orderNumber: "3016",
    purchaseDate: "2024-02-28",
    customer: "Jeffrey Webb",
    amount: 80000,
  },
  {
    orderNumber: "3017",
    purchaseDate: "2024-02-23",
    customer: "Kathryn Murphy",
    amount: 80000,
  },
  {
    orderNumber: "3021",
    purchaseDate: "2024-02-05",
    customer: "Blake Reid",
    amount: 80000,
  },
]

export interface EventStats {
  totalRevenue: number
  revenueChange: number
  ticketsSold: number
  totalTickets: number
  ticketsChange: number
  pageviews: number
  pageviewsChange: number
}

export const mockEventStats: EventStats = {
  totalRevenue: 102552000,
  revenueChange: 3.2,
  ticketsSold: 350,
  totalTickets: 500,
  ticketsChange: 8.1,
  pageviews: 24300,
  pageviewsChange: -0.75,
}
