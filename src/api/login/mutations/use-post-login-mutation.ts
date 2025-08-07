import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { LoginRequest } from "../../../types/login"
import { setAuthorizationHeader } from "../../client"
import { postLogin } from "../fetchers/post-login"

export const usePostLoginMutation = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (response) => {
      // 토큰과 accountId를 localStorage에 저장
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      localStorage.setItem("accountId", response.data.accountId.toString())

      // 인증 헤더 설정
      setAuthorizationHeader(response.data.accessToken)
      navigate("/main")
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })
}
