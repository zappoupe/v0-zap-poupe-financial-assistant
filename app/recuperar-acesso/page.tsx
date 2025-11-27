"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecoverAccessPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email) {
        setSubmitted(true)
      } else {
        setError("Por favor, insira um e-mail válido")
      }
      setIsLoading(false)
    }, 1500)
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
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-2xl">💬</div>
            <div>
              <CardTitle className="text-2xl">{submitted ? "Verifique seu e-mail" : "Recuperar acesso"}</CardTitle>
              <CardDescription>
                {submitted ? "Enviamos instruções para recuperar sua conta" : "Informe seu e-mail cadastrado"}
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
                  {isLoading ? (
                    <>
                      <span className="mr-2">⏳</span>
                      Enviando...
                    </>
                  ) : (
                    "Enviar Instruções"
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6 text-center py-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
                  📧
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Enviamos um e-mail para <strong className="text-foreground">{email}</strong> com instruções para
                    recuperar sua conta.
                  </p>
                  <p className="text-sm text-muted-foreground">Verifique também sua caixa de spam.</p>
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
