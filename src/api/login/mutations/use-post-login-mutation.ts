import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { setAccountId, setTokens } from "../../../utils/auth"
import { postLogin } from "../fetchers/post-login"

export const usePostLoginMutation = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (response) => {
      if (response.data.role !== "TENANT") {
        ;(
          window as typeof window & {
            showAuthNotification?: (
              message: string,
              type: "success" | "error" | "warning" | "info"
            ) => void
          }
        ).showAuthNotification?.("접근 권한이 없습니다.Tenant 계정으로 로그인해주세요.", "error")
        return
      }

      // 토큰 저장 및 인증 헤더 설정
      setTokens(response.data.accessToken, response.data.refreshToken)
      setAccountId(response.data.accountId)

      // 성공 알림 표시
      ;(
        window as typeof window & {
          showAuthNotification?: (
            message: string,
            type: "success" | "error" | "warning" | "info"
          ) => void
        }
      ).showAuthNotification?.("로그인에 성공했습니다.", "success")

      navigate("/main")
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })
}
