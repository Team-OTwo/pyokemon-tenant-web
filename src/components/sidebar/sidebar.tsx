import React from "react"
import { IoBarChartOutline, IoCalendarOutline, IoHomeOutline, IoListOutline } from "react-icons/io5"

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const menuItems = [
    { icon: IoHomeOutline, label: "대시보드", active: true },
    { icon: IoCalendarOutline, label: "공연 정보 등록", active: false },
    { icon: IoListOutline, label: "공연 리스트 조회", active: false },
  ]

  return (
    <div className={`bg-white text-gray-500 w-265 min-h-screen mr-[31px] shadow-lg ${className}`}>
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <a
                key={index}
                href="#"
                className={`flex items-center space-x-3 px-4 py-16 ${
                  item.active
                    ? "bg-white text-primary border-l-4"
                    : "text-gray-500 hover:bg-gray-100 hover:text-primary "
                }`}
              >
                <Icon size={20} className="ml-[21px]" />
                <span className="font-medium text-xl ml-[6px]">{item.label}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
