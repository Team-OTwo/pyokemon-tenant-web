import React from "react"

const GenreBadge = ({ genre }: { genre: string }) => {
  return (
    <div className="py-4 px-16 rounded-full h-25 bg-primary/10 text-center text-sm text-primary border-1 border-primary  justify-center items-center inline">
      {genre}
    </div>
  )
}

export default GenreBadge
