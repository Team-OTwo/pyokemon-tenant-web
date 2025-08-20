import { MonthlySummary } from "../../../types/event"
import { getAccountId } from "../../../utils/auth"
import { client } from "../../client"

export const getMonthlySummary = async (year: number, month: number): Promise<MonthlySummary> => {
  const accountId = getAccountId()
  const response = await client.get(
    `/event/api/events/tenant/monthly-summary?account_id=${accountId}&year=${year}&month=${month}`
  )
  return response.data.data // API 응답 구조에 맞게 수정
}
