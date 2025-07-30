import React from "react"

interface ButtonProps {
  text: string
  border?: boolean
  small?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, border, small, onClick }) => {
  const baseStyle =
    "rounded-lg h-50 flex justify-center items-center cursor-pointer transition-colors "
  const widthStyle = small ? "w-150" : "w-320"
  const style = border
    ? "bg-white border-1 border-primary text-primary hover:bg-gray-100"
    : "bg-primary border-1 border-primary text-white hover:bg-[var(--color-primary-hover)]"
  return (
    <button className={`${baseStyle}${widthStyle} ${style}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
