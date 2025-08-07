import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

import { getMonthlySummary } from "../fetchers/get-monthly-summary"

const generateQueryKey = (year: number, month: number) => [
  "api",
  "events",
  "monthly-summary",
  year,
  month,
]

export const useGetMonthlySummaryQuery = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 // getMonth()는 0부터 시작하므로 +1

  return useQuery({
    queryKey: generateQueryKey(year, month),
    queryFn: () => getMonthlySummary(year, month),
  })
}

useGetMonthlySummaryQuery.generateQueryKey = generateQueryKey
