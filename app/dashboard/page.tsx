import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { ChartsSection } from "@/components/dashboard/charts-section"
import { TransactionsOverview } from "@/components/dashboard/transactions-overview"
import { AIInsights } from "@/components/dashboard/ai-insights"
import { getDadosDashboard } from "@/app/actions/financeiro"

// Força a renderização dinâmica para buscar dados sempre atualizados
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  // Busca todos os dados numa única chamada de servidor
  const dados = await getDadosDashboard()

  return (
    <div className="flex-1 space-y-6 p-6">
      <DashboardHeader />
      
      <KPICards summary={dados.resumo} />
      
      <AIInsights />
      
      <ChartsSection 
        barData={dados.graficoBarras} 
        pieData={dados.graficoPizza} 
      />
      
      <TransactionsOverview transactions={dados.transacoesRecentes} />
    </div>
  )
}