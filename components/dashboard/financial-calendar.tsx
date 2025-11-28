"use client"
import { cn } from "@/lib/utils"
import { EventoCalendario } from "@/types/financeiro"

interface FinancialCalendarProps {
  currentMonth: Date;
  events: EventoCalendario[];
}

export function FinancialCalendar({ currentMonth, events }: FinancialCalendarProps) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  // Agrupar eventos por dia
  const eventsByDay: Record<number, EventoCalendario[]> = {}
  events.forEach(event => {
    // Filtra apenas eventos do mês/ano corrente
    if (event.date.getMonth() === month && event.date.getFullYear() === year) {
      const day = event.date.getDate()
      if (!eventsByDay[day]) eventsByDay[day] = []
      eventsByDay[day].push(event)
    }
  })

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-24 bg-muted/5 rounded-lg" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = eventsByDay[day] || []
    days.push(
      <div key={day} className="min-h-24 p-2 border border-border rounded-lg hover:border-primary/50 transition-colors">
        <div className="text-right mb-1">
          <span className="text-xs font-medium text-muted-foreground">{day}</span>
        </div>
        <div className="space-y-1">
          {dayEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded truncate font-medium",
                event.type === "gasto" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                event.type === "receita" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                event.type === "alerta" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              )}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div className="text-[10px] text-muted-foreground text-center">
              +{dayEvents.length - 3} mais
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
        <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  )
}