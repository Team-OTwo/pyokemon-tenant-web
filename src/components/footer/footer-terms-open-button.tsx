import { useState } from "react"
import { ButtonBase } from "@mui/material"

import { color } from "@/styles/design-tokens"

function FooterTermsOpenButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ButtonBase
        onClick={() => setOpen(true)}
        sx={{
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "24px",
          color: color.gray[8],
        }}
      >
        이용약관
      </ButtonBase>
    </>
  )
}

export default FooterTermsOpenButton
