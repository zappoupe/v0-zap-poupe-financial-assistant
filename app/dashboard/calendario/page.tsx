'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FinancialCalendar } from "@/components/dashboard/financial-calendar"
import { AddEventDialogWrapper } from "@/components/dashboard/add-event-dialog-wrapper"
import { useCalendario } from "@/hooks/use-calendario"

export default function CalendarioPage() {
  const { eventos, loading, deletarEvento } = useCalendario()

  const currentMonth = new Date()
  const monthName = currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

  const pagamentosPendentes = eventos.filter(e => 
    e.type === 'gasto' && 
    e.date >= new Date(new Date().setHours(0,0,0,0))
  ).length

  const receitasMes = eventos
    .filter(e => e.type === 'receita' && e.date.getMonth() === currentMonth.getMonth())
    .reduce((acc, curr) => acc + (curr.amount || 0), 0)

  const handleDelete = async (id: number, type: string) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      await deletarEvento(id, type)
      alert("Excluído com sucesso!")
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendário Financeiro</h1>
          <p className="text-muted-foreground">Organize pagamentos, receitas e eventos futuros</p>
        </div>
        <AddEventDialogWrapper />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="capitalize">{monthName}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
          ) : (
            <FinancialCalendar 
              currentMonth={currentMonth} 
              events={eventos} 
              onDelete={handleDelete}
            />
          )}
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pagamentos Futuros</p>
                {loading ? (
                  <div className="h-8 w-12 bg-muted animate-pulse rounded" />
                ) : (
                  <p className="text-2xl font-bold">{pagamentosPendentes}</p>
                )}
              </div>
              <Badge variant="destructive">A vencer</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Receitas do Mês</p>
                {loading ? (
                  <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                ) : (
                  <p className="text-2xl font-bold">R$ {receitasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                )}
              </div>
              <Badge className="bg-primary text-primary-foreground">Previsto</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}