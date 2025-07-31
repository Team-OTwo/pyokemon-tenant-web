import React from "react"
import { IoCalendarOutline, IoHomeOutline, IoListOutline } from "react-icons/io5"
import { useLocation, useNavigate } from "react-router-dom"

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    {
      icon: IoHomeOutline,
      label: "대시보드",
      path: "/main",
      active: location.pathname === "/main",
    },
    {
      icon: IoCalendarOutline,
      label: "공연 정보 등록",
      path: "/event-register",
      active:
        location.pathname === "/event-register" || location.pathname === "/schedules-register",
    },
    {
      icon: IoListOutline,
      label: "공연 리스트 조회",
      path: "/events",
      active: location.pathname === "/events",
    },
  ]

  return (
    <div className={`bg-white text-gray-500 w-265 min-h-screen mr-[31px] shadow-lg ${className}`}>
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-3 px-4 py-16 w-full ${
                  item.active
                    ? "bg-white text-primary border-l-4"
                    : "text-gray-500 hover:bg-gray-100 hover:text-primary"
                }`}
              >
                <Icon size={20} className="ml-[21px]" />
                <span className="font-medium text-[18px] ml-[6px]">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
