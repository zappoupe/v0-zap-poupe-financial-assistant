'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useGastos } from "@/hooks/use-gastos"

export default function GastosPage() {
  const { data, loading } = useGastos()

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="h-10 bg-muted animate-pulse rounded w-1/3 mb-6" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gastos Detalhados</h1>
          <p className="text-muted-foreground">Análise completa dos seus gastos deste mês</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
            <span className="text-2xl">📉</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {data.totalAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.totalAnterior > 0 ? (
                <span className={data.tendencia > 0 ? "text-red-500" : "text-green-500"}>
                  {data.tendencia > 0 ? "+" : ""}{data.tendencia.toFixed(1)}% vs mês anterior
                </span>
              ) : (
                <span className="text-muted-foreground">Primeiro mês de registros</span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Estimado</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {data.orcamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
            <Progress value={(data.totalAtual / data.orcamentoTotal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {((data.totalAtual / data.orcamentoTotal) * 100).toFixed(1)}% utilizado
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disponível</CardTitle>
            <span className="text-2xl">📈</span>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${data.disponivel >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {Math.abs(data.disponivel).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.disponivel >= 0 ? 'Dentro do orçamento' : 'Acima do orçamento'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Por Categoria</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          {data.categorias.length === 0 ? (
            <Card>
              <CardContent className="py-10">
                <p className="text-muted-foreground text-center">Nenhum gasto registrado neste mês ainda.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.categorias.map((category) => {
                const isOverBudget = category.percent > 100

                return (
                  <Card key={category.category} className={isOverBudget ? "border-red-300 bg-red-50/50 dark:bg-red-950/20" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${category.color}20` }}
                          >
                            <span className="text-2xl">{category.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{category.category}</h3>
                            <p className="text-xs text-muted-foreground">{category.items} transações</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">R$ {category.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            R$ {category.value.toLocaleString("pt-BR")} de R$ {category.limit.toLocaleString("pt-BR")}
                          </span>
                          <Badge
                            variant={isOverBudget ? "destructive" : category.percent > 90 ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {category.percent.toFixed(0)}%
                          </Badge>
                        </div>
                        <Progress
                          value={Math.min(category.percent, 100)}
                          className={isOverBudget ? "[&>div]:bg-red-500" : ""}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transações deste Mês</CardTitle>
              <CardDescription>Últimas movimentações de saída</CardDescription>
            </CardHeader>
            <CardContent>
              {data.transacoes.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">Nenhuma transação registrada neste mês.</p>
              ) : (
                <div className="space-y-3">
                  {data.transacoes.map((t) => {
                    const categoria = data.categorias.find(c => c.category === t.categoria)
                    return (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                            {categoria?.icon || '📉'}
                          </div>
                          <div>
                            <p className="font-medium">{t.descricao || 'Sem descrição'}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{new Date(t.data_hora).toLocaleDateString('pt-BR')}</span>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                {t.categoria}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">-R$ {Number(t.valor).toFixed(2)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}