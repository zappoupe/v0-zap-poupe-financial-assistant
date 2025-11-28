import { Card, CardContent } from "@/components/ui/card"
import { DashboardSummary } from "@/types/financeiro"

export function KPICards({ summary }: { summary: DashboardSummary }) {
  const kpis = [
    {
      title: "Saldo Atual",
      value: `R$ ${summary.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: "💰",
      color: "text-primary",
    },
    {
      title: "Entradas",
      value: `R$ ${summary.entradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: "📈",
      color: "text-chart-1",
    },
    {
      title: "Saídas",
      value: `R$ ${summary.saidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: "📉",
      color: "text-destructive",
    }
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{kpi.icon}</div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}