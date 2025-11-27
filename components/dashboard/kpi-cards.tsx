import { Card, CardContent } from "@/components/ui/card"

const kpis = [
  {
    title: "Saldo do Período",
    value: "R$ 3.245,00",
    change: "+12.5%",
    trend: "up",
    icon: "💰",
    color: "text-primary",
  },
  {
    title: "Total de Entradas",
    value: "R$ 8.500,00",
    change: "+8.2%",
    trend: "up",
    icon: "📈",
    color: "text-chart-1",
  },
  {
    title: "Total de Saídas",
    value: "R$ 5.255,00",
    change: "-3.1%",
    trend: "down",
    icon: "📉",
    color: "text-destructive",
  },
  {
    title: "Ticket Médio",
    value: "R$ 187,32",
    change: "-5.4%",
    trend: "down",
    icon: "💵",
    color: "text-chart-2",
  },
  {
    title: "Score de Saúde",
    value: "87/100",
    change: "+15 pts",
    trend: "up",
    icon: "📊",
    color: "text-chart-1",
  },
]

export function KPICards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`text-3xl`}>{kpi.icon}</div>
              <div
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                  kpi.trend === "up" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                }`}
              >
                {kpi.trend === "up" ? "↑" : "↓"} {kpi.change}
              </div>
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
