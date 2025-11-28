'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AIInsights() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="animate-pulse h-32"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <CardTitle className="text-lg">Projeção Inteligente</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-card">
          <span className="text-xl mt-0.5">📈</span>
          <div className="flex-1">
            <p className="font-medium mb-1">Previsão do Mês</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Continue registrando suas transações para receber projeções inteligentes
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-card">
          <span className="text-xl mt-0.5">✅</span>
          <div className="flex-1">
            <p className="font-medium mb-1">Tudo sob controle!</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Continue acompanhando seus gastos regularmente.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}