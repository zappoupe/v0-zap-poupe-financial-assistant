"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddEventDialog({ open, onOpenChange }: AddEventDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [eventData, setEventData] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
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
      
      // Inserção direta na tabela de lembretes
      const { error } = await supabase
        .from('lembretes_registros')
        .insert([{
          descricao: eventData.title,
          data_hora: eventData.date,
          responsavel: perfil.telefone,
          hr_inicio: "09:00:00", // Valor padrão
          hr_fim: "10:00:00",    // Valor padrão
          antecedencia: "10 min" // Valor padrão
        }])

      if (error) throw error
      
      setEventData({
        title: "",
        date: new Date().toISOString().split('T')[0],
      })
      
      onOpenChange(false)
      alert("Lembrete salvo com sucesso!")
      window.location.reload()

    } catch (error: any) {
      console.error(error)
      alert(error.message || "Erro ao criar lembrete.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Lembrete</DialogTitle>
          <DialogDescription>Adicione um lembrete ao seu calendário</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="title">Descrição</Label>
            <Input
              id="title"
              placeholder="Ex: Pagar luz"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              required
            />
          </div>

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
              {isLoading ? "Salvando..." : "Salvar Lembrete"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}