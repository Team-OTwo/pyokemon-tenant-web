import { Box } from "@mui/material"
import { ErrorBoundary } from "react-error-boundary"
import { Outlet } from "react-router"

import Header from "@/components/header"

import RootError from "./_error/root-error"

function RootLayout() {
  return (
    <ErrorBoundary FallbackComponent={RootError}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          minHeight: "100svh",
          minWidth: "var(--container-width)",
        }}
      >
        <Header />
        <Outlet />
      </Box>
    </ErrorBoundary>
  )
}

export default RootLayout
