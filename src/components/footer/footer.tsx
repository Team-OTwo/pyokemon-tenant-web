import React from "react"

interface FooterProps {
  style?: React.CSSProperties
}

function Footer({ style }: FooterProps) {
  return (
    <footer
      className="absolute left-0 right-0 bottom-0 py-50 bg-black text-center text-primary text-sm"
      style={style}
    >
      <div className="container mx-auto">
        <p>© 2025 Pyokemon. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
