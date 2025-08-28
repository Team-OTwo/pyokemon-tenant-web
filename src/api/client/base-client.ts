import axios, { AxiosError } from "axios"

const baseClient = axios.create({})

baseClient.interceptors.request.use(
  (config) => {
    // accessToken을 localStorage에서 가져와서 Authorization 헤더 설정
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    // accountId를 localStorage에서 가져와서 x-auth-accountId 헤더 설정
    const accountId = localStorage.getItem("accountId")
    if (accountId) {
      config.headers["x-auth-accountId"] = accountId
    }

    return config
  },
  (error) => {}
)

baseClient.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    if (error instanceof AxiosError) {
      console.error(error)
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
