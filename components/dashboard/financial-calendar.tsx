"use client"

import { cn } from "@/lib/utils"
import { EventoCalendario } from "@/types/financeiro"
import { X } from "lucide-react"

interface FinancialCalendarProps {
  currentMonth: Date;
  events: EventoCalendario[];
  onDelete: (id: number, type: string) => void;
}

export function FinancialCalendar({ currentMonth, events, onDelete }: FinancialCalendarProps) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const eventsByDay: Record<number, EventoCalendario[]> = {}
  events.forEach(event => {
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
          {dayEvents.slice(0, 4).map((event) => (
            <div
              key={event.id}
              className={cn(
                "group relative flex items-center justify-between text-[10px] px-1.5 py-0.5 rounded font-medium",
                event.type === "gasto" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                event.type === "receita" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                event.type === "alerta" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              )}
              title={event.title}
            >
              <span className="truncate pr-4">{event.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm('Tem certeza que deseja excluir este item?')) {
                    onDelete(event.id, event.type)
                  }
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 rounded-sm p-0.5 transition-all"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          {dayEvents.length > 4 && (
            <div className="text-[10px] text-muted-foreground text-center">
              +{dayEvents.length - 4} mais
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