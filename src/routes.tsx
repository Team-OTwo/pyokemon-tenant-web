import { createBrowserRouter, Navigate } from "react-router-dom"

import AdminProtectedRoute from "./components/admin-protected-route"
import ProtectedRoute from "./components/protected-route"
import BookingsPage from "./pages/bookings-page"
import EventDetailPage from "./pages/event-detail-page"
import EventRegisterPage from "./pages/event-register-page"
import EventsPage from "./pages/events-page/events-page"
import LoginPage from "./pages/login-page"
import MainEmptyLayout from "./pages/main-empty-layout"
import MainGrayLayout from "./pages/main-gray-layout"
import MainContainerLayout from "./pages/main-layout"
import MainPage from "./pages/main-page"
import RootLayout from "./pages/root-layout"
import SchedulesRegisterPage from "./pages/schedules-register-page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        Component: MainEmptyLayout,
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
              {
                path: "bookings",
                Component: BookingsPage,
              },
              {
                path: "bookings/:eventId",
                Component: BookingsPage,
              },
            ],
          },
          {
            path: "main",
            Component: MainPage,
          },
          {
            path: "events",
            Component: EventsPage,
          },
          {
            path: "events/:eventId",
            Component: EventDetailPage,
          },
        ],
      },
      {
        Component: MainGrayLayout,
        children: [
          {
            Component: ProtectedRoute,
            children: [],
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
