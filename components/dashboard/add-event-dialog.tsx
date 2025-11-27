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

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddEventDialog({ open, onOpenChange }: AddEventDialogProps) {
  const [eventData, setEventData] = useState({
    type: "gasto",
    title: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
    recurring: false,
    recurringType: "monthly",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Event data:", eventData)
    onOpenChange(false)
    // Reset form
    setEventData({
      type: "gasto",
      title: "",
      amount: "",
      date: "",
      category: "",
      notes: "",
      recurring: false,
      recurringType: "monthly",
    })
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
                <SelectItem value="evento">Evento Pessoal</SelectItem>
                <SelectItem value="alerta">Alerta/Lembrete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex: Conta de luz, Salário, Consulta médica"
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
                <SelectItem value="alimentacao">Alimentação</SelectItem>
                <SelectItem value="transporte">Transporte</SelectItem>
                <SelectItem value="moradia">Moradia</SelectItem>
                <SelectItem value="saude">Saúde</SelectItem>
                <SelectItem value="lazer">Lazer</SelectItem>
                <SelectItem value="educacao">Educação</SelectItem>
                <SelectItem value="assinaturas">Assinaturas</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Adicione detalhes sobre este evento..."
              value={eventData.notes}
              onChange={(e) => setEventData({ ...eventData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-3 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Checkbox
                id="recurring"
                checked={eventData.recurring}
                onCheckedChange={(checked) => setEventData({ ...eventData, recurring: checked as boolean })}
              />
              <Label htmlFor="recurring" className="cursor-pointer">
                Este é um evento recorrente
              </Label>
            </div>

            {eventData.recurring && (
              <Select
                value={eventData.recurringType}
                onValueChange={(value) => setEventData({ ...eventData, recurringType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
