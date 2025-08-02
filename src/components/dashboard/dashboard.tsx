import React from "react"

interface DashboardBoardProps {
  children: React.ReactNode
  width?: string
}

const Dashboard: React.FC<DashboardBoardProps> = ({ children }) => {
  return (
    <div className="min-h-670 bg-white box-border rounded-xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] border-1 border-gray-300 p-24 w-full ">
      {children}
    </div>
  )
}

export default Dashboard
