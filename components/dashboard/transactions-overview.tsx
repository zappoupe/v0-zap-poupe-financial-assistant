import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Transacao } from "@/types/financeiro"

export function TransactionsOverview({ transactions }: { transactions: Transacao[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transações Recentes</CardTitle>
          <Badge variant="outline">Tempo Real</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Nenhuma transação encontrada.</p>
          ) : (
            transactions.map((t) => {
              const isEntrada = t.tipo === "entrada" || t.tipo === "receita"
              
              return (
                <div key={t.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                    isEntrada ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                  }`}>
                    {isEntrada ? "↗" : "↘"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{t.descricao || "Sem descrição"}</p>
                    <p className="text-sm text-muted-foreground">{t.categoria}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${isEntrada ? "text-primary" : "text-destructive"}`}>
                      {isEntrada ? "+" : "-"} R$ {Number(t.valor).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(t.data_hora).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}