import React from "react"

interface DashboardBoardProps {
  children: React.ReactNode
  width?: string
}

const Dashboard: React.FC<DashboardBoardProps> = ({ children, width = "w-[935px]" }) => {
  return (
    <div
      className={`${width} min-h-[670px] rounded-[12px] mt-[28px] mb-[28px] border border-gray-300 bg-white shadow-lg px-[32px] py-[23px] box-border`}
    >
      {children}
    </div>
  )
}

export default Dashboard
