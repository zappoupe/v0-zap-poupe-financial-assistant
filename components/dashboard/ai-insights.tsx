import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AIInsights() {
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
              Se você continuar assim, fechará o mês com <strong className="text-primary">R$ 4.120,00</strong> de saldo
              positivo
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-lg bg-card">
          <span className="text-xl mt-0.5">⚠️</span>
          <div className="flex-1">
            <p className="font-medium mb-1">Alerta Inteligente</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Seus gastos com <strong>Alimentação</strong> estão 23% acima da média. Considere ajustar este mês.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
