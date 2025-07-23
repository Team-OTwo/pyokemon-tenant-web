import { useState } from "react"

import Button from "@/components/ui/button"
import Input from "@/components/ui/input/input"
import Footer from "@/components/footer"
import Header from "@/components/header"

function LoginPage() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log("Login attempt with:", { id, password })
  }

  return (
    <div className="w-full min-h-screen relative bg-white pb-[180px]">
      {/* Header */}
      <Header />

      {/* 로그인 컨테이너 */}
      <div className="w-399 h-478 left-1/2 top-215 -translate-x-1/2 absolute bg-white rounded-xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] border border-radius 12 border-gray-300 p-[34px_40px] flex flex-col">
        <div className="text-center w-full text-black text-xl font-bold">티켓 매니저 로그인</div>

        <div className="text-center w-full mt-12 text-gray-500 text-sm font-normal">
          Pyokemon 플랫폼 관리자 페이지
        </div>

        <div className="mt-12 mb-2 text-black text-base font-medium pl-8">ID</div>
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          size="large"
          className="w-320 h-50 border border-gray-300 rounded-lg pl-16"
        />

        <div className="mt-6">
          <div className="mt-12 mb-2 text-black text-base font-medium pl-8">PW</div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="패스워드"
            size="large"
            className="w-320 h-50 border-radius 12 border-gray-300 rounded-lg pl-16"
          />
        </div>

        <div className="text-right mt-5 mb-5 text-gray-700 text-sm cursor-pointer underline">
          비밀번호 재설정
        </div>

        <Button
          onClick={handleLogin}
          style={{
            backgroundColor: "var(--color-primary)",
            border: "none",
            borderRadius: "12px",
            width: "320px",
            height: "50px",
            marginTop: "46px",
          }}
          fullWidth
        >
          로그인
        </Button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[644px] text-center text-gray-500 text-sm font-normal">
        관리자 승인이 필요한 계정입니다
      </div>

      {/* Footer */}
      <Footer style={{ top: "calc(215px + 478px + 140px)" }} />
    </div>
  )
}

export default LoginPage
