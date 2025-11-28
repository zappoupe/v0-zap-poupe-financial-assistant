"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { criarLembrete } from "@/app/actions/financeiro" // Importar a Server Action
import { toast } from "sonner" // Recomendação: usar toast para feedback (opcional)

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
    date: new Date().toISOString().split('T')[0], // Data de hoje padrão
    category: "",
    notes: "",
    recurring: false,
    recurringType: "monthly",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Criamos um FormData para enviar para a Server Action
      const formData = new FormData()
      formData.append('title', eventData.title)
      formData.append('amount', eventData.amount)
      formData.append('date', eventData.date)
      formData.append('category', eventData.category)
      formData.append('type', eventData.type)
      
      // Chamada real ao banco de dados
      await criarLembrete(formData)
      
      // Sucesso
      onOpenChange(false)
      // Resetar form
      setEventData({
        type: "gasto",
        title: "",
        amount: "",
        date: new Date().toISOString().split('T')[0],
        category: "",
        notes: "",
        recurring: false,
        recurringType: "monthly",
      })
      alert("Evento criado com sucesso!") // Pode substituir por toast.success() se tiver sonner instalado
      
      // Opcional: Forçar recarregamento da página para mostrar o novo item
      window.location.reload() 

    } catch (error) {
      console.error(error)
      alert("Erro ao criar evento. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Evento Financeiro</DialogTitle>
          <DialogDescription>Registre gastos, receitas ou eventos futuros no calendário</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Evento</Label>
            <Select value={eventData.type} onValueChange={(value) => setEventData({ ...eventData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gasto">Gasto</SelectItem>
                <SelectItem value="receita">Receita</SelectItem>
                <SelectItem value="alerta">Alerta/Lembrete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex: Conta de luz, Salário"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              required
            />
          </div>

          {(eventData.type === "gasto" || eventData.type === "receita") && (
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

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={eventData.category}
              onValueChange={(value) => setEventData({ ...eventData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alimentação">Alimentação</SelectItem>
                <SelectItem value="Transporte">Transporte</SelectItem>
                <SelectItem value="Moradia">Moradia</SelectItem>
                <SelectItem value="Saúde">Saúde</SelectItem>
                <SelectItem value="Lazer">Lazer</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
              </SelectContent>
            </Select>
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
              {isLoading ? "Salvando..." : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}