export interface User {
  id: number
  username: string
  password: string
}

export const mockUsers: User[] = [
  {
    id: 1,
    username: "test",
    password: "test123",
  },
]

// 로그인 검증 함수
export const validateLogin = (username: string, password: string): User | null => {
  const user = mockUsers.find((user) => user.username === username && user.password === password)
  return user || null
}
