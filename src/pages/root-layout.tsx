import { ErrorBoundary } from "react-error-boundary"
import { Outlet } from "react-router-dom"

import { SidebarContent } from "@/components/catalyst-ui"
import { Navbar } from "@/components/catalyst-ui/navbar"
import { SidebarLayout } from "@/components/catalyst-ui/sidebar-layout"

import RootError from "./_error/root-error"

function RootLayout() {
  return (
    <ErrorBoundary FallbackComponent={RootError}>
      <SidebarLayout navbar={<Navbar />} sidebar={<SidebarContent />}>
        <Outlet />
      </SidebarLayout>
    </ErrorBoundary>
  )
}

export default RootLayout
