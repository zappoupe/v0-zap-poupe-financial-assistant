"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const monthlyData = [
  { month: "Jan", receitas: 12500, gastos: 8500, economia: 4000, investido: 2000 },
  { month: "Fev", receitas: 12500, gastos: 9200, economia: 3300, investido: 2000 },
  { month: "Mar", receitas: 13000, gastos: 8800, economia: 4200, investido: 2500 },
  { month: "Abr", receitas: 12500, gastos: 10200, economia: 2300, investido: 1500 },
  { month: "Mai", receitas: 15000, gastos: 9500, economia: 5500, investido: 3000 },
  { month: "Jun", receitas: 12500, gastos: 10640, economia: 1860, investido: 1000 },
]

const categoryComparison = [
  { category: "Alimentação", atual: 2850, anterior: 2700, media: 2650 },
  { category: "Transporte", atual: 1200, anterior: 1225, media: 1180 },
  { category: "Moradia", atual: 2500, anterior: 2500, media: 2500 },
  { category: "Lazer", atual: 800, anterior: 695, media: 720 },
  { category: "Saúde", atual: 450, anterior: 492, media: 475 },
]

const insights = [
  {
    type: "warning",
    title: "Categoria Acima da Média",
    description: "Seus gastos com Alimentação estão 7.5% acima da média dos últimos 6 meses",
    action: "Ver detalhes",
    icon: "⚠️",
    bgColor: "bg-yellow-50",
  },
  {
    type: "success",
    title: "Economia Positiva",
    description: "Você economizou R$ 1.860 este mês, atingindo 93% da sua meta",
    action: "Ver meta",
    icon: "✅",
    bgColor: "bg-green-50",
  },
  {
    type: "info",
    title: "Oportunidade de Investimento",
    description: "Com base no seu perfil, você pode investir mais R$ 860 este mês",
    action: "Simular",
    icon: "💡",
    bgColor: "bg-blue-50",
  },
  {
    type: "alert",
    title: "Gastos com Compras Elevados",
    description: "Categoria Compras 22% acima do previsto, afetando sua reserva de emergência",
    action: "Ajustar limite",
    icon: "🚨",
    bgColor: "bg-red-50",
  },
]

export default function RelatoriosPage() {
  const [period, setPeriod] = useState("6months")

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios & Análises</h1>
          <p className="text-muted-foreground">Visão completa da sua saúde financeira</p>
        </div>
        <div className="flex gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 meses</SelectItem>
              <SelectItem value="6months">6 meses</SelectItem>
              <SelectItem value="12months">12 meses</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <Button>📥 Exportar PDF</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receitas Totais</CardTitle>
            <span className="text-2xl">💵</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ 79.000</div>
            <p className="text-xs text-muted-foreground mt-1">Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totais</CardTitle>
            <span className="text-2xl">📉</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ 56.840</div>
            <p className="text-xs text-muted-foreground mt-1">71.9% das receitas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Economia Total</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 22.160</div>
            <p className="text-xs text-muted-foreground mt-1">28.1% das receitas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
            <span className="text-2xl">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">R$ 12.000</div>
            <p className="text-xs text-muted-foreground mt-1">15.2% das receitas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Insights IA</TabsTrigger>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        </TabsList>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises Inteligentes</CardTitle>
              <CardDescription>
                Insights personalizados gerados por IA baseados no seu comportamento financeiro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${insight.bgColor}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{insight.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                        <Button size="sm" variant="outline">
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro Completo</CardTitle>
              <CardDescription>Principais métricas do período selecionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Poupança Média</p>
                  <p className="text-3xl font-bold text-green-600">28.1%</p>
                  <p className="text-xs text-muted-foreground">Meta: 20% | Recomendado para seu perfil</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Gasto Médio Mensal</p>
                  <p className="text-3xl font-bold">R$ 9.473</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-500">+5.2%</span> vs período anterior
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Patrimônio Acumulado</p>
                  <p className="text-3xl font-bold text-purple-600">R$ 34.160</p>
                  <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
