import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const transactions = [
  {
    id: 1,
    type: "saida",
    description: "Supermercado Extra",
    category: "Alimentação",
    amount: 245.5,
    date: "2025-11-26",
    time: "14:30",
  },
  {
    id: 2,
    type: "entrada",
    description: "Salário",
    category: "Renda",
    amount: 5500.0,
    date: "2025-11-25",
    time: "08:00",
  },
  {
    id: 3,
    type: "saida",
    description: "Uber",
    category: "Transporte",
    amount: 28.4,
    date: "2025-11-25",
    time: "18:45",
  },
  {
    id: 4,
    type: "saida",
    description: "Netflix",
    category: "Assinaturas",
    amount: 55.9,
    date: "2025-11-24",
    time: "10:15",
  },
  {
    id: 5,
    type: "entrada",
    description: "Freelance Design",
    category: "Renda Extra",
    amount: 1200.0,
    date: "2025-11-23",
    time: "16:20",
  },
]

export function TransactionsOverview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transações Recentes</CardTitle>
          <Badge variant="outline">Últimos 7 dias</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                  transaction.type === "entrada" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                }`}
              >
                {transaction.type === "entrada" ? "↗" : "↘"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.category}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === "entrada" ? "text-primary" : "text-foreground"}`}>
                  {transaction.type === "entrada" ? "+" : "-"} R$ {transaction.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.date} • {transaction.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
