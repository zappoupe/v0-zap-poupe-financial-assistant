"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const expensesByCategory = [
  {
    category: "Alimentação",
    value: 2850,
    limit: 3000,
    percent: 95,
    color: "#10b981",
    trend: 5.2,
    items: 45,
    icon: "🍔",
  },
  {
    category: "Transporte",
    value: 1200,
    limit: 1500,
    percent: 80,
    color: "#3b82f6",
    trend: -2.1,
    items: 28,
    icon: "🚗",
  },
  { category: "Moradia", value: 2500, limit: 2500, percent: 100, color: "#8b5cf6", trend: 0, items: 3, icon: "🏠" },
  { category: "Lazer", value: 800, limit: 1000, percent: 80, color: "#ec4899", trend: 15.3, items: 12, icon: "🎮" },
  { category: "Saúde", value: 450, limit: 600, percent: 75, color: "#f59e0b", trend: -8.5, items: 6, icon: "💊" },
  { category: "Educação", value: 600, limit: 800, percent: 75, color: "#06b6d4", trend: 0, items: 2, icon: "📚" },
  {
    category: "Compras",
    value: 1350,
    limit: 1200,
    percent: 112.5,
    color: "#ef4444",
    trend: 22.1,
    items: 18,
    icon: "🛍️",
  },
  { category: "Contas", value: 890, limit: 1000, percent: 89, color: "#14b8a6", trend: 3.2, items: 8, icon: "⚡" },
]

const recentTransactions = [
  {
    id: 1,
    description: "Supermercado Pão de Açúcar",
    category: "Alimentação",
    amount: 285.5,
    date: "2024-01-15",
    time: "14:32",
    icon: "🛒",
    status: "confirmed",
  },
  {
    id: 2,
    description: "Uber - Corrida",
    category: "Transporte",
    amount: 32.8,
    date: "2024-01-15",
    time: "09:15",
    icon: "🚗",
    status: "confirmed",
  },
  {
    id: 3,
    description: "Netflix Assinatura",
    category: "Lazer",
    amount: 55.9,
    date: "2024-01-14",
    time: "08:00",
    icon: "📺",
    status: "pending",
  },
  {
    id: 4,
    description: "Farmácia Droga Raia",
    category: "Saúde",
    amount: 89.9,
    date: "2024-01-14",
    time: "16:45",
    icon: "💊",
    status: "confirmed",
  },
  {
    id: 5,
    description: "Restaurante Outback",
    category: "Alimentação",
    amount: 198.0,
    date: "2024-01-13",
    time: "20:30",
    icon: "🍔",
    status: "confirmed",
  },
  {
    id: 6,
    description: "Posto Shell",
    category: "Transporte",
    amount: 250.0,
    date: "2024-01-13",
    time: "07:22",
    icon: "⛽",
    status: "confirmed",
  },
  {
    id: 7,
    description: "Amazon - Compras",
    category: "Compras",
    amount: 456.8,
    date: "2024-01-12",
    time: "15:10",
    icon: "📦",
    status: "confirmed",
  },
  {
    id: 8,
    description: "Conta de Luz - CEMIG",
    category: "Contas",
    amount: 345.2,
    date: "2024-01-10",
    time: "10:05",
    icon: "⚡",
    status: "confirmed",
  },
]

export default function GastosPage() {
  const [period, setPeriod] = useState("month")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const totalExpenses = expensesByCategory.reduce((sum, cat) => sum + cat.value, 0)
  const totalLimit = expensesByCategory.reduce((sum, cat) => sum + cat.limit, 0)

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gastos Detalhados</h1>
          <p className="text-muted-foreground">Análise completa dos seus gastos por categoria</p>
        </div>
        <div className="flex gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
            <span className="text-2xl">📉</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalExpenses.toLocaleString("pt-BR")}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500 font-medium">+8.2%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
            <span className="text-2xl">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalLimit.toLocaleString("pt-BR")}</div>
            <Progress value={(totalExpenses / totalLimit) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {((totalExpenses / totalLimit) * 100).toFixed(1)}% do orçamento usado
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disponível</CardTitle>
            <span className="text-2xl">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {(totalLimit - totalExpenses).toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Você ainda pode gastar este mês</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Por Categoria</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {expensesByCategory.map((category) => {
              const isOverBudget = category.percent > 100

              return (
                <Card key={category.category} className={isOverBudget ? "border-red-300 bg-red-50/50" : ""}>
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
                        <div className="text-lg font-bold">R$ {category.value.toLocaleString("pt-BR")}</div>
                        <div className="flex items-center gap-1 text-xs">
                          <span
                            className={
                              category.trend > 0
                                ? "text-red-500"
                                : category.trend < 0
                                  ? "text-green-500"
                                  : "text-muted-foreground"
                            }
                          >
                            {category.trend > 0 ? "↗" : category.trend < 0 ? "↘" : "→"}
                            {category.trend > 0 ? "+" : ""}
                            {category.trend}%
                          </span>
                        </div>
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
                      {isOverBudget && (
                        <p className="text-xs text-red-600 font-medium">
                          ⚠️ Ultrapassou o limite em R$ {(category.value - category.limit).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>Últimas movimentações registradas</CardDescription>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Todas categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas categorias</SelectItem>
                    {expensesByCategory.map((cat) => (
                      <SelectItem key={cat.category} value={cat.category}>
                        {cat.icon} {cat.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => {
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <span className="text-xl">{transaction.icon}</span>
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.time}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">-R$ {transaction.amount.toFixed(2)}</p>
                        <Badge
                          variant={transaction.status === "confirmed" ? "secondary" : "default"}
                          className="text-xs"
                        >
                          {transaction.status === "confirmed" ? "✓ Confirmado" : "⏳ Pendente"}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
