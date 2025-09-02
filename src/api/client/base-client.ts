import { getRefreshToken, logout, setTokens } from "@/utils/auth"
import axios, { AxiosError, AxiosResponse } from "axios"

let isRefreshing = false
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }> =
  []

declare global {
  interface Window {
    showAuthNotification?: (message: string, type: "success" | "error" | "warning" | "info") => void
  }
}

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

const isTokenExpiringSoon = (token: string): boolean => {
  if (!token) return true

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000
    const timeUntilExpiry = payload.exp - currentTime
    return timeUntilExpiry < 300 // 5분 이내에 만료
  } catch {
    return true
  }
}

const refreshTokenIfNeeded = async (): Promise<void> => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    logout("expired")
    return
  }

  try {
    // 실제 refresh token API 호출
    const response = await axios.post("/account/api/refresh", {
      refreshToken: refreshToken,
    })

    const { accessToken, refreshToken: newRefreshToken } = response.data
    setTokens(accessToken, newRefreshToken)
  } catch (error) {
    logout("expired")
    throw error
  }
}

const baseClient = axios.create({})

baseClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      const isExpiringSoon = isTokenExpiringSoon(accessToken)
      if (isExpiringSoon && !isRefreshing) {
        try {
          await refreshTokenIfNeeded()
        } catch (error) {
          return Promise.reject(error)
        }
      }
      const currentToken = localStorage.getItem("accessToken")
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`
      }
    }

    const accountId = localStorage.getItem("accountId")
    if (accountId) {
      config.headers["x-auth-accountId"] = accountId
    }

    return config
  },
  (error) => Promise.reject(error)
)

baseClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return baseClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = getRefreshToken()
      if (!refreshToken) {
        logout("expired")
        return Promise.reject(error)
      }

      try {
        await refreshTokenIfNeeded()
        const currentToken = localStorage.getItem("accessToken")
        if (currentToken) {
          originalRequest.headers.Authorization = `Bearer ${currentToken}`
        }
        processQueue(null, currentToken)
        ;(
          window as typeof window & {
            showAuthNotification?: (
              message: string,
              type: "success" | "error" | "warning" | "info"
            ) => void
          }
        ).showAuthNotification?.("토큰이 갱신되었습니다.", "success")
        return baseClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        logout("expired")
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    if (error.response?.status === 403) {
      logout("unauthorized")
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export const setAuthorizationHeader = (token: string) => {
  baseClient.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const removeAuthorizationHeader = () => {
  delete baseClient.defaults.headers.common["Authorization"]
}

export default baseClient
