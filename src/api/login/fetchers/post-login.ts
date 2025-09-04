import { LoginRequest, LoginResponse } from "../../../types/login"
import { accountClient } from "../../client"

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await accountClient.post("/api/login", data, {})
  return response.data
}
