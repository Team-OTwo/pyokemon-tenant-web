import { Box } from "@mui/material"
import { Outlet } from "react-router"

function MainContainerLayout() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "var(--container-width)",
          mx: "auto",
          padding: "0 var(--body-spacing-left) 0 var(--body-spacing-right)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainContainerLayout
