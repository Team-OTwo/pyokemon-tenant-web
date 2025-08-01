import { Box, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

import { color, zIndex } from "@/styles/design-tokens"

import logo from "../../assets/images/logo.svg"

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className="flex bg-black h-100 w-full text-white items-center justify-between px-60">
      <div className="flex items-center">
        <Link to="/main">
          <img src={logo} alt="logo" className="h-50" />
        </Link>
        <span className="ml-30 text-[24px] font-bold text-primary">Ticket manager</span>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default Header
