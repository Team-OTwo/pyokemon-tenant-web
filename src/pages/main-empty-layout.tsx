import { Box } from "@mui/material"
import { Outlet } from "react-router"

function MainEmptyLayout() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Outlet />
    </Box>
  )
}

export default MainEmptyLayout
