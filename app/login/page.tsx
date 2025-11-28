"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (searchParams.get('signup') === 'success') {
      setSuccess("Conta criada! Pode entrar.")
    }
    if (searchParams.get('error')) {
      setError("Erro ao fazer login. Tente novamente.")
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("E-mail ou senha incorretos")
        setIsLoading(false)
        return
      }

      if (result?.ok) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-muted/20">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <span>←</span> Voltar para home
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-2xl">💬</div>
            <div>
              <CardTitle className="text-2xl">Acessar ZapPoupe</CardTitle>
              <CardDescription>Entre com seu e-mail e senha</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="h-11" 
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/recuperar-acesso" className="text-xs text-primary hover:underline">Esqueceu a senha?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="******" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="h-11" 
                />
              </div>

              {error && <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">{error}</div>}
              {success && <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">{success}</div>}

              <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">Primeiro acesso?</span></div>
              </div>

              <Button type="button" variant="outline" className="w-full h-11 bg-transparent" asChild>
                <Link href="/cadastro">Ativar Minha Conta</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}