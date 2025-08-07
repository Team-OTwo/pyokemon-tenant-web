import { useState } from "react"
import { usePostLoginMutation } from "@/api/login/mutations/use-post-login-mutation"

import { AuthLayout } from "@/components/catalyst-ui/auth-layout"
import { Button } from "@/components/catalyst-ui/button"
import { Field, Label } from "@/components/catalyst-ui/fieldset"
import { Heading } from "@/components/catalyst-ui/heading"
import { Input } from "@/components/catalyst-ui/input"
import Logo from "@/assets/images/logo.svg"

function LoginPage() {
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")

  const loginMutation = usePostLoginMutation()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginId || !password) {
      alert("아이디와 비밀번호를 입력해주세요.")
      return
    }

    loginMutation.mutate({
      loginId,
      password,
    })
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
            name="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
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
        {loginMutation.isError && (
          <div className="text-red-600 text-sm text-center">
            로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "로그인 중..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
