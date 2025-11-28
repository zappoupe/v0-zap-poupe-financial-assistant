import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { ChartsSection } from "@/components/dashboard/charts-section"
import { TransactionsOverview } from "@/components/dashboard/transactions-overview"
import { AIInsights } from "@/components/dashboard/ai-insights"
import { getDadosDashboard } from "@/app/actions/financeiro"
import { Card, CardContent } from "@/components/ui/card"

export const dynamic = 'force-dynamic'

function LoadingCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-8 bg-muted rounded w-1/2"></div>
        </div>
      </CardContent>
    </Card>
  )
}

async function DashboardContent() {
  const dados = await getDadosDashboard()

  return (
    <>
      <KPICards summary={dados.resumo} />
      <Suspense fallback={<LoadingCard />}>
        <AIInsights />
      </Suspense>
      <ChartsSection 
        barData={dados.graficoBarras} 
        pieData={dados.graficoPizza} 
      />
      <TransactionsOverview transactions={dados.transacoesRecentes} />
    </>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <Suspense fallback={<div>Carregando...</div>}>
        <DashboardHeader />
      </Suspense>
      
      <Suspense fallback={
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </div>
  )
}