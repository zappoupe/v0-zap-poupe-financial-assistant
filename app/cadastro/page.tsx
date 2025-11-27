"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    acceptTerms: false,
  })
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (step === 1) {
      if (!formData.acceptTerms) {
        setError("Você precisa aceitar os termos para continuar")
        return
      }
      setIsLoading(true)
      // Simulate sending verification code
      setTimeout(() => {
        setIsLoading(false)
        setStep(2)
      }, 1500)
    } else if (step === 2) {
      if (!verificationCode || verificationCode.length < 6) {
        setError("Por favor, insira o código de 6 dígitos")
        return
      }
      setIsLoading(true)
      // Simulate verification
      setTimeout(() => {
        setIsLoading(false)
        setStep(3)
        // Redirect after success
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }, 1500)
    }
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
              <CardTitle className="text-2xl">
                {step === 1 && "Criar sua conta"}
                {step === 2 && "Verificar e-mail"}
                {step === 3 && "Conta criada!"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Comece a controlar suas finanças gratuitamente"}
                {step === 2 && "Digite o código enviado para seu e-mail"}
                {step === 3 && "Redirecionando para o dashboard..."}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Maria Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Celular (opcional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    Concordo com os{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Política de Privacidade
                    </Link>
                  </Label>
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
                      Criando conta...
                    </>
                  ) : (
                    "Criar Conta Grátis"
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Entrar
                  </Link>
                </p>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Enviamos um código de 6 dígitos para</p>
                  <p className="font-medium">{formData.email}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Código de Verificação</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    className="h-11 text-center text-2xl tracking-widest"
                    required
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
                      Verificando...
                    </>
                  ) : (
                    "Verificar Código"
                  )}
                </Button>

                <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(1)}>
                  Voltar
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Não recebeu o código? <button className="text-primary hover:underline">Reenviar</button>
                </p>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Tudo pronto, {formData.name.split(" ")[0]}!</h3>
                  <p className="text-muted-foreground">
                    Sua conta foi criada com sucesso. Você será redirecionado para o dashboard.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">⏳</span>
                  <span className="text-sm text-muted-foreground">Carregando...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">Seus dados são criptografados e protegidos</p>
      </div>
    </div>
  )
}
