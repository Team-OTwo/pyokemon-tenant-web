import React from "react"
import { IoSearchOutline } from "react-icons/io5"

interface SearchProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const SearchBox: React.FC<SearchProps> = ({
  placeholder = "검색어를 입력하세요",
  value = "",
  onChange,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange?.(newValue)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-40 px-16 pl-48 border border-gray-500 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <IoSearchOutline className="absolute left-16 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
      </div>
    </div>
  )
}

export default SearchBox
