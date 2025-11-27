import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { ChartsSection } from "@/components/dashboard/charts-section"
import { TransactionsOverview } from "@/components/dashboard/transactions-overview"
import { AIInsights } from "@/components/dashboard/ai-insights"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <DashboardHeader />
      <KPICards />
      <AIInsights />
      <ChartsSection />
      <TransactionsOverview />
    </div>
  )
}
