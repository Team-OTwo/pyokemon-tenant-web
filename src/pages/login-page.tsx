import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthLayout } from "@/components/catalyst-ui/auth-layout"
import { Button } from "@/components/catalyst-ui/button"
import { Checkbox, CheckboxField } from "@/components/catalyst-ui/checkbox"
import { Field, Label } from "@/components/catalyst-ui/fieldset"
import { Heading } from "@/components/catalyst-ui/heading"
import { Input } from "@/components/catalyst-ui/input"
import { Strong, Text, TextLink } from "@/components/catalyst-ui/text"
import Logo from "@/assets/images/logo.svg"

function LoginPage() {
  const navigate = useNavigate()
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // 임시 로그인 검증
    if (id === "test" && password === "test123") {
      sessionStorage.setItem("user", JSON.stringify({ id, name: "Test User" }))
      navigate("/main")
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.")
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleLogin} className="grid w-full max-w-sm grid-cols-1 gap-8">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="logo" className="h-6" />
        </div>
        <Heading>Sign in to your account</Heading>
        <Field>
          <Label>ID</Label>
          <Input
            type="text"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </Field>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
