import React, { useState } from "react"

import Button from "@/components/ui/button"

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = async () => {
    setIsLoading(true)

    // 로그인 test
    setTimeout(() => {
      if (formData.username && formData.password) {
        console.log("로그인 성공:", {
          username: formData.username,
          role: "admin",
          loginTime: new Date().toISOString(),
        })
      } else {
        console.log("로그인 실패: 아이디와 비밀번호를 입력하세요.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden pb-[180px]">
      {/* 로그인 컨테이너 */}
      <div className="w-399 h-478 left-1/2 top-115 -translate-x-1/2 absolute bg-white rounded-xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] border border-radius 12 border-gray-300 p-[34px_40px] flex flex-col">
        <div className="text-center w-full text-black text-xl font-bold">티켓 매니저 로그인</div>

        <div className="text-center w-full mt-12 text-gray-500 text-sm font-normal">
          Pyokemon 플랫폼 관리자 페이지
        </div>

        <div className="mt-12 mb-2 text-black text-base font-medium pl-8">ID</div>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="아이디"
          className="w-full h-[50px] px-15 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
        />

        <div className="mt-6">
          <div className="mt-12 mb-2 text-black text-base font-medium pl-8">PW</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="패스워드"
            className="w-full h-[50px] px-15 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
          />
        </div>

        <div className="text-right mt-5 mb-40 text-gray-700 text-sm cursor-pointer underline">
          비밀번호 재설정
        </div>

        <Button text={isLoading ? "로그인 중..." : "로그인"} onClick={handleLogin} />

        <div className="text-center mt-30 text-gray-500 text-sm font-normal">
          관리자 승인이 필요한 계정입니다
        </div>
      </div>
    </div>
  )
}

export default LoginPage
