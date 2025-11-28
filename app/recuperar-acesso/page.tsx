"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function RecoverAccessPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/perfil`,
      })

      if (error) throw error
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Erro ao enviar e-mail.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-muted/20">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <span>←</span>
          Voltar para login
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-2xl">🔒</div>
            <div>
              <CardTitle className="text-2xl">{submitted ? "Verifique seu e-mail" : "Recuperar Senha"}</CardTitle>
              <CardDescription>
                {submitted ? "Enviamos um link para redefinir sua senha" : "Informe seu e-mail cadastrado"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
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
                  {isLoading ? "Enviando..." : "Enviar Link de Recuperação"}
                </Button>
              </form>
            ) : (
              <div className="space-y-6 text-center py-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Enviamos as instruções para <strong>{email}</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground">Verifique sua caixa de entrada e spam.</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/login">Voltar para Login</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}