import axios, { AxiosError } from "axios"

const baseClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

baseClient.interceptors.request.use(
  (config) => {
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
