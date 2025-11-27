"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "code">("email")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate sending code
    setTimeout(() => {
      if (email) {
        setStep("code")
        setIsLoading(false)
      } else {
        setError("Por favor, insira um e-mail válido")
        setIsLoading(false)
      }
    }, 1500)
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate code verification
    setTimeout(() => {
      if (code.length === 6) {
        router.push("/dashboard")
      } else {
        setError("Código inválido. Por favor, verifique e tente novamente.")
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-muted/20">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <span>←</span>
          Voltar para home
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-2xl">💬</div>
            <div>
              <CardTitle className="text-2xl">{step === "email" ? "Bem-vindo de volta" : "Verificar código"}</CardTitle>
              <CardDescription>
                {step === "email" ? "Entre na sua conta do ZapPoupe" : `Código enviado para ${email}`}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail ou Celular</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="seu@email.com ou (11) 99999-9999"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">⏳</span>
                      Enviando código...
                    </>
                  ) : (
                    "Continuar com E-mail"
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">Primeira vez aqui?</span>
                  </div>
                </div>

                <Button type="button" variant="outline" className="w-full h-11 bg-transparent" asChild>
                  <Link href="/cadastro">Criar Nova Conta</Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Ao continuar, você receberá um código de acesso no e-mail ou celular informado
                </p>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código de Verificação</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                    className="h-11 text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground text-center">Digite o código de 6 dígitos</p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoading || code.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">⏳</span>
                      Verificando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setStep("email")
                    setCode("")
                    setError("")
                  }}
                >
                  Usar outro e-mail
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground"
                  disabled={isLoading}
                >
                  Reenviar código
                </Button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <Link href="/recuperar-acesso" className="text-sm text-primary hover:underline block text-center">
                Não consigo acessar minha conta
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">Protegido por criptografia de ponta a ponta</p>
      </div>
    </div>
  )
}
