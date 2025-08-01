import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
  // 세션스토리지에서 사용자 정보 확인
  const user = sessionStorage.getItem("user")

  if (!user) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
