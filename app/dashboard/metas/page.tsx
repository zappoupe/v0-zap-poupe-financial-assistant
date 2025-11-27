"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const iconMap = {
  Home: "🏠",
  Car: "🚗",
  Plane: "✈️",
  GraduationCap: "🎓",
  Target: "🎯",
  CheckCircle: "✅",
  AlertCircle: "⚠️",
  DollarSign: "💰",
  Clock: "⏰",
  Sparkles: "✨",
}

export default function MetasPage() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      icon: "Home",
      title: "Casa Própria",
      target: 150000,
      current: 45000,
      deadline: "2027-12",
      monthlyContribution: 2500,
      status: "on_track",
      color: "#10b981",
      category: "Longo Prazo",
    },
    {
      id: 2,
      icon: "Car",
      title: "Carro Novo",
      target: 80000,
      current: 58000,
      deadline: "2025-06",
      monthlyContribution: 3000,
      status: "ahead",
      color: "#3b82f6",
      category: "Médio Prazo",
    },
    {
      id: 3,
      icon: "Plane",
      title: "Viagem Europa",
      target: 25000,
      current: 8500,
      deadline: "2025-12",
      monthlyContribution: 1500,
      status: "at_risk",
      color: "#f59e0b",
      category: "Curto Prazo",
    },
    {
      id: 4,
      icon: "GraduationCap",
      title: "Pós-Graduação",
      target: 35000,
      current: 22000,
      deadline: "2026-03",
      monthlyContribution: 1200,
      status: "on_track",
      color: "#8b5cf6",
      category: "Médio Prazo",
    },
  ])

  const [showNewGoal, setShowNewGoal] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [showGoalDetails, setShowGoalDetails] = useState(false)

  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    current: "",
    monthlyContribution: "",
    deadline: "",
    icon: "Target",
    color: "#10b981",
    category: "Médio Prazo",
  })

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return

    const goal = {
      id: goals.length + 1,
      ...newGoal,
      target: Number.parseFloat(newGoal.target),
      current: Number.parseFloat(newGoal.current || "0"),
      monthlyContribution: Number.parseFloat(newGoal.monthlyContribution || "0"),
      status: "on_track",
    }

    setGoals([...goals, goal])
    setShowNewGoal(false)
    setNewGoal({
      title: "",
      target: "",
      current: "",
      monthlyContribution: "",
      deadline: "",
      icon: "Target",
      color: "#10b981",
      category: "Médio Prazo",
    })
  }

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id))
    setShowGoalDetails(false)
  }

  const projectionData = [
    { month: "Jan", conservador: 45000, moderado: 45000, agressivo: 45000 },
    { month: "Fev", conservador: 47500, moderado: 48200, agressivo: 49500 },
    { month: "Mar", conservador: 50000, moderado: 51500, agressivo: 54500 },
    { month: "Abr", conservador: 52500, moderado: 55000, agressivo: 60000 },
    { month: "Mai", conservador: 55000, moderado: 58700, agressivo: 66200 },
    { month: "Jun", conservador: 57500, moderado: 62600, agressivo: 73000 },
    { month: "Jul", conservador: 60000, moderado: 66800, agressivo: 80500 },
    { month: "Ago", conservador: 62500, moderado: 71200, agressivo: 88800 },
    { month: "Set", conservador: 65000, moderado: 75900, agressivo: 97900 },
    { month: "Out", conservador: 67500, moderado: 80800, agressivo: 107900 },
    { month: "Nov", conservador: 70000, moderado: 86000, agressivo: 118800 },
    { month: "Dez", conservador: 72500, moderado: 91500, agressivo: 130800 },
  ]

  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0)
  const totalCurrent = goals.reduce((sum, g) => sum + g.current, 0)
  const totalProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0

  const onTrackGoals = goals.filter((g) => g.status === "on_track" || g.status === "ahead").length
  const atRiskGoals = goals.filter((g) => g.status === "at_risk").length

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Metas & Projeções</h1>
          <p className="text-muted-foreground">Planeje e acompanhe seus objetivos financeiros</p>
        </div>
        <Button onClick={() => setShowNewGoal(true)} className="bg-primary text-primary-foreground">
          + Nova Meta
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total em Metas</CardTitle>
            <span className="text-2xl">{iconMap.Home}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalCurrent.toLocaleString("pt-BR")}</div>
            <Progress value={totalProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {totalProgress.toFixed(1)}% do total (R$ {totalTarget.toLocaleString("pt-BR")})
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Metas no Prazo</CardTitle>
            <span className="text-2xl">{iconMap.CheckCircle}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onTrackGoals}</div>
            <p className="text-xs text-muted-foreground mt-1">De {goals.length} metas ativas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Necessita Atenção</CardTitle>
            <span className="text-2xl">{iconMap.AlertCircle}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{atRiskGoals}</div>
            <p className="text-xs text-muted-foreground mt-1">Metas em risco de atraso</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aporte Mensal</CardTitle>
            <span className="text-2xl">{iconMap.DollarSign}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {goals.reduce((sum, g) => sum + g.monthlyContribution, 0).toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total investido mensalmente</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="goals">Minhas Metas</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
          <TabsTrigger value="simulator">Simulador</TabsTrigger>
        </TabsList>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {goals.map((goal) => {
              const Icon = iconMap[goal.icon as keyof typeof iconMap] || "🎯"
              const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0
              const remaining = goal.target - goal.current
              const monthsLeft =
                goal.monthlyContribution > 0
                  ? Math.ceil(remaining / goal.monthlyContribution)
                  : Number.POSITIVE_INFINITY

              const statusConfig = {
                on_track: { label: "No prazo", color: "text-green-600", bg: "bg-green-50", badge: "default" },
                ahead: { label: "Adiantado", color: "text-blue-600", bg: "bg-blue-50", badge: "secondary" },
                at_risk: { label: "Em risco", color: "text-yellow-600", bg: "bg-yellow-50", badge: "destructive" },
              }

              const status = statusConfig[goal.status as keyof typeof statusConfig]

              return (
                <Card key={goal.id} className={`${status.bg} border-l-4`} style={{ borderLeftColor: goal.color }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white">
                          <span className="text-2xl">{Icon}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <span className="mt-1 bg-muted px-1.5 py-0.5 text-xs font-semibold rounded-full">
                            {goal.category}
                          </span>
                        </div>
                      </div>
                      <span className={`bg-white px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Progresso</span>
                        <span className="font-bold" style={{ color: goal.color }}>
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>R$ {goal.current.toLocaleString("pt-BR")}</span>
                        <span>R$ {goal.target.toLocaleString("pt-BR")}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Falta Acumular</p>
                        <p className="text-lg font-bold">R$ {remaining.toLocaleString("pt-BR")}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Aporte Mensal</p>
                        <p className="text-lg font-bold">R$ {goal.monthlyContribution.toLocaleString("pt-BR")}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-lg">{iconMap.Clock}</span>
                        <span className="text-muted-foreground">
                          {monthsLeft === Number.POSITIVE_INFINITY ? "N/A" : `${monthsLeft} meses restantes`}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedGoal(goal)
                          setShowGoalDetails(true)
                        }}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Projections Tab */}
        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projeção da Meta: Casa Própria</CardTitle>
              <CardDescription>Simulação de diferentes cenários de investimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <Card className="bg-purple-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-purple-900">Conservador</h4>
                      <span className="bg-white px-2 py-0.5 text-xs font-semibold rounded-full">5% a.a.</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">R$ 72.500</p>
                    <p className="text-xs text-muted-foreground mt-1">Em 12 meses</p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">Moderado</h4>
                      <span className="bg-white px-2 py-0.5 text-xs font-semibold rounded-full">8% a.a.</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">R$ 91.500</p>
                    <p className="text-xs text-muted-foreground mt-1">Em 12 meses</p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-900">Agressivo</h4>
                      <span className="bg-white px-2 py-0.5 text-xs font-semibold rounded-full">12% a.a.</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">R$ 130.800</p>
                    <p className="text-xs text-muted-foreground mt-1">Em 12 meses</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-2xl">{iconMap.Sparkles}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Dica Inteligente</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Se você aumentar seu aporte mensal em apenas R$ 500 e escolher um perfil moderado, você pode atingir
                    sua meta 8 meses mais cedo, alcançando R$ 150.000 em Abril de 2027.
                  </p>
                  <Button size="sm">Simular Aumento de Aporte</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Simulator Tab */}
        <TabsContent value="simulator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Simulador de Metas</CardTitle>
              <CardDescription>Calcule quanto tempo levará para atingir seu objetivo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-name">Nome da Meta</Label>
                    <Input id="goal-name" placeholder="Ex: Viagem Internacional" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target-amount">Valor Desejado</Label>
                    <Input id="target-amount" type="number" placeholder="50000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-amount">Valor Atual</Label>
                    <Input id="current-amount" type="number" placeholder="5000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly-contribution">Aporte Mensal</Label>
                    <Input id="monthly-contribution" type="number" placeholder="2000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="return-rate">Taxa de Retorno (% a.a.)</Label>
                    <Input id="return-rate" type="number" placeholder="10" />
                  </div>

                  <Button className="w-full" size="lg">
                    <span className="text-lg mr-2">{iconMap.Target}</span>
                    Calcular Meta
                  </Button>
                </div>

                <div className="space-y-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-900">Resultado da Simulação</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tempo necessário</p>
                        <p className="text-3xl font-bold text-green-600">22 meses</p>
                        <p className="text-sm text-muted-foreground mt-1">Previsão: Novembro de 2026</p>
                      </div>

                      <div className="pt-4 border-t space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Investido</span>
                          <span className="font-semibold">R$ 49.000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rendimento</span>
                          <span className="font-semibold text-green-600">R$ 6.245</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-medium">Valor Final</span>
                          <span className="text-xl font-bold text-green-600">R$ 55.245</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-lg">{iconMap.Sparkles}</span>
                          Sugestões para Acelerar
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            Aumentar aporte em R$ 500: alcance em 18 meses
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            Investir em renda variável: alcance em 20 meses
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            Reduzir gastos supérfluos: economize R$ 800/mês
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Goal Dialog */}
      <Dialog open={showNewGoal} onOpenChange={setShowNewGoal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Nova Meta</DialogTitle>
            <DialogDescription>Defina um novo objetivo financeiro para acompanhar</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-goal-title">Nome da Meta</Label>
                <Input
                  id="new-goal-title"
                  placeholder="Ex: Casa Própria"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-goal-icon">Ícone</Label>
                <Select value={newGoal.icon} onValueChange={(value) => setNewGoal({ ...newGoal, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">{iconMap.Home} Casa</SelectItem>
                    <SelectItem value="Car">{iconMap.Car} Carro</SelectItem>
                    <SelectItem value="Plane">{iconMap.Plane} Viagem</SelectItem>
                    <SelectItem value="GraduationCap">{iconMap.GraduationCap} Educação</SelectItem>
                    <SelectItem value="Target">{iconMap.Target} Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-goal-target">Valor Objetivo (R$)</Label>
                <Input
                  id="new-goal-target"
                  type="number"
                  placeholder="150000"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-goal-current">Valor Atual (R$)</Label>
                <Input
                  id="new-goal-current"
                  type="number"
                  placeholder="0"
                  value={newGoal.current}
                  onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-goal-monthly">Aporte Mensal (R$)</Label>
                <Input
                  id="new-goal-monthly"
                  type="number"
                  placeholder="2500"
                  value={newGoal.monthlyContribution}
                  onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-goal-deadline">Prazo Desejado</Label>
                <Input
                  id="new-goal-deadline"
                  type="month"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-goal-category">Categoria</Label>
              <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Curto Prazo">Curto Prazo (até 1 ano)</SelectItem>
                  <SelectItem value="Médio Prazo">Médio Prazo (1-3 anos)</SelectItem>
                  <SelectItem value="Longo Prazo">Longo Prazo (3+ anos)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewGoal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddGoal} disabled={!newGoal.title || !newGoal.target}>
              Criar Meta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Goal Details Dialog */}
      <Dialog open={showGoalDetails} onOpenChange={setShowGoalDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedGoal && iconMap[selectedGoal.icon as keyof typeof iconMap]}</span>
              {selectedGoal?.title}
            </DialogTitle>
            <DialogDescription>Detalhes e progresso da meta</DialogDescription>
          </DialogHeader>
          {selectedGoal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Valor Objetivo</p>
                    <p className="text-2xl font-bold">R$ {selectedGoal.target.toLocaleString("pt-BR")}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Valor Atual</p>
                    <p className="text-2xl font-bold text-green-600">
                      R$ {selectedGoal.current.toLocaleString("pt-BR")}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Progresso</p>
                <Progress value={(selectedGoal.current / selectedGoal.target) * 100} className="h-4" />
                <p className="text-sm text-muted-foreground mt-1">
                  {((selectedGoal.current / selectedGoal.target) * 100).toFixed(1)}% concluído
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Aporte Mensal</p>
                  <p className="text-lg font-semibold">R$ {selectedGoal.monthlyContribution.toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prazo Desejado</p>
                  <p className="text-lg font-semibold">{selectedGoal.deadline}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="destructive" onClick={() => selectedGoal && handleDeleteGoal(selectedGoal.id)}>
              Excluir Meta
            </Button>
            <Button variant="outline" onClick={() => setShowGoalDetails(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
