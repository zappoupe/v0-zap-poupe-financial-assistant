"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddEventDialog({ open, onOpenChange }: AddEventDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [eventData, setEventData] = useState({
    type: "gasto",
    title: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    category: "Outros",
  })

  const supabase = createClient()

  const getPerfilSeguro = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { data: perfilRpc } = await supabase.rpc('get_meu_perfil')
    if (perfilRpc) return perfilRpc

    const { data: perfilEmail } = await supabase
      .from('dados_cliente')
      .select('telefone')
      .eq('email', user.email)
      .single()

    if (perfilEmail) return { telefone: perfilEmail.telefone }
    throw new Error('Perfil não encontrado.')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const perfil = await getPerfilSeguro()
      let error = null

      if (eventData.type === 'alerta') {
        const { error: err } = await supabase
          .from('lembretes_registros')
          .insert([{
            descricao: eventData.title,
            data_hora: eventData.date,
            responsavel: perfil.telefone,
            hr_inicio: "09:00:00",
            hr_fim: "10:00:00",
            antecedencia: "10 min"
          }])
        error = err
      } else {
        const tipoTransacao = eventData.type === 'receita' ? 'entrada' : 'saida'
        const valor = parseFloat(eventData.amount || "0")
        
        const { error: err } = await supabase
          .from('financeiro_registros')
          .insert([{
            descricao: eventData.title,
            valor: valor,
            tipo: tipoTransacao,
            categoria: eventData.category || 'Outros',
            data_hora: new Date(eventData.date).toISOString(),
            responsavel: perfil.telefone
          }])
        error = err
      }

      if (error) throw error
      
      setEventData({
        type: "gasto",
        title: "",
        amount: "",
        date: new Date().toISOString().split('T')[0],
        category: "Outros",
      })
      
      onOpenChange(false)
      alert("Registro salvo com sucesso!")
      window.location.reload()

    } catch (error: any) {
      console.error(error)
      alert(error.message || "Erro ao criar registro.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Registro</DialogTitle>
          <DialogDescription>Adicione um gasto, receita ou lembrete</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={eventData.type} onValueChange={(value) => setEventData({ ...eventData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gasto">Gasto / Despesa</SelectItem>
                <SelectItem value="receita">Receita / Entrada</SelectItem>
                <SelectItem value="alerta">Apenas Lembrete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Descrição</Label>
            <Input
              id="title"
              placeholder={eventData.type === 'alerta' ? "Ex: Pagar luz" : "Ex: Mercado, Salário"}
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              required
            />
          </div>

          {(eventData.type === "gasto" || eventData.type === "receita") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={eventData.amount}
                  onChange={(e) => setEventData({ ...eventData, amount: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={eventData.category} 
                  onValueChange={(value) => setEventData({ ...eventData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alimentação">Alimentação</SelectItem>
                    <SelectItem value="Transporte">Transporte</SelectItem>
                    <SelectItem value="Moradia">Moradia</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Lazer">Lazer</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Compras">Compras</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}