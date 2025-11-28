'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMetas } from "@/hooks/use-metas"

export default function MetasPage() {
  const { metas, loading, criarMeta, deletarMeta } = useMetas()
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    titulo: "",
    valor_objetivo: "",
    valor_atual: "",
    data_limite: "",
    categoria: "sonho"
  })

  const totalAlvo = metas.reduce((acc, m) => acc + Number(m.valor_objetivo), 0)
  const totalAtual = metas.reduce((acc, m) => acc + Number(m.valor_atual), 0)
  const progressoGeral = totalAlvo > 0 ? (totalAtual / totalAlvo) * 100 : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    const result = await criarMeta({
      titulo: formData.titulo,
      valor_objetivo: Number(formData.valor_objetivo),
      valor_atual: Number(formData.valor_atual || 0),
      data_limite: formData.data_limite,
      categoria: formData.categoria
    })

    if (result.success) {
      alert("Meta criada com sucesso!")
      setFormData({
        titulo: "",
        valor_objetivo: "",
        valor_atual: "",
        data_limite: "",
        categoria: "sonho"
      })
    } else {
      alert("Erro: " + result.error)
    }

    setSubmitting(false)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta meta?")) {
        const result = await deletarMeta(id)
        if (result.success) alert("Meta excluída.")
    }
  }

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
            {loading ? (
              <div className="h-10 bg-muted animate-pulse rounded" />
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Acumulado: R$ {totalAtual.toLocaleString('pt-BR')}</span>
                  <span>Meta Total: R$ {totalAlvo.toLocaleString('pt-BR')}</span>
                </div>
                <Progress value={progressoGeral} className="h-4" />
                <p className="text-xs text-muted-foreground text-right">{progressoGeral.toFixed(1)}% concluído</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nova Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input 
                placeholder="Título (ex: Carro Novo)" 
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                required 
              />
              <Input 
                type="number" 
                placeholder="Valor Alvo (R$)" 
                value={formData.valor_objetivo}
                onChange={(e) => setFormData({...formData, valor_objetivo: e.target.value})}
                required 
              />
              <Input 
                type="number" 
                placeholder="Valor Já Guardado (R$)" 
                value={formData.valor_atual}
                onChange={(e) => setFormData({...formData, valor_atual: e.target.value})}
              />
              <Input 
                type="date" 
                value={formData.data_limite}
                onChange={(e) => setFormData({...formData, data_limite: e.target.value})}
                required 
              />
              <Select 
                value={formData.categoria} 
                onValueChange={(val) => setFormData({...formData, categoria: val})}
              >
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
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Criando..." : "Criar Meta"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />)
        ) : metas.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-8">Nenhuma meta cadastrada ainda.</p>
        ) : (
          metas.map((meta) => {
            const progresso = meta.valor_objetivo > 0 ? (meta.valor_atual / meta.valor_objetivo) * 100 : 0
            return (
              <Card key={meta.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">{meta.titulo}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive h-6 w-6 p-0 hover:bg-destructive/10"
                    onClick={() => handleDelete(meta.id)}
                  >
                    ✕
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">R$ {Number(meta.valor_atual).toLocaleString('pt-BR')}</span>
                      <span className="font-bold">R$ {Number(meta.valor_objetivo).toLocaleString('pt-BR')}</span>
                    </div>
                    <Progress value={progresso} />
                    <p className="text-xs text-muted-foreground">
                      Meta para: {new Date(meta.data_limite).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}