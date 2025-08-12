import { LoginRequest, LoginResponse } from "../../../types/login"
import { client } from "../../client"

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await client.post("/account/api/login", data, {
    headers: {
      "X-Auth-Role": "TENANT",
    },
  })

  return response.data
}
