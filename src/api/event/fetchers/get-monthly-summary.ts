import { MonthlySummary } from "../../../types/event"
import { bffClient } from "../../client"

export const getMonthlySummary = async (year: number, month: number): Promise<MonthlySummary> => {
  const response = await bffClient.get(`/api/events/tenant/monthly-summary`, {
    params: {
      year: year,
      month: month,
    },
  })
  return response.data.data // API 응답 구조에 맞게 수정
}
