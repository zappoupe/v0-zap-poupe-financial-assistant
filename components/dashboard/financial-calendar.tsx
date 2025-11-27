"use client"
import { cn } from "@/lib/utils"

interface Event {
  id: number
  type: "gasto" | "receita" | "evento" | "alerta"
  title: string
  amount?: number
}

interface DayEvents {
  [key: number]: Event[]
}

// Mock data
const mockEvents: DayEvents = {
  5: [
    { id: 1, type: "gasto", title: "Aluguel", amount: 1500 },
    { id: 2, type: "alerta", title: "Vencimento" },
  ],
  10: [{ id: 3, type: "receita", title: "Salário", amount: 5500 }],
  15: [{ id: 4, type: "gasto", title: "Conta de Luz", amount: 180 }],
  20: [{ id: 5, type: "evento", title: "Consulta Médica" }],
  26: [
    { id: 6, type: "gasto", title: "Supermercado", amount: 450 },
    { id: 7, type: "gasto", title: "Farmácia", amount: 85 },
  ],
}

interface FinancialCalendarProps {
  currentMonth: Date
}

export function FinancialCalendar({ currentMonth }: FinancialCalendarProps) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year

  const days = []

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-24" />)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = isCurrentMonth && today.getDate() === day
    const events = mockEvents[day] || []

    days.push(
      <div
        key={day}
        className={cn(
          "min-h-24 p-2 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
          isToday && "bg-primary/5 border-primary",
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={cn(
              "text-sm font-medium",
              isToday &&
                "w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs",
            )}
          >
            {day}
          </span>
        </div>
        <div className="space-y-1">
          {events.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className={cn(
                "text-xs px-2 py-1 rounded truncate",
                event.type === "gasto" && "bg-destructive/10 text-destructive",
                event.type === "receita" && "bg-primary/10 text-primary",
                event.type === "evento" && "bg-secondary/50 text-secondary-foreground",
                event.type === "alerta" && "bg-chart-4/20 text-chart-4",
              )}
            >
              {event.title}
              {event.amount && ` R$ ${event.amount}`}
            </div>
          ))}
          {events.length > 2 && <div className="text-xs text-muted-foreground px-2">+{events.length - 2} mais</div>}
        </div>
      </div>,
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>
      <div className="grid grid-cols-7 gap-2">{days}</div>
      <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-destructive/10 border border-destructive" />
          <span className="text-xs text-muted-foreground">Gastos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary/10 border border-primary" />
          <span className="text-xs text-muted-foreground">Receitas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-secondary/50 border border-secondary" />
          <span className="text-xs text-muted-foreground">Eventos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-chart-4/20 border border-chart-4" />
          <span className="text-xs text-muted-foreground">Alertas</span>
        </div>
      </div>
    </div>
  )
}
