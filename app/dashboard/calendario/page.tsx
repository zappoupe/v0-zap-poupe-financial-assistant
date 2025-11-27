"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FinancialCalendar } from "@/components/dashboard/financial-calendar"
import { AddEventDialog } from "@/components/dashboard/add-event-dialog"

export default function CalendarioPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const monthName = currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendário Financeiro</h1>
          <p className="text-muted-foreground">Organize pagamentos, receitas e eventos futuros</p>
        </div>
        <Button onClick={() => setIsAddEventOpen(true)} className="bg-primary text-primary-foreground">
          <span className="mr-2">+</span>
          Adicionar Evento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="capitalize">{monthName}</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                <span>←</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
                Hoje
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextMonth}>
                <span>→</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FinancialCalendar currentMonth={currentMonth} />
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pagamentos Pendentes</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Badge variant="destructive">Próx. 7 dias</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Receitas Esperadas</p>
                <p className="text-2xl font-bold">R$ 6.200</p>
              </div>
              <Badge className="bg-primary text-primary-foreground">Este mês</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Eventos Agendados</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Badge variant="outline">Total</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recorrências Ativas</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Badge variant="secondary">Mensais</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddEventDialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen} />
    </div>
  )
}
