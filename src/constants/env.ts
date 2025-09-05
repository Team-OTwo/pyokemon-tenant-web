type Environment = "local" | "dev"

const ENV: Environment = (import.meta.env.VITE_ENVIRONMENT as Environment) || "local"

// 게이트웨이 URL 상수
const GATEWAY_URL: Record<Environment, string> = {
  local: "http://localhost:8087",
  dev: "https://pyokemon.synology.me:8087",
}

// 각 서비스별 API URL은 게이트웨이 URL을 기반으로 구성
const EVENT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/event`,
  dev: `${GATEWAY_URL.dev}/event`,
}

const ACCOUNT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/account`,
  dev: `${GATEWAY_URL.dev}/account`,
}

const PAYMENT_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/payment`,
  dev: `${GATEWAY_URL.dev}/payment`,
}

const BOOKING_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/booking`,
  dev: `${GATEWAY_URL.dev}/booking`,
}

const BFF_API_URL: Record<Environment, string> = {
  local: `${GATEWAY_URL.local}/bff`,
  dev: `${GATEWAY_URL.dev}/bff`,
}

// 이미지 서버 URL (게이트웨이 도메인 + 8081 포트)
const IMAGE_SERVER_URL: Record<Environment, string> = {
  local: GATEWAY_URL.local.replace(":8087", ":8081"),
  dev: GATEWAY_URL.dev.replace(":8087", ":8081"),
}

// 함수로 API URL 가져오기 (다른 웹 프로젝트와 동일한 방식)
export const getGatewayUrl = () => GATEWAY_URL[ENV]
export const getEventApiUrl = () => EVENT_API_URL[ENV]
export const getAccountApiUrl = () => ACCOUNT_API_URL[ENV]
export const getPaymentApiUrl = () => PAYMENT_API_URL[ENV]
export const getBookingApiUrl = () => BOOKING_API_URL[ENV]
export const getBffApiUrl = () => BFF_API_URL[ENV]
export const getImageServerUrl = () => IMAGE_SERVER_URL[ENV]

// 현재 환경의 API URL들 (기존 호환성 유지)
export const CURRENT_EVENT_API_URL = EVENT_API_URL[ENV]
export const CURRENT_ACCOUNT_API_URL = ACCOUNT_API_URL[ENV]
export const CURRENT_PAYMENT_API_URL = PAYMENT_API_URL[ENV]
export const CURRENT_BOOKING_API_URL = BOOKING_API_URL[ENV]
export const CURRENT_BFF_API_URL = BFF_API_URL[ENV]

// 환경 정보
export const CURRENT_ENV = ENV
export const IS_LOCAL = ENV === "local"
export const IS_DEV = ENV === "dev"

// 디버깅용
console.log("현재 환경:", ENV)
console.log("API URLs:", {
  event: getEventApiUrl(),
  account: getAccountApiUrl(),
  payment: getPaymentApiUrl(),
  booking: getBookingApiUrl(),
  bff: getBffApiUrl(),
})
