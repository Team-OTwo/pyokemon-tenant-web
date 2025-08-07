export interface LoginRequest {
  loginId: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    refreshToken: string
    role: string
    accountId: number
  }
  errorCode: string | null
}

export interface VerifyResponse {
  accessToken: string
  refreshToken: string
  isVerified: boolean
}
