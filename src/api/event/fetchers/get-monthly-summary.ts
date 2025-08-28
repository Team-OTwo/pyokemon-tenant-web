import { MonthlySummary } from "../../../types/event"
import { client } from "../../client"

export const getMonthlySummary = async (year: number, month: number): Promise<MonthlySummary> => {
  const response = await client.get(
    `/bff/api/events/tenant/monthly-summary?year=${year}&month=${month}`
  )
  return response.data.data // API 응답 구조에 맞게 수정
}
