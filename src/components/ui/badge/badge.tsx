import React from "react"

interface BadgeProps {
  text: string
  textColor?: string
  bgColor?: string
  borderColor?: string
  cursor?: string
}

const Badge = ({
  text,
  textColor = "#A19F9A",
  bgColor = "white",
  borderColor = "#A19F9A",
  cursor = "pointer",
}: BadgeProps) => {
  return (
    <div
      className="py-4 px-16 rounded-full h-30 text-center text-sm border-1 justify-center items-center inline"
      style={{
        color: textColor,
        backgroundColor: bgColor,
        borderColor: borderColor,
        cursor: cursor,
      }}
    >
      {text}
    </div>
  )
}

export default Badge
