"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("pessoal")
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Viagem para Europa",
      target: 15000,
      current: 6500,
      status: "Em progresso",
    },
    {
      id: 2,
      title: "Fundo de Emergência",
      target: 20000,
      current: 2000,
      status: "Planejado",
    },
  ])
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<any>(null)
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    current: "",
  })

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target) {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          title: newGoal.title,
          target: Number.parseFloat(newGoal.target),
          current: Number.parseFloat(newGoal.current || "0"),
          status: "Planejado",
        },
      ])
      setNewGoal({ title: "", target: "", current: "" })
      setIsAddGoalOpen(false)
    }
  }

  const handleEditGoal = () => {
    if (editingGoal) {
      setGoals(
        goals.map((g) =>
          g.id === editingGoal.id
            ? {
                ...g,
                title: editingGoal.title,
                target: Number.parseFloat(editingGoal.target),
                current: Number.parseFloat(editingGoal.current),
              }
            : g,
        ),
      )
      setIsEditGoalOpen(false)
      setEditingGoal(null)
    }
  }

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id))
    setIsEditGoalOpen(false)
    setEditingGoal(null)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
        <p className="text-muted-foreground">Gerencie suas informações e preferências</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-primary text-primary-foreground text-2xl flex items-center justify-center rounded-full">
                MS
              </div>
              <div>
                <h3 className="font-semibold text-lg">Maria Silva</h3>
                <p className="text-sm text-muted-foreground">maria.silva@email.com</p>
              </div>
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full">Premium</div>
              <Separator />
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Membro desde</span>
                  <span className="font-medium">Jan 2025</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Score de Saúde</span>
                  <span className="font-medium text-primary">87/100</span>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Alterar Foto
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                <TabsTrigger value="pessoal">Pessoal</TabsTrigger>
                <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
                <TabsTrigger value="objetivos">Objetivos</TabsTrigger>
                <TabsTrigger value="configuracoes">Config</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="space-y-6">
              <TabsContent value="pessoal" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Informações Pessoais</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" defaultValue="Maria Silva" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" defaultValue="maria.silva@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" defaultValue="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Data de Nascimento</Label>
                      <Input id="birthdate" type="date" defaultValue="1990-05-15" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Endereço</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Rua</Label>
                      <Input id="address" defaultValue="Rua das Flores, 123" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" defaultValue="São Paulo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" defaultValue="SP" />
                    </div>
                  </div>
                </div>

                <Button className="bg-primary text-primary-foreground">Salvar Alterações</Button>
              </TabsContent>

              <TabsContent value="financeiro" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Perfil Financeiro</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="income">Renda Mensal (R$)</Label>
                      <Input id="income" type="number" defaultValue="5500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dependents">Número de Dependentes</Label>
                      <Input id="dependents" type="number" defaultValue="2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="debts">Dívidas Atuais (R$)</Label>
                      <Input id="debts" type="number" defaultValue="15000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investorType">Perfil de Investidor</Label>
                      <Select defaultValue="moderado">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservador">Conservador</SelectItem>
                          <SelectItem value="moderado">Moderado</SelectItem>
                          <SelectItem value="agressivo">Agressivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Preferências de Vida</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="priorities">Prioridades Financeiras</Label>
                      <Select defaultValue="estabilidade">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viajar">Viajar mais</SelectItem>
                          <SelectItem value="economizar">Economizar e poupar</SelectItem>
                          <SelectItem value="estabilidade">Buscar estabilidade</SelectItem>
                          <SelectItem value="patrimonio">Construir patrimônio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Observações sobre seu estilo de vida</Label>
                      <Input
                        id="notes"
                        placeholder="Ex: Gosto de viajar 2x por ano, priorizo saúde e bem-estar..."
                        defaultValue="Gosto de viajar pelo menos 2 vezes ao ano e valorizo experiências gastronômicas."
                      />
                    </div>
                  </div>
                </div>

                <Button className="bg-primary text-primary-foreground">Salvar Alterações</Button>
              </TabsContent>

              <TabsContent value="objetivos" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Objetivos Financeiros</h3>
                  <div className="space-y-4">
                    {goals.map((goal) => (
                      <Card
                        key={goal.id}
                        className="bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setEditingGoal({ ...goal, target: goal.target.toString(), current: goal.current.toString() })
                          setIsEditGoalOpen(true)
                        }}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold">{goal.title}</h4>
                              <p className="text-sm text-muted-foreground">Meta: R$ {goal.target.toLocaleString()}</p>
                            </div>
                            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full">
                              {goal.status}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>
                                R$ {goal.current.toLocaleString()} de R$ {goal.target.toLocaleString()}
                              </span>
                              <span className="text-primary font-medium">
                                {Math.round((goal.current / goal.target) * 100)}%
                              </span>
                            </div>
                            <Progress value={(goal.current / goal.target) * 100} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full bg-transparent">
                          🎯 Adicionar Novo Objetivo
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Objetivo</DialogTitle>
                          <DialogDescription>
                            Defina um novo objetivo financeiro para acompanhar seu progresso.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="goal-title">Nome do Objetivo</Label>
                            <Input
                              id="goal-title"
                              placeholder="Ex: Comprar um carro"
                              value={newGoal.title}
                              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="goal-target">Valor da Meta (R$)</Label>
                            <Input
                              id="goal-target"
                              type="number"
                              placeholder="50000"
                              value={newGoal.target}
                              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="goal-current">Valor Atual (R$)</Label>
                            <Input
                              id="goal-current"
                              type="number"
                              placeholder="0"
                              value={newGoal.current}
                              onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleAddGoal} className="bg-primary text-primary-foreground">
                            Adicionar Objetivo
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isEditGoalOpen} onOpenChange={setIsEditGoalOpen}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Objetivo</DialogTitle>
                          <DialogDescription>Atualize as informações do seu objetivo financeiro.</DialogDescription>
                        </DialogHeader>
                        {editingGoal && (
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-goal-title">Nome do Objetivo</Label>
                              <Input
                                id="edit-goal-title"
                                value={editingGoal.title}
                                onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-goal-target">Valor da Meta (R$)</Label>
                              <Input
                                id="edit-goal-target"
                                type="number"
                                value={editingGoal.target}
                                onChange={(e) => setEditingGoal({ ...editingGoal, target: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-goal-current">Valor Atual (R$)</Label>
                              <Input
                                id="edit-goal-current"
                                type="number"
                                value={editingGoal.current}
                                onChange={(e) => setEditingGoal({ ...editingGoal, current: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                        <DialogFooter className="flex-col sm:flex-row gap-2">
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteGoal(editingGoal?.id)}
                            className="sm:mr-auto"
                          >
                            Excluir Objetivo
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditGoalOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleEditGoal} className="bg-primary text-primary-foreground">
                            Salvar Alterações
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Limites por Categoria</h3>
                  <div className="space-y-3">
                    {[
                      { category: "Alimentação", current: 1850, limit: 2000, color: "#10b981" },
                      { category: "Transporte", current: 950, limit: 1000, color: "#6366f1" },
                      { category: "Lazer", current: 655, limit: 800, color: "#ec4899" },
                    ].map((item) => (
                      <div key={item.category} className="flex items-center gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.category}</span>
                            <span className="text-muted-foreground">
                              R$ {item.current} / R$ {item.limit}
                            </span>
                          </div>
                          <Progress value={(item.current / item.limit) * 100} color={item.color} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="configuracoes" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Notificações</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Alertas de gastos elevados", description: "Receba avisos quando ultrapassar limites" },
                      { title: "Lembretes de pagamento", description: "Notificações antes de vencimentos" },
                      { title: "Relatórios semanais", description: "Resumo das suas finanças por e-mail" },
                      { title: "Dicas personalizadas", description: "Insights e recomendações da IA" },
                    ].map((item) => (
                      <Card key={item.title} className="bg-muted/30">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Switch />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Segurança e Privacidade</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Autenticação em Dois Fatores
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Gerenciar Dispositivos Conectados
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Assinatura</h3>
                  <Card className="border-primary/50 bg-primary/5">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">Plano Premium</h4>
                          <p className="text-sm text-muted-foreground">R$ 29,90/mês</p>
                        </div>
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full">Ativo</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Próxima cobrança: 05/12/2025</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Alterar Plano
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Cancelar Assinatura
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
