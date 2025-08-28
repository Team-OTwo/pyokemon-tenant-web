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

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}
