import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getDadosDashboard } from "@/app/actions/financeiro"

export const dynamic = 'force-dynamic'

export default async function RelatoriosPage() {
  const dados = await getDadosDashboard()
  const { resumo } = dados

  const taxaPoupanca = resumo.entradas > 0 
    ? ((resumo.entradas - resumo.saidas) / resumo.entradas) * 100 
    : 0

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios & Análises</h1>
        <p className="text-muted-foreground">Visão detalhada da sua saúde financeira</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Receitas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ {resumo.entradas.toLocaleString('pt-BR')}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {resumo.saidas.toLocaleString('pt-BR')}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo / Economia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {resumo.saldo.toLocaleString('pt-BR')}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Poupança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{taxaPoupanca.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico Recente</CardTitle>
          <CardDescription>Todas as movimentações registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dados.transacoesRecentes.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${t.tipo === 'entrada' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium">{t.descricao}</p>
                    <p className="text-sm text-muted-foreground">{new Date(t.data_hora).toLocaleDateString('pt-BR')} • {t.categoria}</p>
                  </div>
                </div>
                <span className={`font-bold ${t.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.tipo === 'entrada' ? '+' : '-'} R$ {Number(t.valor).toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}