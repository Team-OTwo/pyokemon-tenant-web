import React from "react"

import { Button } from "./button"
import { Text } from "./text"

interface SimplePaginationProps {
  current: number
  total: number
  pageSize: number
  onChange: (page: number) => void
  showSizeChanger?: boolean
}

export function SimplePagination({
  current,
  total,
  pageSize,
  onChange,
  showSizeChanger = false,
}: SimplePaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  if (totalPages <= 1) {
    return null
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page)
    }
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          plain
          className={`min-w-9 ${
            i === current
              ? "before:absolute before:-inset-px before:rounded-lg before:bg-zinc-950/5 dark:before:bg-white/10"
              : ""
          }`}
          aria-current={i === current ? "page" : undefined}
        >
          <span className="-mx-0.5">{i}</span>
        </Button>
      )
    }

    return pages
  }

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Page navigation">
      <Button
        onClick={() => handlePageChange(current - 1)}
        disabled={current === 1}
        plain
        aria-label="Previous page"
      >
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Previous
      </Button>

      <div className="flex items-baseline gap-2">{renderPageNumbers()}</div>

      <Button
        onClick={() => handlePageChange(current + 1)}
        disabled={current === totalPages}
        plain
        aria-label="Next page"
      >
        Next
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      <Text className="text-sm text-zinc-500 ml-4">
        Page {current} of {totalPages}
      </Text>
    </nav>
  )
}
