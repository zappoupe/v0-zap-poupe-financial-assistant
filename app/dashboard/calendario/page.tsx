import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FinancialCalendar } from "@/components/dashboard/financial-calendar"
import { getDadosDashboard } from "@/app/actions/financeiro"
import { AddEventDialogWrapper } from "@/components/dashboard/add-event-dialog-wrapper"


export const dynamic = 'force-dynamic'

export default async function CalendarioPage() {
  const dados = await getDadosDashboard()

  const currentMonth = new Date()
  const monthName = currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
  const pagamentosPendentes = dados.eventosCalendario.filter(e => e.type === 'gasto' && e.date >= new Date()).length
  const receitasMes = dados.eventosCalendario
    .filter(e => e.type === 'receita' && e.date.getMonth() === currentMonth.getMonth())
    .reduce((acc, curr) => acc + (curr.amount || 0), 0)

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
          <FinancialCalendar currentMonth={currentMonth} events={dados.eventosCalendario} />
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pagamentos Futuros</p>
                <p className="text-2xl font-bold">{pagamentosPendentes}</p>
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
                <p className="text-2xl font-bold">R$ {receitasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <Badge className="bg-primary text-primary-foreground">Previsto</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}