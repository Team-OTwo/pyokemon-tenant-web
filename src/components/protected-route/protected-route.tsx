import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
  // localStorage에서 accessToken 확인
  const accessToken = localStorage.getItem("accessToken")

  if (!accessToken) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
