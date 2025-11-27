"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const familyMembers = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Administradora",
    initials: "MS",
    expenses: 2850,
    income: 5500,
    categories: [
      { name: "Alimentação", value: 850 },
      { name: "Transporte", value: 600 },
      { name: "Lazer", value: 400 },
    ],
    color: "#10b981",
  },
  {
    id: 2,
    name: "João Silva",
    role: "Membro",
    initials: "JS",
    expenses: 1950,
    income: 6200,
    categories: [
      { name: "Alimentação", value: 700 },
      { name: "Transporte", value: 850 },
      { name: "Lazer", value: 400 },
    ],
    color: "#6366f1",
  },
  {
    id: 3,
    name: "Ana Silva",
    role: "Membro",
    initials: "AS",
    expenses: 455,
    income: 0,
    categories: [
      { name: "Educação", value: 350 },
      { name: "Lazer", value: 105 },
    ],
    color: "#ec4899",
  },
]

export default function FamiliaPage() {
  const [activeTab, setActiveTab] = useState("visao-geral")
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [showMemberDetails, setShowMemberDetails] = useState(false)

  const totalExpenses = familyMembers.reduce((sum, member) => sum + member.expenses, 0)
  const totalIncome = familyMembers.reduce((sum, member) => sum + member.income, 0)

  const sortedByExpenses = [...familyMembers].sort((a, b) => b.expenses - a.expenses)
  const sortedByIncome = [...familyMembers].sort((a, b) => b.income - a.income)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Plano Família</h1>
          <p className="text-muted-foreground">Gerencie as finanças de toda a família</p>
        </div>
        <Button className="bg-primary text-primary-foreground">+ Convidar Membro</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total de Membros</p>
              <p className="text-3xl font-bold">{familyMembers.length}</p>
              <Badge variant="outline" className="mt-2">
                Família Silva
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Gastos Totais</p>
              <p className="text-3xl font-bold text-destructive">R$ {totalExpenses.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Receitas Totais</p>
              <p className="text-3xl font-bold text-primary">R$ {totalIncome.toLocaleString("pt-BR")}</p>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Saldo Familiar</p>
              <p className="text-3xl font-bold">R$ {(totalIncome - totalExpenses).toLocaleString("pt-BR")}</p>
              <p className="text-xs text-primary">↑ +12.5%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-2xl">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="comparacao">Comparação</TabsTrigger>
          <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral" className="space-y-4 mt-6">
          <div className="grid lg:grid-cols-3 gap-4">
            {familyMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="text-white font-semibold" style={{ backgroundColor: member.color }}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <CardDescription className="text-xs">{member.role}</CardDescription>
                      </div>
                    </div>
                    {member.role === "Administradora" && <span className="text-yellow-500">★</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Gastos</p>
                      <p className="text-lg font-bold text-destructive">R$ {member.expenses}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Receitas</p>
                      <p className="text-lg font-bold text-primary">R$ {member.income.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Principais Gastos</p>
                    {member.categories.map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{cat.name}</span>
                        <span className="font-semibold">R$ {cat.value}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="sm"
                    onClick={() => {
                      setSelectedMember(member)
                      setShowMemberDetails(true)
                    }}
                  >
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparacao" className="space-y-6 mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ranking de Gastos</CardTitle>
                <CardDescription>Quem mais gastou este mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sortedByExpenses.map((member, index) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold text-sm">
                      {index + 1}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-white font-semibold" style={{ backgroundColor: member.color }}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {((member.expenses / totalExpenses) * 100).toFixed(1)}% do total
                      </p>
                    </div>
                    <p className="font-bold text-destructive">R$ {member.expenses}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ranking de Receitas</CardTitle>
                <CardDescription>Quem mais contribuiu este mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sortedByIncome.map((member, index) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold text-sm">
                      {index + 1}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-white font-semibold" style={{ backgroundColor: member.color }}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.income > 0
                          ? `${((member.income / totalIncome) * 100).toFixed(1)}% do total`
                          : "Sem receitas"}
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      {member.income > 0 ? `R$ ${member.income.toLocaleString("pt-BR")}` : "-"}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comparação Visual de Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <div key={member.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback
                            className="text-white text-xs font-semibold"
                            style={{ backgroundColor: member.color }}
                          >
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                      <span className="font-semibold">R$ {member.expenses}</span>
                    </div>
                    <Progress value={(member.expenses / totalExpenses) * 100} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmark" className="space-y-6 mt-6">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle>Comparação com Famílias Similares</CardTitle>
              <CardDescription>Baseado em famílias de 3 pessoas na sua região</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Gastos Médios</p>
                    <p className="text-2xl font-bold">R$ 6.200</p>
                    <p className="text-xs text-primary mt-2">↓ Você: R$ {totalExpenses.toLocaleString("pt-BR")}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Taxa de Poupança</p>
                    <p className="text-2xl font-bold">18%</p>
                    <p className="text-xs text-primary mt-2">
                      ↑ Você: {(((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Score de Saúde</p>
                    <p className="text-2xl font-bold">75/100</p>
                    <p className="text-xs text-primary mt-2">↑ Você: 87/100</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-4 rounded-lg bg-card">
                <p className="font-medium mb-1">Parabéns!</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sua família está <strong className="text-primary">12% abaixo</strong> da média de gastos e{" "}
                  <strong className="text-primary">15% acima</strong> na taxa de poupança. Continue assim!
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Comparação por Categoria</h4>
                {[
                  { category: "Alimentação", yours: 2400, average: 2800, color: "#10b981" },
                  { category: "Transporte", yours: 2050, average: 1800, color: "#6366f1" },
                  { category: "Moradia", yours: 0, average: 1200, color: "#8b5cf6" },
                ].map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.category}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">Você: R$ {item.yours}</span>
                        <span className="text-muted-foreground">Média: R$ {item.average}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(item.yours / Math.max(item.yours, item.average)) * 100}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-muted-foreground"
                          style={{
                            width: `${(item.average / Math.max(item.yours, item.average)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showMemberDetails} onOpenChange={setShowMemberDetails}>
        <DialogContent className="max-w-2xl">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback
                      className="text-white font-semibold"
                      style={{ backgroundColor: selectedMember.color }}
                    >
                      {selectedMember.initials}
                    </AvatarFallback>
                  </Avatar>
                  {selectedMember.name}
                </DialogTitle>
                <DialogDescription>{selectedMember.role}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground mb-1">Gastos Totais</p>
                      <p className="text-2xl font-bold text-destructive">R$ {selectedMember.expenses}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((selectedMember.expenses / totalExpenses) * 100).toFixed(1)}% do total da família
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground mb-1">Receitas Totais</p>
                      <p className="text-2xl font-bold text-primary">
                        R$ {selectedMember.income.toLocaleString("pt-BR")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedMember.income > 0
                          ? `${((selectedMember.income / totalIncome) * 100).toFixed(1)}% do total da família`
                          : "Sem receitas"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Gastos por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedMember.categories.map((cat: any) => (
                      <div key={cat.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{cat.name}</span>
                          <span className="font-semibold">R$ {cat.value}</span>
                        </div>
                        <Progress value={(cat.value / selectedMember.expenses) * 100} />
                        <p className="text-xs text-muted-foreground">
                          {((cat.value / selectedMember.expenses) * 100).toFixed(1)}% dos gastos
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Saldo do Membro</span>
                      <span className="text-2xl font-bold text-primary">
                        R$ {(selectedMember.income - selectedMember.expenses).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
