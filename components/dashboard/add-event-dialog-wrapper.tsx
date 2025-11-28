"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddEventDialog } from "@/components/dashboard/add-event-dialog"

export function AddEventDialogWrapper() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsAddEventOpen(true)} className="bg-primary text-primary-foreground">
        <span className="mr-2">+</span>
        Adicionar Evento
      </Button>
      <AddEventDialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen} />
    </>
  )
}