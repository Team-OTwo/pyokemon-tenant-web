import { Box } from "@mui/material"

import Dashboard from "@/components/dashboard/dashboard"
import Footer from "@/components/footer"

function HomePage() {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ py: "20px", px: "40px", flex: 1 }}>
        <Dashboard />
      </Box>
      <Footer />
    </Box>
  )
}

export default HomePage
