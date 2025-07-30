import { createBrowserRouter } from "react-router-dom"

import AdminProtectedRoute from "./components/admin-protected-route"
import ProtectedRoute from "./components/protected-route"
import EventRegisterPage from "./pages/event-register-page"
import LoginPage from "./pages/login-page"
import MainContainerLayout from "./pages/main-layout"
import MainPage from "./pages/main-page"
import RootLayout from "./pages/root-layout"
import SchedulesRegisterPage from "./pages/schedules-register-page"

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        Component: MainContainerLayout,
        children: [
          {
            Component: ProtectedRoute,
            children: [
              {
                path: "main",
                Component: MainPage,
              },
              {
                path: "event-register",
                Component: EventRegisterPage,
              },
              {
                path: "schedules-register",
                Component: SchedulesRegisterPage,
              },
            ],
          },
          {
            path: "login",
            Component: LoginPage,
          },
        ],
      },
      {
        Component: MainContainerLayout,
        children: [
          {
            Component: ProtectedRoute,
            children: [
              {
                path: "admin",
                Component: AdminProtectedRoute,
                children: [
                  {
                    index: true,
                    element: <div>어드민 페이지</div>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>Catch All Route</div>,
  },
])

export default router
