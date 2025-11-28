import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getMetas, criarMeta, excluirMeta } from "@/app/actions/metas"

export const dynamic = 'force-dynamic'

export default async function MetasPage() {
  const metas = await getMetas()

  const totalAlvo = metas.reduce((acc, m) => acc + m.valor_objetivo, 0)
  const totalAtual = metas.reduce((acc, m) => acc + m.valor_atual, 0)
  const progressoGeral = totalAlvo > 0 ? (totalAtual / totalAlvo) * 100 : 0

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Metas & Sonhos</h1>
          <p className="text-muted-foreground">Defina objetivos e acompanhe seu progresso</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Progresso Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Acumulado: R$ {totalAtual.toLocaleString('pt-BR')}</span>
                <span>Meta Total: R$ {totalAlvo.toLocaleString('pt-BR')}</span>
              </div>
              <Progress value={progressoGeral} className="h-4" />
              <p className="text-xs text-muted-foreground text-right">{progressoGeral.toFixed(1)}% concluído</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nova Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={criarMeta} className="space-y-3">
              <Input name="titulo" placeholder="Título (ex: Carro Novo)" required />
              <Input name="valor_objetivo" type="number" placeholder="Valor Alvo (R$)" required />
              <Input name="valor_atual" type="number" placeholder="Valor Já Guardado (R$)" />
              <Input name="data_limite" type="date" required />
              <Select name="categoria" defaultValue="sonho">
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reserva">Reserva de Emergência</SelectItem>
                  <SelectItem value="sonho">Sonho / Bem Material</SelectItem>
                  <SelectItem value="viagem">Viagem</SelectItem>
                  <SelectItem value="investimento">Investimento</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="w-full">Criar Meta</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metas.map((meta) => {
          const progresso = meta.valor_objetivo > 0 ? (meta.valor_atual / meta.valor_objetivo) * 100 : 0
          return (
            <Card key={meta.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{meta.titulo}</CardTitle>
                <form action={excluirMeta.bind(null, meta.id)}>
                  <Button variant="ghost" size="sm" className="text-destructive h-6 w-6 p-0">✕</Button>
                </form>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">R$ {meta.valor_atual.toLocaleString('pt-BR')}</span>
                    <span className="font-bold">R$ {meta.valor_objetivo.toLocaleString('pt-BR')}</span>
                  </div>
                  <Progress value={progresso} />
                  <p className="text-xs text-muted-foreground">
                    Meta para: {new Date(meta.data_limite).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}