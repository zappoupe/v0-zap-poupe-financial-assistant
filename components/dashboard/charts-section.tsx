"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const barData = [
  { name: "Jan", entradas: 8200, saidas: 5100 },
  { name: "Fev", entradas: 8500, saidas: 5500 },
  { name: "Mar", entradas: 8500, saidas: 5255 },
]

const lineData = [
  { name: "Sem 1", saldo: 2800 },
  { name: "Sem 2", saldo: 3100 },
  { name: "Sem 3", saldo: 3000 },
  { name: "Sem 4", saldo: 3245 },
]

const pieData = [
  { name: "Alimentação", value: 1850, color: "#10b981" },
  { name: "Transporte", value: 950, color: "#6366f1" },
  { name: "Moradia", value: 1500, color: "#8b5cf6" },
  { name: "Lazer", value: 655, color: "#ec4899" },
  { name: "Outros", value: 300, color: "#f59e0b" },
]

type ChartType = "bar" | "line" | "pie"
type Period = "1week" | "1month" | "3months" | "6months" | "1year"

export function ChartsSection() {
  const [chartType, setChartType] = useState<ChartType>("bar")
  const [period, setPeriod] = useState<Period>("1month")

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <CardTitle>Fluxo de Caixa</CardTitle>
            <Tabs value={chartType} onValueChange={(v) => setChartType(v as ChartType)} className="w-auto">
              <TabsList>
                <TabsTrigger value="bar">Barras</TabsTrigger>
                <TabsTrigger value="line">Linhas</TabsTrigger>
                <TabsTrigger value="pie">Pizza</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["1week", "1month", "3months", "6months", "1year"] as Period[]).map((p) => (
              <Button
                key={p}
                variant={period === p ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod(p)}
                className="text-xs"
              >
                {p === "1week" && "1 Semana"}
                {p === "1month" && "1 Mês"}
                {p === "3months" && "3 Meses"}
                {p === "6months" && "6 Meses"}
                {p === "1year" && "1 Ano"}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === "bar" && (
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="entradas" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="saidas" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
            {chartType === "line" && (
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="saldo"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 4 }}
                />
              </LineChart>
            )}
            {chartType === "pie" && (
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-semibold">R$ {item.value.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.value / 5255) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
