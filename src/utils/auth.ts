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
    const isExpired = payload.exp < currentTime

    if (isExpired) {
      console.log("토큰이 만료되었습니다. 만료 시간:", new Date(payload.exp * 1000))
    }

    return isExpired
  } catch (error) {
    console.error("토큰 파싱 오류:", error)
    return true
  }
}

// 토큰 정보 디버깅
export function getTokenInfo(token: string) {
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000
    const timeUntilExpiry = payload.exp - currentTime

    return {
      issuedAt: new Date(payload.iat * 1000),
      expiresAt: new Date(payload.exp * 1000),
      timeUntilExpiry: timeUntilExpiry,
      isExpired: timeUntilExpiry < 0,
      willExpireSoon: timeUntilExpiry < 600, // 10분 이내
    }
  } catch (error) {
    console.error("토큰 정보 파싱 오류:", error)
    return null
  }
}

// 브라우저 콘솔에서 토큰 상태 확인을 위한 전역 함수
declare global {
  interface Window {
    checkTokenStatus?: () => void
  }
}

if (typeof window !== "undefined") {
  window.checkTokenStatus = () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()

    console.log("=== 토큰 상태 확인 ===")
    console.log("Access Token 존재:", !!accessToken)
    console.log("Refresh Token 존재:", !!refreshToken)

    if (accessToken) {
      const accessTokenInfo = getTokenInfo(accessToken)
      console.log("Access Token 정보:", accessTokenInfo)
    }

    if (refreshToken) {
      const refreshTokenInfo = getTokenInfo(refreshToken)
      console.log("Refresh Token 정보:", refreshTokenInfo)
    }

    console.log("=====================")
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
