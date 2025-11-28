'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useDashboard } from "@/hooks/use-dashboard"

export default function RelatoriosPage() {
  const { data, loading } = useDashboard()
  const { resumo } = data

  const taxaPoupanca = resumo.entradas > 0 
    ? ((resumo.entradas - resumo.saidas) / resumo.entradas) * 100 
    : 0

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="h-8 bg-muted animate-pulse rounded w-1/4 mb-6" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />)}
        </div>
      </div>
    )
  }

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
            <div className="text-2xl font-bold text-blue-600">R$ {resumo.entradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {resumo.saidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo / Economia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {resumo.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
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
            {data.transacoesRecentes.length === 0 ? (
               <p className="text-center text-muted-foreground py-4">Nenhum registro encontrado.</p>
            ) : (
              data.transacoesRecentes.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-10 rounded-full ${t.tipo === 'entrada' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="font-medium">{t.descricao || "Sem descrição"}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(t.data_hora).toLocaleDateString('pt-BR')} • {t.categoria}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${t.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.tipo === 'entrada' ? '+' : '-'} R$ {Number(t.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}