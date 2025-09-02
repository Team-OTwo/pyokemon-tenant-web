import React, { createContext, ReactNode, useContext, useState } from "react"

interface NotificationContextType {
  showNotification: (message: string, type: "success" | "error" | "warning" | "info") => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<
    Array<{
      id: number
      message: string
      type: "success" | "error" | "warning" | "info"
    }>
  >([])

  const showNotification = (message: string, type: "success" | "error" | "warning" | "info") => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])

    // 5초 후 자동 제거
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }, 5000)
  }

  // 전역 함수로 알림 함수 노출
  React.useEffect(() => {
    ;(
      window as typeof window & {
        showAuthNotification?: (
          message: string,
          type: "success" | "error" | "warning" | "info"
        ) => void
      }
    ).showAuthNotification = showNotification

    return () => {
      delete (
        window as typeof window & {
          showAuthNotification?: (
            message: string,
            type: "success" | "error" | "warning" | "info"
          ) => void
        }
      ).showAuthNotification
    }
  }, [])

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border rounded-lg shadow-lg max-w-sm ${getNotificationStyles(notification.type)}`}
          >
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium">{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
