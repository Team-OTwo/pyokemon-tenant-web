import { Box, Typography } from "@mui/material"
import { Link, useSearchParams } from "react-router"

import { color, zIndex } from "@/styles/design-tokens"

import logo from "../../assets/images/logo.svg"

function Header() {
  return (
    <div className="flex bg-black h-100 w-full text-white items-center justify-between px-60">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="h-50" />
        </Link>
        <span className="ml-30 text-[24px] font-bold text-primary">Ticket manager</span>
      </div>
    </div>
  )
}

export default Header
