'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialCalendar } from "@/components/dashboard/financial-calendar"
import { AddEventDialogWrapper } from "@/components/dashboard/add-event-dialog-wrapper"
import { useCalendario } from "@/hooks/use-calendario"

export default function CalendarioPage() {
  const { eventos, loading, deletarEvento } = useCalendario()

  const currentMonth = new Date()
  const monthName = currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

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
    </div>
  )
}