import React from "react"

interface DashboardBoardProps {
  children: React.ReactNode
}

const Dashboard: React.FC<DashboardBoardProps> = ({ children }) => {
  return (
    <div className="w-[933px] min-h-[670px] rounded-[12px] mt-[28px] border border-gray-300 bg-white shadow-lg px-[32px] py-[23px] box-border">
      {children}
    </div>
  )
}

export default Dashboard
