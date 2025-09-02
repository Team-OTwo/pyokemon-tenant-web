import { removeAuthorizationHeader, setAuthorizationHeader } from "@/api/client"

export const initializeAuth = () => {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    setAuthorizationHeader(accessToken)
  }
}

export const clearAuth = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("accountId")
  removeAuthorizationHeader()
}

export const getAccountId = (): number => {
  const accountId = localStorage.getItem("accountId")
  return accountId ? parseInt(accountId) : 1
}

export const setAccountId = (accountId: number) => {
  localStorage.setItem("accountId", accountId.toString())
}

export const ACCESS_TOKEN_KEY = "accessToken"
export const REFRESH_TOKEN_KEY = "refreshToken"

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  setAuthorizationHeader(accessToken)
}

export function isTokenExpired(token: string): boolean {
  if (!token) return true

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch {
    return true
  }
}

export const logout = (reason?: "expired" | "unauthorized" | "manual") => {
  clearAuth()

  let message = "로그아웃 되었습니다."
  let type: "info" | "warning" = "info"

  switch (reason) {
    case "expired":
      message = "세션이 만료되어 로그아웃되었습니다. 다시 로그인해주세요."
      type = "warning"
      break
    case "unauthorized":
      message = "인증이 필요합니다. 다시 로그인해주세요."
      type = "warning"
      break
    case "manual":
    default:
      message = "로그아웃 되었습니다."
      type = "info"
      break
  }

  ;(
    window as typeof window & {
      showAuthNotification?: (
        message: string,
        type: "success" | "error" | "warning" | "info"
      ) => void
    }
  ).showAuthNotification?.(message, type)

  // React Router navigate 대신 window.location 사용 (현재 라우터 컨텍스트 밖에서 호출될 수 있음)
  setTimeout(() => {
    window.location.href = "/tenant/login"
  }, 1000) // 알림을 보여줄 시간 제공
}
