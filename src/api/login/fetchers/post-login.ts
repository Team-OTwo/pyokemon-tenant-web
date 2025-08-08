import { LoginRequest, LoginResponse } from "../../../types/login"
import { client } from "../../client"

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  // 로컬 환경에선 8080 포트
  const loginBaseURL = import.meta.env.DEV ? "http://localhost:8080" : client.defaults.baseURL

  const response = await client.post("/account/api/login", data, {
    baseURL: loginBaseURL,
  })

  return response.data
}
