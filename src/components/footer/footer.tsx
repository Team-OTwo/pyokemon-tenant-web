import { Box, Container } from "@mui/material"

import { color } from "@/styles/design-tokens"

function Footer() {
  return (
    <Box sx={{ bgcolor: color.gray[2], py: "40px" }}>
      <Container maxWidth="lg"></Container>
    </Box>
  )
}

export default Footer
