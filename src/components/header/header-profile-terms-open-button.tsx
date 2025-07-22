import { useState } from "react"

import Button from "@/components/ui/button"
import TermsOfUseDialog from "@/components/terms-of-use-dialog"

function HeaderProfileTermsOpenButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="text" fullWidth onClick={() => setOpen(true)}>
        이용 약관
      </Button>
      <TermsOfUseDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default HeaderProfileTermsOpenButton
