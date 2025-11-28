'use client'

import { useDashboard } from "@/hooks/use-dashboard"
import { usePerfil } from "@/hooks/use-perfil"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { ChartsSection } from "@/components/dashboard/charts-section"
import { TransactionsOverview } from "@/components/dashboard/transactions-overview"
import { AIInsights } from "@/components/dashboard/ai-insights"
import { Card, CardContent } from "@/components/ui/card"

function HeaderSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-8 bg-muted rounded w-48" />
      <div className="h-4 bg-muted rounded w-32" />
    </div>
  )
}

function CardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-8 bg-muted rounded w-10" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const { data, loading: loadingData } = useDashboard()
  const { perfil, loading: loadingPerfil } = usePerfil()
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-1">
        {loadingPerfil ? (
          <HeaderSkeleton />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-balance">
              Olá, {perfil?.nomewpp || "Usuário"}!
            </h1>
            <p className="text-muted-foreground capitalize">{currentDate}</p>
          </>
        )}
      </div>
      {loadingData ? (
        <CardsSkeleton />
      ) : (
        <KPICards summary={data.resumo} />
      )}
      <AIInsights />
      {loadingData ? (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-[300px] bg-muted animate-pulse rounded-xl" />
          <div className="h-[300px] bg-muted animate-pulse rounded-xl" />
        </div>
      ) : (
        <ChartsSection 
          barData={data.graficoBarras} 
          pieData={data.graficoPizza} 
        />
      )}
      {loadingData ? (
        <div className="h-[200px] bg-muted animate-pulse rounded-xl" />
      ) : (
        <TransactionsOverview transactions={data.transacoesRecentes} />
      )}
    </div>
  )
}